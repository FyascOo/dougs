import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { combineLatest, debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { Category, Filter, Group, GroupedCategories } from './category.model';
import { CategoryRepository } from './category.repository';
import { filterCategories, mapUniqueGroups } from './category.utils';

export type CategoryState = {
  categories: Category[];
  groupedCategories: GroupedCategories[];
  group: Group[];
  filter: Filter;
  isLoading: boolean;
};

export const initialState: CategoryState = {
  categories: [],
  groupedCategories: [],
  group: [],
  filter: { categoryWording: '', groupId: null },
  isLoading: false,
};

export const CategoryStore = signalStore(
  withState(initialState),
  withComputed(({ categories, filter }) => ({
    filterCategories: computed(() => filterCategories(categories(), filter())),
  })),
  withMethods((store, categoryRepository = inject(CategoryRepository)) => ({
    updateFilterSearch(search: string) {
      patchState(store, ({ filter }) => ({ filter: { ...filter, categoryWording: search } }));
    },
    updateFilterGroupId(id: number | null) {
      patchState(store, ({ filter }) => ({ filter: { ...filter, groupId: id } }));
    },
    loadCategories: rxMethod<void>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return combineLatest([categoryRepository.getCategories(), categoryRepository.getVisibleCategories()]).pipe(
            tap(([categories]) => patchState(store, { group: mapUniqueGroups(categories) })),
            tapResponse({
              next: ([categories, visibleCategories]) =>
                patchState(store, {
                  categories: categories
                    .filter(category => visibleCategories.some(({ id }) => category.id === id))
                    .sort((a, b) => (a.wording > b.wording ? 1 : -1)),
                }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
  }))
);

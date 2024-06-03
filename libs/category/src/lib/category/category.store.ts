import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { combineLatest, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { Category, Filter, Group } from './category.model';
import { CategoryRepository } from './category.repository';
import { mapFilterCategories, mapFilterGroupedCategories, mapUniqueGroups } from './category.utils';

export type CategoryState = {
  categories: Category[];
  group: Group[];
  filter: Filter;
  isLoading: boolean;
};

export const initialState: CategoryState = {
  categories: [],
  group: [],
  filter: { categoryWording: '', groupId: 0 },
  isLoading: false,
};

export const CategoryStore = signalStore(
  withState(initialState),
  withComputed(({ categories, filter, group }) => ({
    filterCategories: computed(() => mapFilterCategories(categories(), filter())),
    filterGroupedCategories: computed(() => mapFilterGroupedCategories(categories(), group(), filter())),
  })),
  withMethods((store, categoryRepository = inject(CategoryRepository)) => ({
    updateFilterSearch(search: string) {
      patchState(store, ({ filter }) => ({ filter: { ...filter, categoryWording: search } }));
    },
    updateFilterGroupId(id: number) {
      patchState(store, ({ filter }) => ({ filter: { ...filter, groupId: id } }));
    },
    loadCategories: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return combineLatest([categoryRepository.getCategories(), categoryRepository.getVisibleCategories()]).pipe(
            tap(([categories]) =>
              patchState(store, { group: mapUniqueGroups(categories).sort((a, b) => (a.name > b.name ? 1 : -1)) })
            ),
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

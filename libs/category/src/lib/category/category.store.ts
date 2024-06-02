import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { combineLatest, debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { Category, Group } from './category.model';
import { CategoryRepository } from './category.repository';
import { mapUniqueGroups } from './category.utils';

export type CategoryState = {
  categories: Category[];
  group: Group[];
  isLoading: boolean;
};

export const initialState: CategoryState = {
  categories: [],
  group: [],
  isLoading: false,
};

export const CategoryStore = signalStore(
  withState(initialState),
  withMethods((store, categoryRepository = inject(CategoryRepository)) => ({
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
                  categories: categories.filter(category => visibleCategories.some(({ id }) => category.id === id)),
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

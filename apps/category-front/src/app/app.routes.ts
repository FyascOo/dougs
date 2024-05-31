import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', loadComponent: () => import('@dougs/category').then(c => c.CategoryComponent) },
];

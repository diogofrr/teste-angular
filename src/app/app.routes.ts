import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadComponent: () => import('./products/list/list').then((m) => m.List),
  },
  {
    path: 'products/new',
    loadComponent: () => import('./products/form/form').then((m) => m.Form),
  },
  {
    path: 'products/edit/:id',
    loadComponent: () => import('./products/form/form').then((m) => m.Form),
  },
  {
    path: '**',
    redirectTo: '/products',
  },
];

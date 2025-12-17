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
    path: '**',
    redirectTo: '/products',
  },
];

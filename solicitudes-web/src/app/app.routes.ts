import { Routes } from '@angular/router';
import { MainLayout } from './core/layout/main-layout/main-layout';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login').then((m) => m.Login),
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'solicitudes',
        loadComponent: () =>
          import('./features/solicitudes/pages/solicitudes-list/solicitudes-list').then(
            (m) => m.SolicitudesList,
          ),
      },
      
    ],
  },
];

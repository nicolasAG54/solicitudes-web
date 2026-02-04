import { Routes } from '@angular/router';
import { MainLayout } from './core/layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'solicitudes',
        loadComponent: () =>
          import('./features/solicitudes/pages/solicitudes-list/solicitudes-list')
            .then(m => m.SolicitudesList)
      },
      {
        path: '',
        redirectTo: 'solicitudes',
        pathMatch: 'full'
      }
    ]
  }
];

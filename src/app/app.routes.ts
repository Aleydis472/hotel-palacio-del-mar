import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        redirectTo: '/habitaciones',
        pathMatch: 'full' 
      },
      {
        path: 'habitaciones',
        loadComponent: () => import('./features/rooms/pages/room-list/room-list.component')
      }
];

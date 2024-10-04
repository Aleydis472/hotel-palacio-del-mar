import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full' 
      },
      {
        path: 'home',
        loadComponent: () => import('./features/home/pages/home/home.component')
      },
      {
        path: 'habitaciones',
        loadComponent: () => import('./features/rooms/pages/room-list/room-list.component')
      }
];

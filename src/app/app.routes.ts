
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'DUREX Management - Accueil' },
  { path: 'auth', component: AuthComponent, title: 'Connexion' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Tableau de Bord',
    //canActivate: [authGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

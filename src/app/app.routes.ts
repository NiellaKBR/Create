import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ServicesComponent } from './pages/services/services.component';
import { ServicesPremiumComponent } from './pages/services-premium/services-premium.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'DUREX Management - Accueil' },
  { path: 'services', component: ServicesComponent, title: 'Nos Services' },
  { path: 'about', component: AboutComponent, title: 'À Propos' }, // ← Enlevé canActivate
  { path: 'contact', component: ContactComponent, title: 'Contact' }, // ← Ajouté cette ligne
  { path: 'auth', component: AuthComponent, title: 'Connexion' },
  { path: 'services-premium', component: ServicesPremiumComponent, title: 'Services Premium', canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, title: 'Tableau de Bord', canActivate: [authGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

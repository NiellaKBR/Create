import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'DUREX Management - Accueil' },
  { path: 'services', component: ServicesComponent, title: 'Nos Services' },
  { path: 'about', component: AboutComponent, title: 'À Propos' },
  { path: 'contact', component: ContactComponent, title: 'Contact' },
  { path: 'auth', component: AuthComponent, title: 'Connexion' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

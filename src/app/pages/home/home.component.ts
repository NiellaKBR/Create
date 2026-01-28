import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  animationState = 'visible';
  
  services = [
    {
      icon: '💼',
      title: 'Conseil en Management',
      description: 'Gestion opérationnelle et montage de dossiers'
    },
    {
      icon: '💰',
      title: 'Finance & Comptabilité',
      description: 'Tenue comptable, audit et gestion fiscale'
    },
    {
      icon: '👥',
      title: 'Ressources Humaines',
      description: 'Recrutement, paie et évaluation'
    },
    {
      icon: '💻',
      title: 'Digitalisation',
      description: 'Logiciels RH et portails digitaux'
    },
    {
      icon: '⚖️',
      title: 'Juridique',
      description: 'Rédaction d\'actes et contentieux'
    },
    {
      icon: '🏢',
      title: 'Gestion Immobilière',
      description: 'Suivi de biens et assistance logistique'
    },
    {
      icon: '📚',
      title: 'Formation',
      description: 'Formations sur mesure et ateliers'
    }
  ];
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Service {
  id: number;
  icon: string;
  title: string;
  shortDescription: string;
  features: string[];
  color: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  isLoggedIn = false;

  services: Service[] = [
    {
      id: 1,
      icon: '💼',
      title: 'Conseil en Management',
      shortDescription: 'Accompagnement stratégique pour optimiser la gestion et la performance de votre entreprise.',
      features: [
        'Gestion opérationnelle',
        'Montage de dossiers',
        'Gestion de projets',
        'Audit organisationnel'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      icon: '💰',
      title: 'Finance, Comptabilité & Fiscalité',
      shortDescription: 'Expertise comptable et fiscale pour une gestion financière rigoureuse et conforme.',
      features: [
        'Tenue de comptabilité',
        'Audit et contrôle',
        'Gestion des impôts',
        'Déclarations fiscales'
      ],
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 3,
      icon: '👥',
      title: 'Ressources Humaines & Paie',
      shortDescription: 'Solutions RH complètes pour valoriser et gérer efficacement votre capital humain.',
      features: [
        'Recrutement & formation',
        'Gestion de la paie',
        'Évaluation de performance',
        'Administration du personnel'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      icon: '💻',
      title: 'Logiciels & Digitalisation RH',
      shortDescription: 'Transformation digitale de vos processus RH avec des solutions technologiques modernes.',
      features: [
        'Logiciels de paie',
        'Portails RH',
        'Digitalisation des processus',
        'Automatisation'
      ],
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 5,
      icon: '⚖️',
      title: 'Juridique & Contentieux',
      shortDescription: 'Accompagnement juridique pour sécuriser vos activités et gérer vos contentieux.',
      features: [
        'Rédaction d\'actes',
        'Assistance juridique',
        'Gestion des contentieux',
        'Conseil juridique'
      ],
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 6,
      icon: '🏢',
      title: 'Gestion Immobilière',
      shortDescription: 'Services complets de gestion et d\'administration de patrimoine immobilier.',
      features: [
        'Suivi de biens immobiliers',
        'Gestion d\'inventaires',
        'Assistance logistique',
        'Maintenance'
      ],
      color: 'from-rose-500 to-rose-600'
    },
    {
      id: 7,
      icon: '📚',
      title: 'Formation Professionnelle',
      shortDescription: 'Programmes de formation adaptés pour développer les compétences de vos équipes.',
      features: [
        'Formations sur mesure',
        'Ateliers et séminaires',
        'Renforcement de capacités',
        'Coaching'
      ],
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = user !== null;
    });
  }

  scrollToAuth() {
    const ctaSection = document.querySelector('section:nth-last-child(2)');
    ctaSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
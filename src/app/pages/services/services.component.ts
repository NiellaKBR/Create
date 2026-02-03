import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  isLoggedIn = false;

  // 7 domaines DUREX avec preview public
  servicesPublic = [
    {
      title: 'Audit & Expertise Comptable',
      icon: '📊',
      description: 'Analyse complète de vos comptes et optimisation fiscale',
      features: ['Audit annuel', 'Déclarations fiscales', 'Conseil en gestion'],
      tarif: 'À partir de 500 000 FCFA',
      preview: true
    },
    {
      title: 'Conseil Juridique & Fiscal',
      icon: '⚖️',
      description: 'Accompagnement juridique pour sécuriser vos activités',
      features: ['Rédaction contrats', 'Contentieux', 'Droit des affaires'],
      tarif: 'À partir de 200 000 FCFA',
      preview: true
    },
    {
      title: 'Formation Professionnelle',
      icon: '🎓',
      description: 'Développement des compétences de vos équipes',
      features: ['Formation sur mesure', 'Certification', 'E-learning'],
      tarif: 'À partir de 150 000 FCFA',
      preview: true
    },
    {
      title: 'Ressources Humaines',
      icon: '👥',
      description: 'Gestion complète de votre capital humain',
      features: ['Recrutement', 'Paie', 'Formation RH'],
      tarif: 'Sur devis',
      preview: true
    },
    {
      title: 'Gestion Immobilière',
      icon: '🏢',
      description: 'Administration et valorisation de votre patrimoine',
      features: ['Gestion locative', 'Syndic', 'Expertise'],
      tarif: 'Commission 8-12%',
      preview: true
    },
    {
      title: 'Logistique & Digitalisation',
      icon: '🚀',
      description: 'Modernisation et optimisation de vos processus',
      features: ['Audit digital', 'Solutions tech', 'Formation'],
      tarif: 'À partir de 300 000 FCFA',
      preview: true
    },
    {
      title: 'Conseil en Management',
      icon: '💼',
      description: 'Stratégie et amélioration des performances',
      features: ['Audit organisationnel', 'Plan stratégique', 'Coaching'],
      tarif: 'À partir de 400 000 FCFA',
      preview: true
    }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }
}
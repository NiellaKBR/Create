import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  // Statistiques de l'entreprise
  stats = [
    { number: '15+', label: 'Années d\'expérience', icon: '🎯' },
    { number: '500+', label: 'Clients satisfaits', icon: '😊' },
    { number: '7', label: 'Domaines d\'expertise', icon: '💼' },
    { number: '24/7', label: 'Support disponible', icon: '📞' }
  ];

  // Équipe dirigeante
  team = [
    {
      name: 'Marc OUEDRAOGO',
      position: 'Président Directeur Général',
      speciality: 'Expert-Comptable & Stratégie',
      experience: '15+ ans',
      description: 'Vision stratégique et expertise comptable reconnue au Burkina Faso',
      image: '👨‍💼',
      contact: 's.nebrata@durex-management.bf'
    },
    {
      name: 'Anna ZONGO/OUEDRAOGO',
      position: 'Directrice Juridique',
      speciality: 'Droit des Affaires & Fiscal',
      experience: '10 ans',
      description: 'Spécialiste en droit des sociétés et optimisation fiscale',
      image: '👩‍⚖️',
      contact: 'a.oued@durex-management.bf'
    },
    {
      name: 'Tefahot GAMBO/OUEDRAOGO',
      position: 'Comptable',
      speciality: 'Digitalisation & Innovation',
      experience: '10+ ans',
      description: 'Expert en transformation digitale et solutions technologiques',
      image: '👩‍⚖️',
      contact: 't.gamb@durex-management.bf'
    }
  ];

  // Valeurs de l'entreprise
  values = [
    {
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque service délivré',
      icon: '⭐',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Intégrité',
      description: 'Transparence et éthique dans toutes nos relations',
      icon: '🤝',
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Innovation',
      description: 'Solutions modernes et approches innovantes',
      icon: '🚀',
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Proximité',
      description: 'Accompagnement personnalisé et écoute client',
      icon: '💝',
      color: 'from-pink-400 to-pink-600'
    }
  ];

  // Certifications et partenariats
  certifications = [
    'Ordre National des Experts-Comptables du Burkina Faso',
    'Chambre de Commerce et d\'Industrie du Burkina Faso',
    'Association des Juristes du Burkina Faso',
    'Partenaire Microsoft Solutions',
    'Certification ISO 9001 Qualité'
  ];

  ngOnInit(): void {
    // Animation au scroll
    this.setupScrollAnimations();
  }

  private setupScrollAnimations() {
    // Logique d'animation au scroll (optionnel)
  }
}
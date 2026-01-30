import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Input() userRole: 'client' | 'admin' = 'client';
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() menuClick = new EventEmitter<string>();

  // Menu pour clients connectés
  clientMenuItems = [
    {
      title: 'Vue d\'ensemble',
      icon: '🏠',
      route: '/dashboard',
      description: 'Tableau de bord principal'
    },
    {
      title: 'Mes Services',
      icon: '💼',
      route: '/dashboard/services',
      description: 'Services actifs et historique'
    },
    {
      title: 'Demandes en cours',
      icon: '🔄',
      route: '/dashboard/requests',
      description: 'Suivi de vos demandes'
    },
    {
      title: 'Documents',
      icon: '📁',
      route: '/dashboard/documents',
      description: 'Coffre-fort numérique'
    },
    {
      title: 'Facturation',
      icon: '💳',
      route: '/dashboard/billing',
      description: 'Factures et paiements'
    },
    {
      title: 'Support',
      icon: '🎯',
      route: '/dashboard/support',
      description: 'Aide et assistance'
    }
  ];

  // Services DUREX par catégorie
  serviceCategories = [
    {
      title: 'Comptabilité & Finance',
      icon: '📊',
      items: [
        'Audit comptable',
        'Expertise fiscale',
        'Conseil financier'
      ]
    },
    {
      title: 'Juridique',
      icon: '⚖️',
      items: [
        'Conseil juridique',
        'Rédaction contrats',
        'Contentieux'
      ]
    },
    {
      title: 'Ressources Humaines',
      icon: '👥',
      items: [
        'Recrutement',
        'Formation',
        'Paie & social'
      ]
    }
  ];

  onMenuItemClick(route: string) {
    this.menuClick.emit(route);
  }

  close() {
    this.closeSidebar.emit();
  }
}

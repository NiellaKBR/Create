import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';
import { CardComponent } from '../../components/card/card.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TableComponent } from "../../components/table/table.component"; // ← Ajout

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent, ModalComponent, SidebarComponent, TableComponent], // ← Ajout SidebarComponent
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;

  // États des modals et sidebar
  isDevisModalOpen = false;
  isContactModalOpen = false;
  isSidebarOpen = false; // ← Correction : une seule déclaration

  premiumServices = [
    {
      title: 'Audit Express 24h',
      description: 'Diagnostic complet de votre entreprise avec rapport détaillé sous 24h',
      icon: '⚡',
      isPriority: true,
      gradient: 'from-durex-green to-emerald-500',
      action: 'openDevisModal'
    },
    {
      title: 'Consultation VIP',
      description: 'Accès direct à nos experts seniors sans rendez-vous',
      icon: '👑',
      isPriority: true,
      gradient: 'from-amber-500 to-yellow-500',
      action: 'openContactModal' // ← Ajout action manquante
    },
    {
      title: 'Coffre-fort Numérique',
      description: 'Stockage sécurisé de tous vos documents confidentiels',
      icon: '🔒',
      isPriority: false,
      gradient: 'from-blue-500 to-cyan-500',
      action: 'openDevisModal' // ← Ajout action manquante
    },
    {
      title: 'Formation Sur-Mesure',
      description: 'Programmes de formation personnalisés pour vos équipes',
      icon: '🎯',
      isPriority: false,
      gradient: 'from-purple-500 to-pink-500',
      action: 'openContactModal' // ← Ajout action manquante
    },
    {
      title: 'Support Juridique 24/7',
      description: 'Assistance juridique d\'urgence disponible jour et nuit',
      icon: '⚖️',
      isPriority: true,
      gradient: 'from-red-500 to-orange-500',
      action: 'openDevisModal' // ← Ajout action manquante
    },
    {
      title: 'Dashboard Analytics',
      description: 'Tableaux de bord personnalisés pour suivre vos KPIs',
      icon: '📊',
      isPriority: false,
      gradient: 'from-green-500 to-teal-500',
      action: 'openContactModal' // ← Ajout action manquante
    }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe((user: User | null) => {
      this.currentUser = user;
    });
  }

  // Méthodes pour Sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  onMenuClick(route: string) {
    console.log('Navigation vers:', route);
    this.closeSidebar();
  }

  // Méthodes pour Modals
  openDevisModal() {
    this.isDevisModalOpen = true;
  }

  openContactModal() {
    this.isContactModalOpen = true;
  }

  closeModal() {
    this.isDevisModalOpen = false;
    this.isContactModalOpen = false;
  }

  onDevisSubmit(formData: any) {
    console.log('Demande de devis reçue:', formData);
    alert('Demande de devis envoyée avec succès ! Nous vous contacterons sous 24h.');
  }
  onTableRowClick(item: any) {
    console.log('Ligne cliquée:', item);
  }

  onTableActionClick(event: { action: string, item: any }) {
    console.log('Action:', event.action, 'Item:', event.item);
  }

}

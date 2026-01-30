import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() title = 'Tableau de données';
  @Input() type: 'services' | 'requests' | 'billing' | 'team' = 'services';
  @Input() data: any[] = [];
  @Output() rowClick = new EventEmitter<any>();
  @Output() actionClick = new EventEmitter<{action: string, item: any}>();

  // État de tri et filtrage
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 5;
Math: any;

  // Données d'exemple pour différents types
  get tableData() {
    if (this.data.length > 0) return this.filteredAndSortedData;

    switch (this.type) {
      case 'services':
        return this.mockServicesData;
      case 'requests':
        return this.mockRequestsData;
      case 'billing':
        return this.mockBillingData;
      case 'team':
        return this.mockTeamData;
      default:
        return [];
    }
  }

  get filteredAndSortedData() {
    let filtered = this.tableData.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );

    if (this.sortColumn) {
      filtered.sort((a, b) => {
        const aVal = a[this.sortColumn];
        const bVal = b[this.sortColumn];

        if (this.sortDirection === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }

    return filtered;
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredAndSortedData.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredAndSortedData.length / this.itemsPerPage);
  }

  // Données mockées pour démonstration
  mockServicesData = [
    {
      id: 1,
      service: 'Audit Comptable',
      client: 'SARL TECH PLUS',
      dateDebut: '2024-01-15',
      statut: 'En cours',
      montant: '850 000 FCFA',
      priorite: 'Haute'
    },
    {
      id: 2,
      service: 'Formation RH',
      client: 'BURKINA SERVICES',
      dateDebut: '2024-01-10',
      statut: 'Terminé',
      montant: '450 000 FCFA',
      priorite: 'Normale'
    },
    {
      id: 3,
      service: 'Conseil Juridique',
      client: 'OUAGA INVEST',
      dateDebut: '2024-01-20',
      statut: 'En attente',
      montant: '300 000 FCFA',
      priorite: 'Urgente'
    }
  ];

  mockRequestsData = [
    {
      id: 'DEV-001',
      type: 'Devis Express',
      service: 'Audit financier',
      dateCreation: '2024-01-25',
      statut: 'Nouveau',
      delai: '24h'
    },
    {
      id: 'DEV-002',
      type: 'Consultation',
      service: 'Conseil fiscal',
      dateCreation: '2024-01-24',
      statut: 'En traitement',
      delai: '48h'
    }
  ];

  mockBillingData = [
    {
      facture: 'FACT-2024-001',
      client: 'SARL TECH PLUS',
      montant: '850 000 FCFA',
      dateEmission: '2024-01-15',
      dateEcheance: '2024-02-15',
      statut: 'Payée'
    },
    {
      facture: 'FACT-2024-002',
      client: 'BURKINA SERVICES',
      montant: '450 000 FCFA',
      dateEmission: '2024-01-20',
      dateEcheance: '2024-02-20',
      statut: 'En attente'
    }
  ];

  mockTeamData = [
    {
      nom: 'TRAORE Amadou',
      poste: 'Expert-Comptable',
      specialite: 'Audit & Fiscalité',
      experience: '8 ans',
      statut: 'Disponible',
      contact: '+226 XX XX XX XX'
    },
    {
      nom: 'KONATE Aicha',
      poste: 'Juriste Senior',
      specialite: 'Droit des affaires',
      experience: '5 ans',
      statut: 'En mission',
      contact: '+226 XX XX XX XX'
    }
  ];

  // Méthodes
  sort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  onRowClick(item: any) {
    this.rowClick.emit(item);
  }

  onActionClick(action: string, item: any) {
    this.actionClick.emit({ action, item });
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'terminé':
      case 'payée':
      case 'disponible':
        return 'bg-green-100 text-green-800';
      case 'en cours':
      case 'en traitement':
      case 'en mission':
        return 'bg-blue-100 text-blue-800';
      case 'en attente':
      case 'nouveau':
        return 'bg-yellow-100 text-yellow-800';
      case 'urgente':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getPriorityIcon(priority: string): string {
    switch (priority?.toLowerCase()) {
      case 'haute': return '🔴';
      case 'urgente': return '🚨';
      case 'normale': return '🟡';
      default: return '⚪';
    }
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableRow {
  id?: string | number;

  service?: string;
  client?: string;
  dateDebut?: string;
  statut?: string;
  montant?: string;
  priorite?: string;

  type?: string;
  dateCreation?: string;
  delai?: string;

  facture?: string;
  dateEmission?: string;
  dateEcheance?: string;

  nom?: string;
  poste?: string;
  specialite?: string;
  experience?: string;
  contact?: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  Math = Math;

  @Input() title = 'Tableau de données';
  @Input() type: 'services' | 'requests' | 'billing' | 'team' = 'services';
  @Input() data: TableRow[] = [];

  @Output() rowClick = new EventEmitter<TableRow>();
  @Output() actionClick = new EventEmitter<{ action: string; item: TableRow }>();

  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 5;

  get tableData(): TableRow[] {
    if (this.data.length > 0) return this.filteredAndSortedData;

    switch (this.type) {
      case 'services': return this.mockServicesData;
      case 'requests': return this.mockRequestsData;
      case 'billing': return this.mockBillingData;
      case 'team': return this.mockTeamData;
      default: return [];
    }
  }

  get filteredAndSortedData(): TableRow[] {
    let filtered = this.tableData.filter(item =>
      Object.values(item).some(value =>
        String(value ?? '').toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );

    if (this.sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[this.sortColumn as keyof TableRow];
        const bVal = b[this.sortColumn as keyof TableRow];

        if (aVal == null) return -1;
        if (bVal == null) return 1;

        if (this.sortDirection === 'asc') return aVal > bVal ? 1 : -1;
        return aVal < bVal ? 1 : -1;
      });
    }

    return filtered;
  }

  get paginatedData(): TableRow[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAndSortedData.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredAndSortedData.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  sort(column: string): void {
    this.sortColumn = this.sortColumn === column ? column : column;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  onRowClick(item: TableRow): void {
    this.rowClick.emit(item);
  }

  onActionClick(action: string, item: TableRow): void {
    this.actionClick.emit({ action, item });
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  getStatusClass(status?: string): string {
    if (!status) return 'bg-gray-100 text-gray-800';
    switch (status.toLowerCase()) {
      case 'terminé':
      case 'payée':
      case 'disponible': return 'bg-green-100 text-green-800';
      case 'en cours':
      case 'en traitement':
      case 'en mission': return 'bg-blue-100 text-blue-800';
      case 'en attente':
      case 'nouveau': return 'bg-yellow-100 text-yellow-800';
      case 'urgente': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getPriorityIcon(priority?: string): string {
    switch (priority?.toLowerCase()) {
      case 'haute': return '🔴';
      case 'urgente': return '🚨';
      case 'normale': return '🟡';
      default: return '⚪';
    }
  }

  // ================= MOCK DATA =================

  mockServicesData: TableRow[] = [
    { id: 1, service: 'Audit Comptable', client: 'SARL TECH PLUS', dateDebut: '2024-01-15', statut: 'En cours', montant: '850 000 FCFA', priorite: 'Haute' },
    { id: 2, service: 'Formation RH', client: 'BURKINA SERVICES', dateDebut: '2024-01-10', statut: 'Terminé', montant: '450 000 FCFA', priorite: 'Normale' },
    { id: 3, service: 'Conseil Juridique', client: 'OUAGA INVEST', dateDebut: '2024-01-20', statut: 'En attente', montant: '300 000 FCFA', priorite: 'Urgente' }
  ];

  mockRequestsData: TableRow[] = [
    { id: 'DEV-001', type: 'Devis Express', service: 'Audit financier', dateCreation: '2024-01-25', statut: 'Nouveau', delai: '24h' },
    { id: 'DEV-002', type: 'Consultation', service: 'Conseil fiscal', dateCreation: '2024-01-24', statut: 'En traitement', delai: '48h' }
  ];

  mockBillingData: TableRow[] = [
    { facture: 'FACT-2024-001', client: 'SARL TECH PLUS', montant: '850 000 FCFA', dateEmission: '2024-01-15', dateEcheance: '2024-02-15', statut: 'Payée' },
    { facture: 'FACT-2024-002', client: 'BURKINA SERVICES', montant: '450 000 FCFA', dateEmission: '2024-01-20', dateEcheance: '2024-02-20', statut: 'En attente' }
  ];

  mockTeamData: TableRow[] = [
    { nom: 'TRAORE Amadou', poste: 'Expert-Comptable', specialite: 'Audit & Fiscalité', experience: '8 ans', statut: 'Disponible', contact: '+226 XX XX XX XX' },
    { nom: 'KONATE Aicha', poste: 'Juriste Senior', specialite: 'Droit des affaires', experience: '5 ans', statut: 'En mission', contact: '+226 XX XX XX XX' }
  ];
}

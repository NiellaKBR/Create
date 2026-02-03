import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService, User } from '../../services/auth.service';

@Component({
    selector: 'app-services-premium',
    standalone: true,
    imports: [CommonModule, ModalComponent],
    templateUrl: './services-premium.component.html',
    styleUrls: ['./services-premium.component.scss']
})
export class ServicesPremiumComponent implements OnInit {
    onAppelSubmit($event: any) {
        throw new Error('Method not implemented.');
    }
    onConsultationSubmit($event: any) {
        throw new Error('Method not implemented.');
    }
    currentUser: User | null = null;
    isDevisModalOpen = false;
    selectedService: any = null;

    isConsultationModalOpen = false;
    isAppelModalOpen = false;

    openConsultationModal() {
        this.isConsultationModalOpen = true;
    }

    openAppelModal() {
        this.isAppelModalOpen = true;
    }

    // Services premium avec détails complets
    servicesPremium = [
        {
            id: 1,
            title: 'Audit & Expertise Comptable',
            icon: '📊',
            description: 'Analyse complète et optimisation de votre gestion financière',
            features: [
                'Audit comptable annuel certifié',
                'Déclarations fiscales (IS, TVA, IRPP)',
                'Conseil en optimisation fiscale',
                'Mise en conformité SYSCOHADA',
                'Formation équipe comptable',
                'Tableaux de bord financiers'
            ],
            process: [
                'Audit préliminaire (2-3 jours)',
                'Analyse approfondie (5-7 jours)',
                'Rapport détaillé avec recommandations',
                'Plan d\'action personnalisé',
                'Suivi mensuel pendant 6 mois'
            ],
            tarifs: {
                basic: '500 000 FCFA',
                premium: '850 000 FCFA',
                enterprise: '1 200 000 FCFA'
            },
            delai: '10-15 jours ouvrables',
            garantie: 'Satisfaction 100% ou remboursement'
        },
        {
            id: 2,
            title: 'Conseil Juridique & Fiscal',
            icon: '⚖️',
            description: 'Protection juridique complète pour votre entreprise',
            features: [
                'Rédaction tous types de contrats',
                'Contentieux et représentation',
                'Conseil en droit des affaires',
                'Propriété intellectuelle',
                'Droit social et RH',
                'Conformité réglementaire'
            ],
            process: [
                'Diagnostic juridique gratuit',
                'Stratégie personnalisée',
                'Rédaction/Action juridique',
                'Suivi et mise à jour',
                'Formation équipes'
            ],
            tarifs: {
                basic: '200 000 FCFA',
                premium: '400 000 FCFA',
                enterprise: '600 000 FCFA'
            },
            delai: '5-10 jours ouvrables',
            garantie: 'Conseils certifiés par nos juristes seniors'
        },
        // ... autres services avec même niveau de détail
    ];

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    openDevisModal(service: any) {
        this.selectedService = service;
        this.isDevisModalOpen = true;
    }

    closeModal() {
        this.isDevisModalOpen = false;
        this.selectedService = null;
    }

    onDevisSubmit(formData: any) {
        console.log('Devis premium pour:', this.selectedService.title, formData);
        alert(`Demande de devis reçue pour ${this.selectedService.title}. Notre équipe vous contactera sous 2h !`);
    }
}
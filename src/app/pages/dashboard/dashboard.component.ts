import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;

  premiumServices = [
    {
      title: 'Devis Express',
      description: 'Obtenez un devis personnalisé en 24h',
      icon: '⚡',
      action: '/devis',
      priority: true
    },
    {
      title: 'Consultation Prioritaire',
      description: 'Accès direct à nos experts',
      icon: '🎯',
      action: '/consultation',
      priority: true
    },
    {
      title: 'Documents Sécurisés',
      description: 'Vos documents confidentiels',
      icon: '🔒',
      action: '/documents'
    },
    {
      title: 'Historique Services',
      description: 'Suivi de vos demandes',
      icon: '📊',
      action: '/historique'
    }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Correction : currentUser (sans $)
    this.authService.currentUser.subscribe((user: User | null) => {
      this.currentUser = user;
    });
  }
}
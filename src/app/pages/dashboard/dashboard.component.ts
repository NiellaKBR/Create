import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';
import { CardComponent } from '../../components/card/card.component'; // ← Ajout

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent], // ← Ajout CardComponent
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;

  // Services Premium exclusifs aux clients connectés
  premiumServices = [
    {
      title: 'Audit Express 24h',
      description: 'Diagnostic complet de votre entreprise avec rapport détaillé sous 24h',
      icon: '⚡',
      isPriority: true,
      gradient: 'from-durex-green to-emerald-500'
    },
    {
      title: 'Consultation VIP',
      description: 'Accès direct à nos experts seniors sans rendez-vous',
      icon: '👑',
      isPriority: true,
      gradient: 'from-amber-500 to-yellow-500'
    },
    {
      title: 'Coffre-fort Numérique',
      description: 'Stockage sécurisé de tous vos documents confidentiels',
      icon: '🔒',
      isPriority: false,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Formation Sur-Mesure',
      description: 'Programmes de formation personnalisés pour vos équipes',
      icon: '🎯',
      isPriority: false,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Support Juridique 24/7',
      description: 'Assistance juridique d\'urgence disponible jour et nuit',
      icon: '⚖️',
      isPriority: true,
      gradient: 'from-red-500 to-orange-500'
    },
    {
      title: 'Dashboard Analytics',
      description: 'Tableaux de bord personnalisés pour suivre vos KPIs',
      icon: '📊',
      isPriority: false,
      gradient: 'from-green-500 to-teal-500'
    }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe((user: User | null) => {
      this.currentUser = user;
    });
  }
}
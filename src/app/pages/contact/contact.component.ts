import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  // Formulaire de contact
  contactForm = {
    prenom: '',
    nom: '',
    entreprise: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
    serviceInteresse: '',
    urgence: 'normale'
  };

  // Services disponibles
  services = [
    'Audit & Expertise Comptable',
    'Conseil Juridique & Fiscal',
    'Formation Professionnelle',
    'Ressources Humaines',
    'Gestion Immobilière',
    'Logistique & Digitalisation',
    'Conseil en Management'
  ];

  // Informations de contact
  contactInfo = {
    adresse: 'Secteur 15, Avenue Kwame Nkrumah, Ouagadougou',
    telephone: '+226 25 XX XX XX',
    mobile: '+226 70 XX XX XX',
    email: 'contact@durex-management.bf',
    horaires: {
      semaine: 'Lundi - Vendredi: 8h00 - 18h00',
      samedi: 'Samedi: 8h00 - 14h00',
      urgence: 'Urgences: 24h/7j'
    }
  };

  // Bureaux régionaux
  bureaux = [
    {
      ville: 'Ouagadougou',
      type: 'Siège Social',
      adresse: 'Secteur 15, Avenue Kwame Nkrumah',
      telephone: '+226 25 XX XX XX',
      responsable: 'Serges NEBRATA'
    },
    {
      ville: 'Bobo-Dioulasso',
      type: 'Antenne Régionale',
      adresse: 'Quartier Sarfalao, Boulevard de la Révolution',
      telephone: '+226 20 XX XX XX',
      responsable: 'Aicha TRAORE'
    },
    {
      ville: 'Koudougou',
      type: 'Bureau de Liaison',
      adresse: 'Centre-ville, Avenue de la Paix',
      telephone: '+226 25 XX XX XX',
      responsable: 'Moussa KONE'
    }
  ];

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.clearMessages();

    // Simulation envoi
    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = `Merci ${this.contactForm.prenom} ! Votre message a été envoyé. Nous vous contacterons sous 24h.`;
      this.resetForm();
    }, 1500);
  }

  private validateForm(): boolean {
    this.clearMessages();

    if (!this.contactForm.prenom || !this.contactForm.nom || !this.contactForm.email || !this.contactForm.message) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      return false;
    }

    if (!this.isValidEmail(this.contactForm.email)) {
      this.errorMessage = 'Email invalide';
      return false;
    }

    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private resetForm() {
    this.contactForm = {
      prenom: '',
      nom: '',
      entreprise: '',
      email: '',
      telephone: '',
      sujet: '',
      message: '',
      serviceInteresse: '',
      urgence: 'normale'
    };
  }

  private clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
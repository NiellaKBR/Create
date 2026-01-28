
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode = true;
  
  // Formulaire Connexion
  loginEmail = '';
  loginPassword = '';
  
  // Formulaire Inscription
  registerPrenom = '';
  registerNom = '';
  registerEmail = '';
  registerPassword = '';
  registerConfirmPassword = '';
  
  // Messages
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Bascule entre Connexion et Inscription
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.clearMessages();
  }

  // Connexion
  onLogin() {
    this.clearMessages();

    if (!this.loginEmail || !this.loginPassword) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      const result = this.authService.login(this.loginEmail, this.loginPassword);
      this.isLoading = false;

      if (result.success) {
        this.successMessage = `Bienvenue ${result.user?.prenom} ! 🎉`;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      } else {
        this.errorMessage = result.message;
      }
    }, 800);
  }

  // Inscription
  onRegister() {
    this.clearMessages();

    // Validations
    if (!this.registerPrenom || !this.registerNom || !this.registerEmail || !this.registerPassword) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    if (this.registerPassword.length < 6) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }

    if (this.registerPassword !== this.registerConfirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    if (!this.isValidEmail(this.registerEmail)) {
      this.errorMessage = 'Email invalide';
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      const result = this.authService.register(
        this.registerPrenom,
        this.registerNom,
        this.registerEmail,
        this.registerPassword
      );
      this.isLoading = false;

      if (result.success) {
        this.successMessage = `Bienvenue ${this.registerPrenom} ! Votre compte a été créé 🎉`;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      } else {
        this.errorMessage = result.message;
      }
    }, 800);
  }

  // Utilitaires
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }
}

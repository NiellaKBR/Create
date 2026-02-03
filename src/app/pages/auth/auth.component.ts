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

  loginEmail = '';
  loginPassword = '';

  registerPrenom = '';
  registerNom = '';
  registerEmail = '';
  registerPassword = '';
  registerConfirmPassword = '';

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  setLoginMode(mode: boolean) {
    this.isLoginMode = mode;
    this.clearMessages();
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.clearMessages();
  }
  onLogin() {
    console.log('🔍 onLogin appelée');
    console.log('📧 Email:', this.loginEmail);
    console.log('🔒 Password:', this.loginPassword);

    this.clearMessages();

    if (!this.loginEmail || !this.loginPassword) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      const result = this.authService.login(this.loginEmail, this.loginPassword);
      console.log('📝 Résultat login:', result);

      this.isLoading = false;

      if (result.success) {
        console.log('🎉 Connexion réussie!');
        this.successMessage = `Bienvenue ${result.user?.prenom} ! 🎉`;
        setTimeout(() => {
          console.log('🔄 Redirection vers dashboard...');
          // Utiliser la même méthode pour les deux
          this.router.navigate(['/dashboard']).then(success => {
            console.log('Navigation réussie:', success);
            if (!success) {
              console.log('Fallback vers window.location');
              window.location.href = '/dashboard';
            }
          });
        }, 1500);
      } else {
        console.log('❌ Échec connexion:', result.message);
        this.errorMessage = result.message;
      }
    }, 800);
  }

  onRegister() {
    this.clearMessages();

    if (!this.registerPrenom || !this.registerNom || !this.registerEmail || !this.registerPassword) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    if (this.registerPassword.length < 6) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
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
          // Même méthode que login pour cohérence
          this.router.navigate(['/dashboard']).then(success => {
            if (!success) {
              window.location.href = '/dashboard';
            }
          });
        }, 1500);
      } else {
        this.errorMessage = result.message;
      }
    }, 800);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
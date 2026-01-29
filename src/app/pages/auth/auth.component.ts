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
          this.router.navigate(['/dashboard']);
        }, 1500);
      } else {
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
          this.router.navigate(['/dashboard']); // CORRECTION: enlever le ;;
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
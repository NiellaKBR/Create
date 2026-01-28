
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  password: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Inscription
  register(prenom: string, nom: string, email: string, password: string): { success: boolean; message: string } {
    // Récupère tous les utilisateurs
    const users = this.getAllUsers();

    // Vérifie si l'email existe déjà
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Cet email est déjà utilisé' };
    }

    // Crée le nouvel utilisateur
    const newUser: User = {
      id: Date.now().toString(),
      prenom,
      nom,
      email,
      password, // En prod, il faudrait hasher le mot de passe !
      createdAt: new Date()
    };

    // Ajoute l'utilisateur à la liste
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Connecte automatiquement l'utilisateur
    this.login(email, password);

    return { success: true, message: 'Inscription réussie !' };
  }

  // Connexion
  login(email: string, password: string): { success: boolean; message: string; user?: User } {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: 'Email ou mot de passe incorrect' };
    }

    // Stocke l'utilisateur connecté
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);

    return { success: true, message: 'Connexion réussie !', user };
  }

  // Déconnexion
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Récupère tous les utilisateurs
  private getAllUsers(): User[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }
}

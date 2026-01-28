import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Correction : utiliser currentUser au lieu de isLoggedIn
    if (authService.currentUser) {
        return true;
    } else {
        router.navigate(['/auth']);
        return false;
    }
};
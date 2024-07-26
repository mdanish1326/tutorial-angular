import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { UserMetadata } from '../model/User.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  localStorageService = inject(LocalStorageService)
  router = inject(Router)

  constructor() { }

  isAuthenticated(): boolean {
    return this.localStorageService.get('isAuthenticated');
  }

  isUserValid(username: string, password: string): UserMetadata {
    const user = this.localStorageService.get('user');
    if (user) {
      if (user.username === username && user.password === password) {
        this.localStorageService.set('isAuthenticated', true);
        return { exist: true, valid: true };
      } else {
        return { exist: true, valid: false };
      }
    } else {
      return { exist: false, valid: false };
    }
  }

  logout() {
    this.localStorageService.remove('isAuthenticated');
    this.router.navigate(['/login']);
  }

  deleteAccount() {
    this.localStorageService.remove('user');
    this.router.navigate(['/signup']);
  }
}

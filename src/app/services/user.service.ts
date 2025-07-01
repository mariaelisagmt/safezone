import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { IUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/User`;
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  private router = inject(Router);

  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      this.currentUserSubject.next(JSON.parse(userJson));
    }
  }

  login(email: string, password: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}Login`).pipe(
      tap((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.router.navigate(['/home']);
      })
    );
  }

  register(userData: Partial<IUser> & { password: string }): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}`, userData).pipe(
      tap((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  updateProfile(userData: Partial<IUser>): Observable<IUser> {
    const current = this.currentUserSubject.value;
    if (!current) throw new Error('Usuário não autorizado.');

    return this.http.put<IUser>(`${this.apiUrl}/${current.id}`, userData).pipe(
      tap((updatedUser) => {
        const merged = { ...current, ...updatedUser };
        localStorage.setItem('currentUser', JSON.stringify(merged));
        this.currentUserSubject.next(merged);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getToken(): string | null {
    return this.currentUserSubject.value?.token || null;
  }
}

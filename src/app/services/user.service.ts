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
  private router = inject(Router);
  private apiUrl = `${environment.apiUrl}/User`;
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  private user: IUser = {
    email: '',
    password: '',
  };

  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      this.currentUserSubject.next(JSON.parse(userJson));
    }
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        const userId = JSON.parse(atob(response.token.split('.')[1])).userId; // decodificando o JWT e pegando o userId
        localStorage.setItem('userId', userId);
        this.user = {
          userId: userId,
          email: email,
          password: '',
        };
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.router.navigate(['/home']);
      })
    );
  }

  getUser(userId: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${userId}`).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
      })
    );
  }

  register(userData: Partial<IUser>): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}`, userData).pipe(
      tap((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.router.navigate(['/home']);
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
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('userId') != null && localStorage.getItem('token') != null;
  }

  getToken(): string | null {
    return this.currentUserSubject.value?.token || localStorage.getItem('token');
  }
}

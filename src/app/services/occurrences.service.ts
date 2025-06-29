import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOcurrence } from '../interfaces/occurrence.interface';
import { environment } from '../../environment/environment';
import { IOcurrenceGroup } from '../interfaces/occurrenceGroup.interface';

@Injectable({
  providedIn: 'root',
})
export class OcurrenceService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/ocurrences`;

  getAll(): Observable<IOcurrenceGroup[]> {
    return this.http.get<IOcurrenceGroup[]>(this.apiUrl);
  }

  getById(id: string): Observable<IOcurrence> {
    return this.http.get<IOcurrence>(`${this.apiUrl}/${id}`);
  }

  create(data: IOcurrence): Observable<IOcurrence> {
    return this.http.post<IOcurrence>(this.apiUrl, data);
  }

  update(id: string, data: Partial<IOcurrence>): Observable<IOcurrence> {
    return this.http.put<IOcurrence>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getOcurrencesByUser(userId: string): Observable<IOcurrence[]> {
    return this.http.get<IOcurrence[]>(`${this.apiUrl}User`);
  }
}

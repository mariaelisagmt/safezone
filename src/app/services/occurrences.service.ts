import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as rxjs from 'rxjs';
import { environment } from '../../environment/environment';
import { IOcurrence } from '../interfaces/occurrence.interface';
import { AddressForm } from '../models/addressform.model';

@Injectable({
  providedIn: 'root',
})
export class OcurrenceService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Occurence`;

  getAll(): rxjs.Observable<IOcurrence[]> {
    return this.http.get<IOcurrence[]>(this.apiUrl);
  }

  getById(id: string): rxjs.Observable<IOcurrence> {
    return this.http.get<IOcurrence>(`${this.apiUrl}/${id}`);
  }

  create(data: AddressForm): rxjs.Observable<AddressForm> {
    return this.http.post<AddressForm>(this.apiUrl, data);
  }

  update(id: number, data: AddressForm): rxjs.Observable<IOcurrence> {
    return this.http.put<IOcurrence>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): rxjs.Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getOcurrencesByUser(userId: number): rxjs.Observable<AddressForm[]> {
    return this.http
      .get<AddressForm[]>(`${this.apiUrl}`)
      .pipe(rxjs.map((dados) => dados.filter((o) => o.userId == userId)));
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOcurrence } from '../interfaces/occurrence.interface';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchAddressService {
  private http = inject(HttpClient);
  private mapUrl = `${environment.searchMapUrl}`;

  getAddress(query: string): Observable<any> {
    return this.http.get(`${this.mapUrl}/search?q=${query}&limit=5&format=json&addressdetails=1`);
  }
}

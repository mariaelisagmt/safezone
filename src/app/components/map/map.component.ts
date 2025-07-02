/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, AfterViewInit, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import 'leaflet-control-geocoder';

import { AddOccurrenceModalComponent } from '../add-occurrencemodal/add-occurrencemodal';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchAddressService } from '../../services/searchAddress.service';
import { IOcurrence } from '../../interfaces/occurrence.interface';

@Component({
  selector: 'app-map',
  imports: [AddOccurrenceModalComponent, CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private ocurrences: IOcurrence[] = [];
  private searchAddressService = inject(SearchAddressService);

  showModal = false;
  modalLat = 0;
  modalLng = 0;

  constructor(
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  openModal(lat: number, lng: number) {
    this.modalLat = lat;
    this.modalLng = lng;
    this.showModal = true;
    this.cdr.detectChanges(); // Force Angular to update the view
  }

  closeModal() {
    this.showModal = false;
  }

  onModalSubmit(data: { latitude: number; longitude: number; description: string }) {
    // Handle the submitted data (e.g., save occurrence)
    const submitBtn = document.getElementById('add-occurrence-submit-button') as HTMLButtonElement;
    if (submitBtn) {
      submitBtn.disabled = true; // Disable the button to prevent multiple submissions
    }

    console.log('Occurrence submitted:', data);

    this.snackBar.open('Ocorrência adicionada com sucesso!', 'Fechar', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar-success'],
    });

    submitBtn.disabled = false; // Re-enable the button after submission
    this.closeModal();
  }

  private initMap(): void {
    this.map = L.map('mapa').setView([-23.5505, -46.6333], 13); //Definindo local padrão

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    // Popup com modal de formulário para add ocorrência
    this.map.on('click', (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      let address = '';

      this.searchAddressService.getAddressByLatLng(lat, lng).subscribe({
        next: (data) => {
          address = data.display_name || 'Endereço não encontrado';
        },
        error: (error) => console.error('Erro ao buscar endereço:', error),
      });

      const popupContent = `Lat: ${lat.toFixed(5)}, Long: ${lng.toFixed(5)} </br><button id="openModalBtn">Adicionar ocorrência</button>`;

      const popup = L.popup().setLatLng(e.latlng).setContent(popupContent).openOn(this.map);

      setTimeout(() => {
        const btn = document.getElementById('openModalBtn');
        if (btn) {
          btn.onclick = () => {
            this.openModal(lat, lng);
            this.map.closePopup();
          };
        }
      }, 0);

      popup.on('remove', () => {
        console.log('Popup closed');
      });
    });
  }
}

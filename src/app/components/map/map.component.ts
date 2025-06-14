import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import 'leaflet-control-geocoder';

import { IOcurrence } from '../../interfaces/occurrence.interface';
import { OcurrenceService } from '../../services/occurrences.service';
import { catchError, map, of } from 'rxjs';
import { AddOccurrenceModalComponent } from '../add-occurrencemodal/add-occurrencemodal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  imports: [AddOccurrenceModalComponent, CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private ocurrences: IOcurrence[] = [];

  showModal = false;
  modalLat = 0;
  modalLng = 0;

  constructor(
    private ocurrenceService: OcurrenceService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadOccurrences();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  openModal(lat: number, lng: number) {
    this.modalLat = lat;
    this.modalLng = lng;
    this.showModal = true;
    this.cdr.detectChanges(); // Force Angular to update the view
  }

  onModalSubmit(data: { latitude: number; longitude: number; description: string }) {
    // Handle the submitted data (e.g., save occurrence)
    console.log('Occurrence submitted:', data);
    this.showModal = false;
  }

  onModalClose() {
    this.showModal = false;
  }

  private initMap(): void {
    this.map = L.map('mapa').setView([-23.5505, -46.6333], 13);//Definindo local padrão

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    // Geocoder (busca) - Melhorar Layout
    (L.Control as any).geocoder({
      defaultMarkGeocode: true
    }).addTo(this.map);

    // Mapa de calor

    const heat = (L as any).heatLayer([
      [-23.5505, -46.6333, 0.5],
      [-23.5605, -46.6433, 10],
      [-23.5405, -46.6233, 70]
    ], {
      radius: 50,
      gradient: {
        0.3: 'green',
        0.6: 'yellow',
        1.0: 'red'
      }
    }).addTo(this.map);

    this.map.on('zoomend', () => {
      const currentZoom = this.map.getZoom();
      console.log('Zom', currentZoom);
      if (currentZoom >= 10 && currentZoom <= 15) {
        if (!this.map.hasLayer(heat)) {
          heat.addTo(this.map);
        }
      } else {
        if (this.map.hasLayer(heat)) {
          this.map.removeLayer(heat);
        }
      }
    });

    // Popup com modal de formulário para add ocorrência
    this.map.on('click', (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      console.log(lat, lng);

      const popupContent = `<button id="openModalBtn">Adicionar ocorrência</button>`;

      const popup = L.popup()
        .setLatLng(e.latlng)
        .setContent(popupContent)
        .openOn(this.map);

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
      })
    })

    // Inicializa o mapa com o heatmap só se estiver no zoom certo
    if (this.map.getZoom() >= 10 && this.map.getZoom() <= 15) {
      heat.addTo(this.map);
    }

    let areas: AreaComValor[] = [
      {
        coordenadas: [
          [-23.550, -46.630],
          [-23.560, -46.630],
          [-23.560, -46.640],
          [-23.565, -46.655],
          [-23.570, -46.660],
          [-23.580, -46.660],
          [-23.580, -46.670]
        ],
        valor: 50
      },
      {
        coordenadas: [
          [-23.560, -46.620],
          [-23.560, -46.630],
          [-23.570, -46.630],
          [-23.570, -46.620]
        ],
        valor: 90
      }
    ];


    areas.forEach(area => {
      L.polygon(area.coordenadas, { // quadrado
        color: 'black',
        weight: 1,
        fillColor: this.getCor(area.valor),
        fillOpacity: 0.6
      }).addTo(this.map);
    });

    const pontos = [
      { lat: -23.5505, lng: -46.6233, valor: 30 },
      { lat: -23.5605, lng: -46.6133, valor: 70 },
      { lat: -23.5405, lng: -46.6033, valor: 90 }
    ];

    pontos.forEach(p => {
      L.circle([p.lat, p.lng], {
        radius: 500, // metros (ajuste conforme escala desejada)
        color: 'transparent', // sem contorno
        fillColor: this.getCor(p.valor),
        fillOpacity: 0.4 // transparência
      }).addTo(this.map);
    });


  }

  loadOccurrences(): void {
    this.ocurrenceService.getAll().pipe(
      map(dados => dados.filter(o => o.amount > 5)),
      catchError(error => {
        console.error('Erro ao carregar ocorrências:', error);
        return of([]);
      })
    ).subscribe(result => {
      this.ocurrences = result;
      this.plotOccurrenceOnMap();
    });
  }

  private plotOccurrenceOnMap() {
    this.ocurrences.forEach(ponto => {
      const html = this.criarMarcadorHTML(ponto.icon, ponto.amount);
      L.marker([ponto.height, ponto.width], {
        icon: L.divIcon({
          className: '',
          html: html,
          iconSize: [80, 50],
          iconAnchor: [40, 50]
        })
      }).addTo(this.map);
    });
  }

  private criarMarcadorHTML(icone: string, numero: number): string {
    return `
      <div class="balao-fala">
        <div class="icone-bola">${icone}</div>
        <span>${numero}</span>
      </div>
    `;
  }




  getCor(valor: number): string {
    if (valor >= 80) return 'red';
    if (valor >= 60) return 'orange';
    if (valor >= 40) return 'yellow';
    return 'green';
  }









}

interface AreaComValor {
  coordenadas: [number, number][]; // array de [lat, lng]
  valor: number;
}

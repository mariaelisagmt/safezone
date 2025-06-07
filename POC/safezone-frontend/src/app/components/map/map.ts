import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import 'leaflet-control-geocoder';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.scss'
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('mapa').setView([-23.5505, -46.6333], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    // Geocoder (busca)
    (L.Control as any).geocoder({
  defaultMarkGeocode: true
}).addTo(this.map);

    // Marcador numerado
    const marker = L.marker([-23.5505, -46.6333], {
  icon: L.divIcon({
    className: 'number-icon',
    html: '15555555',
    iconSize: [30, 30],
    iconAnchor: [15, 30], // ponto do ícone que fica na coordenada (centralizado horizontalmente)
  })
}).addTo(this.map);

    // Mapa de calor
    const heat = (L as any).heatLayer([
      [-23.5505, -46.6333, 0.5],
      [-23.5605, -46.6433, 0.8],
      [-23.5405, -46.6233, 0.2]
    ], {
      radius: 25
    }).addTo(this.map);
  }
}

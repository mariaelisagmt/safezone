import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import 'leaflet-control-geocoder';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;


  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    //Setando o lugar padrão
    this.map = L.map('mapa').setView([-23.5505, -46.6333], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    // Geocoder (busca) - Melhorar Layout
    (L.Control as any).geocoder({
  defaultMarkGeocode: true
}).addTo(this.map);

const marcadorHTML = `
  <div class="balao-fala">
    <div class="icone-bola">👤</div>
    <span>23</span>
  </div>
`;
    // Bolotinha
    const marker = L.marker([-23.5505, -46.6333], {
  icon: L.divIcon({
    className: '',
    html: marcadorHTML,
    iconSize: [80, 50],
    iconAnchor: [40, 50]
  })
}).addTo(this.map);

    // Mapa de calor
    /*
    const heat = (L as any).heatLayer([
      [-23.5505, -46.6333, 0.5],
      [-23.5605, -46.6433, 0.8],
      [-23.5405, -46.6233, 0.2]
    ], {
      radius: 25
    }).addTo(this.map);*/
  }
}

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import 'leaflet-control-geocoder';

import { OcurrenceService } from '../../services/occurrences.service';
import { SearchAddressService } from '../../services/searchAddress.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddOccurrenceModalComponent } from '../add-occurrencemodal/add-occurrencemodal';
import { CommonModule } from '@angular/common';
import { showAddressPopup } from '../../utils/mapPopupUtil';
import { AddressForm } from '../../models/addressform.model';
import { calculateNClusters } from '../../utils/calculatedCentroid';
import { IOcurrence } from '../../interfaces/occurrence.interface';
import { getOccurrenceIcon } from '../../utils/convertTypeOcurrence';

@Component({
  selector: 'app-map-occurrence',
  standalone: true,
  imports: [AddOccurrenceModalComponent, CommonModule],
  templateUrl: './map-occurrence.component.html',
  styleUrl: './map-occurrence.component.scss',
})
export class MapOccurrenceComponent implements OnInit, AfterViewInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() addressToSearch: any;

  private ocurrenceService = inject(OcurrenceService);
  private map!: L.Map;
  private searchAddressService = inject(SearchAddressService);
  private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);
  private ocurrences: IOcurrence[] = [];

  private heatPoints = L.layerGroup();
  private ocurrencePoints = L.layerGroup();

  customIcon = L.icon({
    iconUrl: 'assets/custom-maker.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  // Configurações do modal e popup
  showModal = false;
  modalLat = 0;
  modalLng = 0;
  address = '';

  openModal(lat: number, lng: number, address: string) {
    // Função para abrir modal com os dados da ocorrência. Ela é passada na chamada de showAddressPopup
    // que é chamada no evento de click do mapa.
    this.showModal = true;
    this.modalLat = lat;
    this.modalLng = lng;
    this.address = address;
    this.cdr.detectChanges(); // Forçar a detecção de mudanças para atualizar o modal
  }

  closeModal() {
    this.showModal = false;
    this.modalLat = 0;
    this.modalLng = 0;
    this.address = '';
    this.cdr.detectChanges(); // Forçar a detecção de mudanças para atualizar o modal
  }

  onModalSubmit(data: AddressForm): void {
    // Handle the submitted data (e.g., save occurrence)
    const submitBtn = document.getElementById('add-occurrence-submit-button') as HTMLButtonElement;
    if (submitBtn) {
      submitBtn.disabled = true; // Desabilitar o submit enquanto processa o envio
    }

    this.ocurrenceService.create(data).subscribe({
      next: (response) => {
        console.log('Ocorrência adicionada com sucesso:', response);
        this.snackBar.open('Ocorrência adicionada com sucesso!', 'Fechar', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snackbar-success'],
        });
      },
      error: (error) => {
        console.error('Erro ao adicionar ocorrência:', error);
        this.snackBar.open('Erro ao adicionar ocorrência. Tente novamente.', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snackbar-error'],
        });

        if (submitBtn) {
          submitBtn.disabled = false; // Reativar o submit em caso de erro
        }
      },
    });

    submitBtn.disabled = false; // Reativar o submit após envio
    this.closeModal();

    // automaticamente recarrega a página após 3 segundos
    setTimeout(() => window.location.reload(), 3000);
  }

  ngOnInit(): void {
    this.loadOccurrences();
  }

  ngAfterViewInit(): void {
    this.initMap();

    // Comportamento do modal
    // Popup com modal de formulário para add ocorrência
    this.map.on('click', (e) => {
      showAddressPopup(
        this.map,
        e.latlng.lat,
        e.latlng.lng,
        this.searchAddressService,
        this.openModal.bind(this)
      );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['addressToSearch'] && changes['addressToSearch'].currentValue) {
      const newAddress = changes['addressToSearch'].currentValue;
      const location = newAddress[0];
      const latlng = L.latLng(location.lat, location.lon);
      L.marker(latlng, { icon: this.customIcon }).addTo(this.map);
      this.map.setView(latlng, 15);
    }
  }

  private initMap(): void {
    this.map = L.map('mapa').setView([-3.7304512, -38.5217989], 12); //Definindo local padrão - Fortaleza

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);
  }

  loadOccurrences(): void {
    this.ocurrenceService.getAll().subscribe({
      next: (response) => {
        this.ocurrences = response;
        this.defineOccurrenceOnMap();
        this.plotHeatMap();
      },
      error: (error) => {
        console.error('Erro ao carregar ocorrências:', error);
      },
    });
  }

  private defineOccurrenceOnMap() {
    this.ocurrences.forEach((ponto) => {
      const html = this.criarMarcadorHTML(getOccurrenceIcon(ponto.type), 1);

      const marker = L.marker([ponto.latitude, ponto.longitude], {
        icon: L.divIcon({
          className: '',
          html: html,
          iconSize: [80, 50],
          iconAnchor: [40, 50],
        }),
      });

      this.ocurrencePoints.addLayer(marker);
    });
  }

  private plotHeatMap() {
    const points = this.ocurrences.map((o) => {
      return {
        lat: o.latitude,
        lng: o.longitude,
      };
    });
    const result = calculateNClusters(points, 3);
    console.log('Dados clusterizados:', result);
    result.forEach((cluster) => {
      const heat = L.circle([cluster.center.lat, cluster.center.lng], {
        radius: cluster.radius, // metros (ajuste conforme escala desejada)
        color: 'transparent', // sem contorno
        fillColor: this.getCor(cluster.classify),
        fillOpacity: 0.4, // transparência
      });

      this.heatPoints.addLayer(heat);
    });

    this.map.on('zoomend', () => {
      const currentZoom = this.map.getZoom();
      const minimum = 5;
      const maximum = 16;

      if (currentZoom >= minimum && currentZoom <= maximum) {
        if (!this.map.hasLayer(this.heatPoints)) this.heatPoints.addTo(this.map);
        if (this.map.hasLayer(this.ocurrencePoints)) this.map.removeLayer(this.ocurrencePoints);
      } else {
        if (this.map.hasLayer(this.heatPoints)) this.map.removeLayer(this.heatPoints);
        // if(//currentZoom > maximum &&
        //   !this.map.hasLayer(this.ocurrencePoints))
        this.ocurrencePoints.addTo(this.map);
      }
    });

    if (this.map.getZoom() >= 10 && this.map.getZoom() <= 15) {
      this.heatPoints.addTo(this.map);
    }
  }

  private criarMarcadorHTML(icone: string, numero: number): string {
    return `
      <div class="balao-fala">
        <div class="icone-bola">${icone}</div>
        <span>${numero}</span>
      </div>
    `;
  }

  private getCor(valor: number): string {
    switch (valor) {
      case 1:
        return 'red';
      case 2:
        return 'orange';
      case 3:
        return 'green';
      default:
        return 'yellow';
    }
  }
}

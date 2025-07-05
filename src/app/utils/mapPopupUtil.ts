import * as L from 'leaflet';
import { AddressData } from '../models/addressdata.model';
import { SearchAddressService } from '../services/searchAddress.service';

export function showAddressPopup(
  map: L.Map,
  lat: number,
  lng: number,
  searchAddressService: SearchAddressService,
  openModal: (lat: number, lng: number, address: string) => void
) {
  let clickedAddress = '';

  const popup = L.popup()
    .setLatLng([lat, lng])
    .setContent('<span class="font-primary-medium">Carregando endereço...</span>')
    .openOn(map);

  searchAddressService.getAddressByLatLng(lat, lng).subscribe({
    next: (data: AddressData) => {
      clickedAddress = new AddressData(data).getAddress();
      const popupContent = `
        <div class="font-primary-medium" style="text-align: center;">
          <strong>Endereço:</strong> ${clickedAddress}<br>
          <span class="font-primary-light">(Lat: ${lat.toFixed(5)}, Long: ${lng.toFixed(5)})</span><br>
          <button class="font-primary-medium" style="cursor: pointer; margin-top: 0.5rem;" id="openModalBtn">Adicionar ocorrência</button>
        </div>
      `;
      popup.setContent(popupContent);

      setTimeout(() => {
        const btn = document.getElementById('openModalBtn');
        if (btn) {
          btn.onclick = () => {
            openModal(lat, lng, clickedAddress);
            map.closePopup();
          };
        }
      }, 0);
    },
    error: () => {
      const popupContent = `
        <div style="text-align: center;">
          <strong>Endereço não encontrado</strong><br>
          <button id="openModalBtn">Adicionar ocorrência</button>
        </div>
      `;
      popup.setContent(popupContent);

      setTimeout(() => {
        const btn = document.getElementById('openModalBtn');
        if (btn) {
          btn.onclick = () => {
            openModal(lat, lng, '');
            map.closePopup();
          };
        }
      }, 0);
    },
  });

  // popup.on('remove', () => {
  //   console.log('Popup closed');
  // });
}

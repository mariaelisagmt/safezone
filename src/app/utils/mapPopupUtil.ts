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

  const popup = L.popup().setLatLng([lat, lng]).setContent('Carregando endereço...').openOn(map);

  searchAddressService.getAddressByLatLng(lat, lng).subscribe({
    next: (data: AddressData) => {
      clickedAddress = new AddressData(data).getAddress();
      const popupContent = `
        <div style="text-align: center;">
          <strong>Endereço:</strong> ${clickedAddress}<br>
          (Lat: ${lat.toFixed(5)}, Long: ${lng.toFixed(5)})<br>
          <button id="openModalBtn">Adicionar ocorrência</button>
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

  popup.on('remove', () => {
    console.log('Popup closed'); // TODO: remover depois esse console.log. por enquanto fica aqui para debug
  });
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-listocorrences',
  imports: [CommonModule],
  templateUrl: './listocorrences.html',
  styleUrl: './listocorrences.scss'
})
export class Listocorrences {
  lista = [
    { titulo: 'Ocorrência 1', descricao: 'Descrição da ocorrência 1', tipo_ocorrencia: 'assalto', data: '10/06/2025', hora: '12:00', usuario: 'Usuário 1', data_criacao: '10/06/2025 12:00',longitude: -46.625290, latitude: -23.533773, endereco:'Rua fulano de tal'},
    { titulo: 'Ocorrência 2', descricao: 'Descrição da ocorrência 2', tipo_ocorrencia: 'furto', data: '10/06/2025', hora: '13:00', usuario: 'Usuário 2', data_criacao: '10/06/2025 13:00',longitude: -46.625290, latitude: -23.533773, endereco:'Rua beltrano de tal'},
    { titulo: 'Ocorrência 3', descricao: 'Descrição da ocorrência 3', tipo_ocorrencia: 'vandalismo', data: '10/06/2025', hora: '14:00', usuario: 'Usuário 3', data_criacao: '10/06/2025 14:00',longitude: -46.625290, latitude: -23.533773, endereco:'Rua cicrano de tal'},
    { titulo: 'Ocorrência 4', descricao: 'Descrição da ocorrência 4', tipo_ocorrencia: 'assalto', data: '10/06/2025', hora: '15:00', usuario: 'Usuário 4', data_criacao: '10/06/2025 15:00',longitude: -46.625290, latitude: -23.533773, endereco:'Rua sicrano de tal'},
    { titulo: 'Ocorrência 5', descricao: 'Descrição da ocorrência 5', tipo_ocorrencia: 'furto', data: '10/06/2025', hora: '16:00', usuario: 'Usuário 5', data_criacao: '10/06/2025 16:00',longitude: -46.625290, latitude: -23.533773, endereco:'Rua fulano de tal'},
    { titulo: 'Ocorrência 6', descricao: 'Descrição da ocorrência 6', tipo_ocorrencia: 'vandalismo', data: '10/06/2025', hora: '17:00', usuario: 'Usuário 6', data_criacao: '10/06/2025 17:00',longitude: -46.625290, latitude: -23.533773, endereco:'Rua beltrano de tal'},
    { titulo: 'Ocorrência 7', descricao: 'Descrição da ocorrência 7', tipo_ocorrencia: 'assalto', data: '10/06/2025', hora: '18:00', usuario: 'Usuário 7', data_criacao: '10/06/2025 18:00',longitude: -46.625290, latitude: -23.533773, endereco:'Rua cicrano de tal'},
    { titulo: 'Ocorrência 8', descricao: 'Descrição da ocorrência 8', tipo_ocorrencia: 'furto', data: '10/06/2025', hora: '19:00', usuario: 'Usuário 8', data_criacao: '10/06/2025 19:00',longitude: -46.625290, latitude: -23.533773, endereco:'Rua sicrano de tal'},
    { titulo: 'Ocorrência 9', descricao: 'Descrição da ocorrência 9', tipo_ocorrencia: 'vandalismo', data: '10/06/2025', hora: '20:00', usuario: 'Usuário 9', data_criacao: '10/06/2025 20:00',longitude: -46.625290, latitude: -23.533773, endereco:'Rua fulano de tal'},
    { titulo: 'Ocorrência 10', descricao: 'Descrição da ocorrência 10', tipo_ocorrencia: 'assalto', data: '10/06/2025', hora: '21:00', usuario: 'Usuário 10', data_criacao: '10/06/2025 21:00',longitude: -46.625290, latitude: -23.533773, endereco:'Rua beltrano de tal'}
  ];

  editarOcorrencia(index: number) {
    const ocorrencia = this.lista[index];
    alert(`Editar ocorrência: ${ocorrencia.titulo}`);
  }

  excluirOcorrencia(index: number) {
    if (confirm('Deseja realmente excluir esta ocorrência?')) {
      this.lista.splice(index, 1);
    }
  }
}



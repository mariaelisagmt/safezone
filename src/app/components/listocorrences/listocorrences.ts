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
    { nome: 'João Silva', endereco: 'Rua das Flores, 123' },
    { nome: 'Maria Oliveira', endereco: 'Av. Central, 456' },
    { nome: 'Carlos Souza', endereco: 'Rua do Sol, 789' }
  ];
}



import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { OcurrenceService } from '../../services/occurrences.service';
import { IOcurrence } from '../../interfaces/occurrence.interface';

@Component({
  selector: 'app-listocorrences',
  imports: [CommonModule, MatIconModule],
  templateUrl: './listOcorrences.html',
  styleUrl: './listOcorrences.scss',
})
export class ListOcorrences implements OnInit {
  private ocurrenceService = inject(OcurrenceService);
  ocurrences: IOcurrence[] = [];

  ngOnInit(): void {
    this.ocurrenceService.getOcurrencesByUser('user').subscribe((result) => {
      this.ocurrences = result;
    });
  }

  editarOcorrencia(index: number) {
    const ocorrencia = this.ocurrences[index];
    alert(`Editar ocorrência: ${ocorrencia.title}`);
  }

  excluirOcorrencia(index: number) {
    if (confirm('Deseja realmente excluir esta ocorrência?')) {
      this.ocurrences.splice(index, 1);
    }
  }
}

import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import * as core from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { OcurrenceService } from '../../services/occurrences.service';
import { IOcurrence } from '../../interfaces/occurrence.interface';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.interface';
import { AddressForm } from '../../models/addressform.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddOccurrenceModalComponent } from '../add-occurrencemodal/add-occurrencemodal';

@core.Component({
  selector: 'app-listocorrences',
  imports: [CommonModule, MatIconModule, AddOccurrenceModalComponent],
  templateUrl: './listOcorrences.html',
  styleUrl: './listOcorrences.scss',
})
export class ListOcorrences implements core.OnInit {
  private ocurrenceService = core.inject(OcurrenceService);
  private userService = core.inject(UserService);
  private snackBar = core.inject(MatSnackBar);
  private cdr = core.inject(ChangeDetectorRef); // Inject ChangeDetectorRef
  ocurrences: AddressForm[] = [];
  user: IUser = {
    id: 0,
    email: '',
    password: '',
  };

  showModal = false;
  address = '';
  modalLat = 0;
  modalLng = 0;
  modalTitle = '';
  modalDescription = '';
  modalType = ''; // New property for occurrence type
  editingIndex: number | null = null; // To keep track of which occurrence is being edited

  closeModal(): void {
    this.showModal = false;
    this.address = '';
    this.modalLat = 0;
    this.modalLng = 0;
    this.modalTitle = '';
    this.modalDescription = '';
    this.modalType = ''; // Clear modalType
    this.editingIndex = null;
  }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe((data) => {
      if (data) this.user = data;
    });
    const userId = Number(localStorage.getItem('userId'));
    this.ocurrenceService.getOcurrencesByUser(userId).subscribe((result) => {
      console.log(result);
      this.ocurrences = result;
      this.cdr.detectChanges(); // Trigger change detection
    });
  }

  editarOcorrencia(index: number) {
    const ocorrencia = this.ocurrences[index];
    this.editingIndex = index;

    this.address = ocorrencia.address;
    this.modalLat = ocorrencia.latitude;
    this.modalLng = ocorrencia.longitude;
    this.modalTitle = ocorrencia.title;
    this.modalDescription = ocorrencia.description;
    this.modalType = ocorrencia.type; // Set modalType
    this.showModal = true;

    this.cdr.detectChanges();
  }

  onModalSubmit(updatedOcurrence: AddressForm) {
    if (this.editingIndex !== null) {
      const originalOcurrence = this.ocurrences[this.editingIndex];
      const occurrenceToUpdate: IOcurrence = {
        id: originalOcurrence.id,
        title: updatedOcurrence.title,
        description: updatedOcurrence.description,
        type: updatedOcurrence.type,
        date: originalOcurrence.date, // Keep original date
        address: updatedOcurrence.address,
        latitude: updatedOcurrence.latitude,
        longitude: updatedOcurrence.longitude,
        userId: updatedOcurrence.userId,
      };

      this.ocurrenceService.update(occurrenceToUpdate.id, occurrenceToUpdate).subscribe({
        next: (result) => {
          this.snackBar.open('Ocorrência atualizada com sucesso!', 'Fechar', {
            duration: 3000,
          });
          this.ocurrences[this.editingIndex!] = result as AddressForm; // Assuming result is AddressForm
          this.closeModal();
          setTimeout(() => window.location.reload(), 3000);
        },
        error: (error) => {
          console.error('Erro ao atualizar ocorrência:', error);
          this.snackBar.open('Erro ao atualizar ocorrência.', 'Fechar', {
            duration: 3000,
          });
        },
      });
    }
  }

  excluirOcorrencia(index: number) {
    if (confirm('Deseja realmente excluir esta ocorrência?')) {
      const ocorrenciaId = this.ocurrences[index].id;
      if (ocorrenciaId) {
        this.ocurrenceService.delete(ocorrenciaId).subscribe({
          next: () => {
            this.snackBar.open('Ocorrência excluída com sucesso!', 'Fechar', {
              duration: 3000,
            });
            this.ocurrences.splice(index, 1);
            this.cdr.detectChanges(); // Trigger change detection
          },
          error: (error) => {
            console.error('Erro ao excluir ocorrência:', error);
            this.snackBar.open('Erro ao excluir ocorrência.', 'Fechar', {
              duration: 3000,
            });
          },
        });
      }
    }
  }
}

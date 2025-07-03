import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import * as core from '@angular/core';
import { OcurrenceService } from '../../services/occurrences.service';
import { IOcurrence } from '../../interfaces/occurrence.interface';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.interface';

@core.Component({
  selector: 'app-listocorrences',
  imports: [CommonModule, MatIconModule],
  templateUrl: './listOcorrences.html',
  styleUrl: './listOcorrences.scss',
})
export class ListOcorrences implements core.OnInit {
  private ocurrenceService = core.inject(OcurrenceService);
  private userService = core.inject(UserService);
  ocurrences: IOcurrence[] = [];
  user: IUser = {
    id: 0,
    email: '',
    password: '',
  };

  ngOnInit(): void {
    this.userService.currentUser$.subscribe((data) => {
      if (data) this.user = data;
    });
    const userId = Number(localStorage.getItem('userId'));
    this.ocurrenceService.getOcurrencesByUser(userId).subscribe((result) => {
      console.log(result);
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

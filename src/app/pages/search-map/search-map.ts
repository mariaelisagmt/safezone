import { Component, importProvidersFrom } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-search-map',
  imports: [MapComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './search-map.html',
  styleUrl: './search-map.scss',
})
export class SearchMap {
  pesquisaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.pesquisaForm = this.fb.group({
      tipo: [''],
      bairro: [''],
      data: ['']
    });
  }

  onBuscar() {
    console.log('Pesquisa realizada com:', this.pesquisaForm.value);
  }
}

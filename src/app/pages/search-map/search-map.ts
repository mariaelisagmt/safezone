import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-map',
  imports: [MapComponent],
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

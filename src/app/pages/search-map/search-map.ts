import { Component, inject } from '@angular/core';
import { MapComponent } from '../../components/map-search-occurrence/map.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TypeOcorrenceEnum } from '../../enums/type-ocurrence.enum';
import { CommonModule } from '@angular/common';
import { SearchAddressService } from '../../services/searchAddress.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-map',
  imports: [
    CommonModule,
    MapComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
  ],
  templateUrl: './search-map.html',
  styleUrl: './search-map.scss',
})
export class SearchMap {
  private form = inject(FormBuilder);
  private searchMap = inject(SearchAddressService);
  searchForm: FormGroup;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addressForMap: any;

  typeOcorrenceOptions = Object.entries(TypeOcorrenceEnum)
    .filter(([key, value]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: key,
      value: value,
    }));

  constructor() {
    this.searchForm = this.form.group({
      type: [null],
      address: [null],
    });
  }

  onBuscar() {
    const filter = this.searchForm.get('address')?.value ?? '';

    this.searchMap.getAddress(filter).subscribe({
      next: (data) => {
        this.addressForMap = data;
        console.log('Endereço pesquisado:', data);
      },
      error: (error) => console.error('erro', error),
      complete: () => console.log('finalizou!'),
    });
  }
}

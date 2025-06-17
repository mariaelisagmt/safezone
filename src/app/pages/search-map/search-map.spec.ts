import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchMap } from './search-map';
import { MapComponent } from '../../components/map/map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import 'zone.js';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchMap', () => {
  let component: SearchMap;
  let fixture: ComponentFixture<SearchMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchMap,
        MapComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatButtonModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const formValue = component.pesquisaForm.value;
    expect(formValue).toEqual({ tipo: '', bairro: '', data: '' });
  });

  it('should update form value when patching', () => {
    component.pesquisaForm.patchValue({
      tipo: 'Tipo A',
      bairro: 'Centro',
      data: '2025-06-17',
    });
    expect(component.pesquisaForm.value).toEqual({
      tipo: 'Tipo A',
      bairro: 'Centro',
      data: '2025-06-17',
    });
  });

  it('should log value on onBuscar()', () => {
    spyOn(console, 'log');
    component.pesquisaForm.patchValue({
      tipo: 'Tipo B',
      bairro: 'Bairro X',
      data: '2025-06-17',
    });
    component.onBuscar();
    expect(console.log).toHaveBeenCalledWith(
      'Pesquisa realizada com:',
      component.pesquisaForm.value
    );
  });
});

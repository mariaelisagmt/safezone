import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchMap } from './search-map';
import { MapComponent } from '../../components/map-search-occurrence/map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import 'zone.js';
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
});

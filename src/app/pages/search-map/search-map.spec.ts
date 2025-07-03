import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchMap } from './search-map';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SearchAddressService } from '../../services/searchAddress.service';
import { of, throwError } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TypeOcorrenceEnum } from '../../enums/type-ocurrence.enum';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatOptionModule } from '@angular/material/core'; // Import MatOptionModule

// Mock MapOccurrenceComponent
@Component({
  selector: 'app-map-occurrence',
  template: '', // Empty template
  standalone: true, // Mark as standalone
})
class MockMapOccurrenceComponent {
  @Input() addressToSearch: any;
}

describe('SearchMap', () => {
  let component: SearchMap;
  let fixture: ComponentFixture<SearchMap>;
  let searchAddressServiceMock: any;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    searchAddressServiceMock = {
      getAddress: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        SearchMap,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: SearchAddressService, useValue: searchAddressServiceMock },
      ],
    })
      .overrideComponent(SearchMap, {
        set: {
          imports: [
            CommonModule, // Added CommonModule
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatIconModule,
            MatButtonModule,
            MatOptionModule, // Added MatOptionModule
            MockMapOccurrenceComponent, // Use the mock component
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SearchMap);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the search form with null values', () => {
    expect(component.searchForm).toBeDefined();
    expect(component.searchForm.get('type')?.value).toBeNull();
    expect(component.searchForm.get('address')?.value).toBeNull();
  });

  it('should correctly map TypeOcorrenceEnum to typeOcorrenceOptions', () => {
    expect(component.typeOcorrenceOptions).toEqual([
      { label: 'Homicide', value: 1 },
      { label: 'Robbery', value: 2 },
      { label: 'Assault', value: 3 },
      { label: 'Theft', value: 4 },
      { label: 'Vandalism', value: 5 },
      { label: 'DrugRelated', value: 6 },
      { label: 'DomesticViolence', value: 7 },
    ]);
  });

  it('should call searchAddressService.getAddress and update addressForMap on onBuscar() success', () => {
    const mockAddressData = { lat: 10, lng: 20 };
    searchAddressServiceMock.getAddress.mockReturnValue(of(mockAddressData));
    const consoleSpy = jest.spyOn(console, 'log');

    component.searchForm.get('address')?.setValue('Test Address');
    component.onBuscar();

    expect(searchAddressServiceMock.getAddress).toHaveBeenCalledWith('Test Address');
    expect(component.addressForMap).toEqual(mockAddressData);
    expect(consoleSpy).toHaveBeenCalledWith('Endereço pesquisado:', mockAddressData);
    expect(consoleSpy).toHaveBeenCalledWith('finalizou!');
    consoleSpy.mockRestore();
  });

  it('should call searchAddressService.getAddress with empty string if address is null', () => {
    const mockAddressData = { lat: 10, lng: 20 };
    searchAddressServiceMock.getAddress.mockReturnValue(of(mockAddressData));
    const consoleSpy = jest.spyOn(console, 'log');

    component.searchForm.get('address')?.setValue(null);
    component.onBuscar();

    expect(searchAddressServiceMock.getAddress).toHaveBeenCalledWith('');
    expect(component.addressForMap).toEqual(mockAddressData);
    expect(consoleSpy).toHaveBeenCalledWith('Endereço pesquisado:', mockAddressData);
    expect(consoleSpy).toHaveBeenCalledWith('finalizou!');
    consoleSpy.mockRestore();
  });

  it('should log an error on onBuscar() failure', () => {
    const errorResponse = new Error('Service error');
    searchAddressServiceMock.getAddress.mockReturnValue(throwError(() => errorResponse));
    const consoleSpy = jest.spyOn(console, 'error');
    const consoleLogSpy = jest.spyOn(console, 'log'); // To check for 'finalizou!'

    component.searchForm.get('address')?.setValue('Test Address');
    component.onBuscar();

    expect(searchAddressServiceMock.getAddress).toHaveBeenCalledWith('Test Address');
    expect(component.addressForMap).toBeUndefined(); // Should not be updated
    expect(consoleSpy).toHaveBeenCalledWith('erro', errorResponse);
    expect(consoleLogSpy).not.toHaveBeenCalledWith('finalizou!'); // complete callback should not run on error
    consoleSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });
});

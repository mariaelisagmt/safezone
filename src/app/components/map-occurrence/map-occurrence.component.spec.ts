import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapOccurrenceComponent } from './map-occurrence.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

/*
  Explicação sobre esse teste: é preciso passar o provider provideHttpClientTesting para o teste
  funcionar, pois MapOccurrenceComponent injeta o serviço OcurrenceService que por sua vez injeta
  o HttpClient. Sem esse provider, o teste falhará ao tentar injetar o HttpClient.
  Também é preciso usar provideHttpClient() para garantir que o HttpClient esteja disponível
*/

describe.only('MapOccurrenceComponent', () => {
  let fixture: ComponentFixture<MapOccurrenceComponent>;
  let component: MapOccurrenceComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapOccurrenceComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(MapOccurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it.only('should open modal with correct data', () => {
    component.openModal(10, 20, 'Rua Teste, 123');
    expect(component.showModal).toBe(true);
    expect(component.modalLat).toBe(10);
    expect(component.modalLng).toBe(20);
    expect(component.address).toBe('Rua Teste, 123');
  });
});

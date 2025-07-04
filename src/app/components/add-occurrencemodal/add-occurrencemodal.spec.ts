import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AddOccurrenceModalComponent } from './add-occurrencemodal';
import { AddOccurrenceTypeObject } from '../../enums/add-occurrence-type.object';
import { AddressForm } from '../../models/addressform.model';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('AddOccurrenceModalComponent', () => {
  let component: AddOccurrenceModalComponent;
  let fixture: ComponentFixture<AddOccurrenceModalComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOccurrenceModalComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOccurrenceModalComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.description).toBe('');
      expect(component.selectedType).toBe(0);
      expect(component.typeOptions).toEqual(Object.entries(AddOccurrenceTypeObject));
    });

    it('should get userId from localStorage', () => {
      jest.spyOn(localStorage, 'getItem').mockReturnValue('123');
      const newComponent = new AddOccurrenceModalComponent();
      expect(newComponent.userId).toBe(123);
    });

    it('should default userId to 0 when localStorage is empty', () => {
      jest.spyOn(localStorage, 'getItem').mockReturnValue(null);
      const newComponent = new AddOccurrenceModalComponent();
      expect(newComponent.userId).toBe(0);
    });
  });

  describe('Input Properties', () => {
    beforeEach(() => {
      component.latitude = -23.5505;
      component.longitude = -46.6333;
      component.title = 'Test Occurrence';
      component.address = 'São Paulo, SP, Brazil';
      fixture.detectChanges();
    });

    it('should accept latitude input', () => {
      expect(component.latitude).toBe(-23.5505);
    });

    it('should accept longitude input', () => {
      expect(component.longitude).toBe(-46.6333);
    });

    it('should accept title input', () => {
      expect(component.title).toBe('Test Occurrence');
    });

    it('should accept address input', () => {
      expect(component.address).toBe('São Paulo, SP, Brazil');
    });

    it('should display address in template', () => {
      const addressDivs = compiled.querySelectorAll('div');
      // Find the div that contains only the address text (not the modal wrapper)
      const addressDiv = Array.from(addressDivs).find(
        (div) => div.textContent?.trim() === 'São Paulo, SP, Brazil'
      );
      expect(addressDiv?.textContent?.trim()).toBe('São Paulo, SP, Brazil');
    });
  });

  describe('Form Elements', () => {
    beforeEach(() => {
      component.latitude = -23.5505;
      component.longitude = -46.6333;
      component.title = 'Test Occurrence';
      component.address = 'São Paulo, SP, Brazil';
      fixture.detectChanges();
    });

    it('should render form with all required fields', () => {
      const form = compiled.querySelector('form');
      expect(form).toBeTruthy();

      const titleInput = compiled.querySelector('input[name="title"]');
      const typeSelect = compiled.querySelector('mat-select[name="type"]');
      const descriptionTextarea = compiled.querySelector('textarea[name="description"]');

      expect(titleInput).toBeTruthy();
      expect(typeSelect).toBeTruthy();
      expect(descriptionTextarea).toBeTruthy();
    });

    it('should render hidden inputs for coordinates and address', () => {
      const latitudeInput = compiled.querySelector('input[name="latitude"]') as HTMLInputElement;
      const longitudeInput = compiled.querySelector('input[name="longitude"]') as HTMLInputElement;
      const addressInput = compiled.querySelector('input[name="address"]') as HTMLInputElement;

      expect(latitudeInput?.type).toBe('hidden');
      expect(longitudeInput?.type).toBe('hidden');
      expect(addressInput?.type).toBe('hidden');
    });

    it('should render submit and cancel buttons', () => {
      const submitButton = compiled.querySelector('#add-occurrence-submit-button');
      const cancelButton = compiled.querySelector('button[color="warn"]');

      expect(submitButton).toBeTruthy();
      expect(cancelButton).toBeTruthy();
      expect(submitButton?.textContent?.trim()).toBe('Adicionar');
      expect(cancelButton?.textContent?.trim()).toBe('Cancelar');
    });

    it('should populate type options from AddOccurrenceTypeObject', () => {
      // Test that the component has the correct typeOptions array
      const expectedOptions = Object.entries(AddOccurrenceTypeObject);
      expect(component.typeOptions).toEqual(expectedOptions);
      expect(component.typeOptions.length).toBe(7);

      // Verify some specific options exist
      expect(component.typeOptions).toContainEqual(['Homicídio', 1]);
      expect(component.typeOptions).toContainEqual(['Assalto', 2]);
      expect(component.typeOptions).toContainEqual(['Violência doméstica', 7]);
    });
  });

  describe('Form Interactions', () => {
    beforeEach(() => {
      component.latitude = -23.5505;
      component.longitude = -46.6333;
      component.title = 'Test Occurrence';
      component.address = 'São Paulo, SP, Brazil';
      component.description = 'Test description';
      component.selectedType = 2;
      fixture.detectChanges();
    });

    it('should update description when textarea value changes', () => {
      const textarea = compiled.querySelector(
        'textarea[name="description"]'
      ) as HTMLTextAreaElement;
      textarea.value = 'Updated description';
      textarea.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.description).toBe('Updated description');
    });

    it('should update title when input value changes', () => {
      const titleInput = compiled.querySelector('input[name="title"]') as HTMLInputElement;
      titleInput.value = 'Updated title';
      titleInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.title).toBe('Updated title');
    });
  });

  describe('Component Methods', () => {
    beforeEach(() => {
      component.latitude = -23.5505;
      component.longitude = -46.6333;
      component.title = 'Test Occurrence';
      component.address = 'São Paulo, SP, Brazil';
      component.description = 'Test description';
      component.selectedType = 2;
      component.userId = 123;
    });

    describe('submit method', () => {
      it('should emit submitted event with correct data', () => {
        jest.spyOn(component.submitted, 'emit');
        jest.spyOn(component, 'close');

        const mockEvent = new Event('submit');
        jest.spyOn(mockEvent, 'preventDefault');

        component.submit(mockEvent);

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(component.submitted.emit).toHaveBeenCalledWith({
          title: 'Test Occurrence',
          address: 'São Paulo, SP, Brazil',
          latitude: -23.5505,
          longitude: -46.6333,
          type: 2,
          description: 'Test description',
          userId: 123,
        } as AddressForm);
        expect(component.close).toHaveBeenCalled();
      });

      it('should prevent default form submission', () => {
        const mockEvent = new Event('submit');
        jest.spyOn(mockEvent, 'preventDefault');

        component.submit(mockEvent);

        expect(mockEvent.preventDefault).toHaveBeenCalled();
      });
    });

    describe('close method', () => {
      it('should emit closed event', () => {
        jest.spyOn(component.closed, 'emit');

        component.close();

        expect(component.closed.emit).toHaveBeenCalled();
      });
    });
  });

  describe('Event Emitters', () => {
    beforeEach(() => {
      component.latitude = -23.5505;
      component.longitude = -46.6333;
      component.title = 'Test Occurrence';
      component.address = 'São Paulo, SP, Brazil';
      component.description = 'Test description';
      component.selectedType = 2;
      fixture.detectChanges();
    });

    it('should emit submitted event when form is submitted', () => {
      jest.spyOn(component.submitted, 'emit');

      const form = compiled.querySelector('form') as HTMLFormElement;
      form.dispatchEvent(new Event('submit'));

      expect(component.submitted.emit).toHaveBeenCalled();
    });

    it('should emit closed event when cancel button is clicked', () => {
      jest.spyOn(component.closed, 'emit');

      const cancelButton = compiled.querySelector('button[color="warn"]') as HTMLButtonElement;
      cancelButton.click();

      expect(component.closed.emit).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing localStorage gracefully', () => {
      jest.spyOn(localStorage, 'getItem').mockReturnValue(null);
      const newComponent = new AddOccurrenceModalComponent();

      expect(newComponent.userId).toBe(0);
    });

    it('should handle invalid localStorage value', () => {
      jest.spyOn(localStorage, 'getItem').mockReturnValue('invalid');
      const newComponent = new AddOccurrenceModalComponent();

      expect(newComponent.userId).toBe(0);
    });

    it('should handle form submission with minimal data', () => {
      component.latitude = 0;
      component.longitude = 0;
      component.title = '';
      component.address = '';
      component.description = '';
      component.selectedType = 0;
      component.userId = 0;

      jest.spyOn(component.submitted, 'emit');
      const mockEvent = new Event('submit');

      component.submit(mockEvent);

      expect(component.submitted.emit).toHaveBeenCalledWith({
        title: '',
        address: '',
        latitude: 0,
        longitude: 0,
        type: 0,
        description: '',
        userId: 0,
      } as AddressForm);
    });
  });

  describe('Template Integration', () => {
    beforeEach(() => {
      component.latitude = -23.5505;
      component.longitude = -46.6333;
      component.title = 'Test Occurrence';
      component.address = 'São Paulo, SP, Brazil';
      fixture.detectChanges();
    });

    it('should display modal title', () => {
      const modalTitle = compiled.querySelector('h2');
      expect(modalTitle?.textContent?.trim()).toBe('Adicionar ocorrência');
    });

    it('should have proper form structure', () => {
      const modal = compiled.querySelector('.modal');
      const form = modal?.querySelector('form');
      const formFields = form?.querySelectorAll('mat-form-field');

      expect(modal).toBeTruthy();
      expect(form).toBeTruthy();
      expect(formFields?.length).toBe(3); // title, type, description
    });

    it('should have required attributes on form fields', () => {
      const titleInput = compiled.querySelector('input[name="title"]') as HTMLInputElement;
      const typeSelect = compiled.querySelector('mat-select[name="type"]');
      const descriptionTextarea = compiled.querySelector(
        'textarea[name="description"]'
      ) as HTMLTextAreaElement;

      expect(titleInput.required).toBeTruthy();
      expect(typeSelect?.getAttribute('required')).toBe('');
      expect(descriptionTextarea.required).toBeTruthy();
    });
  });
});

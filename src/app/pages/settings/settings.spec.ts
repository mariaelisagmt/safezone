import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SettingsComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the settings form with default values and validators', () => {
    expect(component.settingsForm).toBeDefined();
    expect(component.settingsForm.get('name')?.value).toBe('Maria Elisa');
    expect(component.settingsForm.get('email')?.value).toBe('maria.elisa@example.com');
    expect(component.settingsForm.get('defaultAddress')?.value).toBe('Fortaleza, CE');

    expect(component.settingsForm.get('name')?.valid).toBeTruthy();
    expect(component.settingsForm.get('email')?.valid).toBeTruthy();
    expect(component.settingsForm.get('defaultAddress')?.valid).toBeTruthy();

    component.settingsForm.get('name')?.setValue('');
    expect(component.settingsForm.get('name')?.errors?.['required']).toBeTruthy();

    component.settingsForm.get('email')?.setValue('invalid-email');
    expect(component.settingsForm.get('email')?.errors?.['email']).toBeTruthy();
  });

  it('should toggle isDarkMode and body class on toggleDarkMode()', () => {
    component.isDarkMode = false;
    component.toggleDarkMode();
    expect(component.isDarkMode).toBe(true);
    expect(document.body.classList.contains('dark-mode')).toBe(true);

    component.toggleDarkMode();
    expect(component.isDarkMode).toBe(false);
    expect(document.body.classList.contains('dark-mode')).toBe(false);
  });

  it('should log form value on saveSettings() if form is valid', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    component.settingsForm.setValue({
      name: 'New Name',
      email: 'new@example.com',
      defaultAddress: 'New Address',
    });

    component.saveSettings();

    expect(consoleSpy).toHaveBeenCalledWith('Configurações salvas:', {
      name: 'New Name',
      email: 'new@example.com',
      defaultAddress: 'New Address',
    });
    consoleSpy.mockRestore();
  });

  it('should log "Formulário inválido" on saveSettings() if form is invalid', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    component.settingsForm.get('email')?.setValue('invalid-email');

    component.saveSettings();

    expect(consoleSpy).toHaveBeenCalledWith('Formulário inválido');
    consoleSpy.mockRestore();
  });
});

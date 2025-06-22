import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class SettingsComponent {
  settingsForm: FormGroup;
  isDarkMode = false;

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      name: ['Maria Elisa', Validators.required],
      email: ['maria.elisa@example.com', [Validators.required, Validators.email]],
      defaultAddress: ['Fortaleza, CE'],
    });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  saveSettings() {
    if (this.settingsForm.valid) {
      console.log('Configurações salvas:', this.settingsForm.value);
      // aqui você pode fazer um POST para o backend ou salvar localStorage
    } else {
      console.log('Formulário inválido');
    }
  }
}
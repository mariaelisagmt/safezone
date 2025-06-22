import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class SettingsComponent {
  private form = inject(FormBuilder);

  settingsForm: FormGroup;
  isDarkMode = false;

  constructor() {
    this.settingsForm = this.form.group({
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

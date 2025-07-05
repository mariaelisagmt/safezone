import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class SettingsComponent {
  private form = inject(FormBuilder);
  private service = inject(UserService);
  private router = inject(Router);
  registerForm: FormGroup;
  user: IUser | null = null;

  constructor() {
    this.service.currentUser$.subscribe((data) => {
      this.user = data;
    });

    this.registerForm = this.form.group({
      email: [this.user?.email, [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;

      console.log('Atualização', this.registerForm.value);
      this.user = {
        email: email,
        password: password,
      };
      this.service.updateProfile(this.user).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log('Error', 'Erro ao atualizar usuário', err);
        },
      });
    }
  }
}

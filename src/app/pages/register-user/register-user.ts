import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Footer } from '../../components/footer/footer.components';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register-user',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, Footer],
  templateUrl: './register-user.html',
  styleUrls: ['./register-user.scss'],
})
export class RegisterUserComponent {
  private form = inject(FormBuilder);
  private service = inject(UserService);
  private router = inject(Router);
  private title = inject(Title);
  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.form.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.title.setTitle('SafeZone - Registro');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;

      console.log('Registro', this.registerForm.value);
      let user: IUser = {
        email: email,
        password: password,
      };
      this.service.register(user).subscribe({
        next: (data) => {
          user = data;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log('Error', 'Usuário ou senha inválidos', err);
        },
      });
    }
  }
}

import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { UserService } from '../../services/user.service';
import { Footer } from '../../components/footer/footer.components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    Footer,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  private form = inject(FormBuilder);
  private service = inject(UserService);
  private router = inject(Router);
  private title = inject(Title);
  private cdr = inject(ChangeDetectorRef);

  loginForm: FormGroup;
  loading = false;

  constructor() {
    this.loginForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.title.setTitle('SafeZone - Login');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.service.login(email, password).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/home']);
        },
        error: () => {
          this.loading = false;
          alert('Usuário ou senha inválidos');
          this.cdr.detectChanges();
        },
      });
    }
  }

  cadastrar() {
    console.log('Registar um usuário.');
    this.router.navigate(['/register']);
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceMock: any;
  let routerMock: any;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    userServiceMock = {
      login: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule, // Required for Angular Material components
      ],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with empty fields and required validators', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();

    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    emailControl?.setValue('');
    passwordControl?.setValue('');

    expect(emailControl?.valid).toBeFalsy();
    expect(passwordControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['required']).toBeTruthy();
    expect(passwordControl?.errors?.['required']).toBeTruthy();

    emailControl?.setValue('test@example.com');
    expect(emailControl?.errors).toBeNull();
  });

  it('should call userService.login and navigate to /home on successful login', () => {
    userServiceMock.login.mockReturnValue(of({})); // Mock successful login

    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(userServiceMock.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should log an error on failed login', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    userServiceMock.login.mockReturnValue(throwError(() => new Error('Login failed')));

    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'wrongpassword',
    });

    component.onSubmit();

    expect(userServiceMock.login).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
    expect(consoleSpy).toHaveBeenCalledWith('Error', 'Usuário ou senha inválidos');
    expect(routerMock.navigate).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should not call userService.login if the form is invalid', () => {
    component.loginForm.setValue({
      email: 'invalid-email',
      password: '',
    });

    component.onSubmit();

    expect(userServiceMock.login).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to /register on cadastrar()', () => {
    component.cadastrar();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/register']);
  });
});

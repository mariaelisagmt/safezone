import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterUserComponent } from './register-user';
import { FormBuilder} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IUser } from '../../interfaces/user.interface';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;
  let userServiceMock: MockUserService;
  let routerMock: MockRouter;

  interface MockUserService {
    register: jest.Mock;
  }

  interface MockRouter {
    navigate: jest.Mock;
  }

  beforeEach(async () => {
    userServiceMock = {
      register: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        RegisterUserComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the registration form with empty fields and required validators', () => {
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.get('name')).toBeDefined();
    expect(component.registerForm.get('email')).toBeDefined();
    expect(component.registerForm.get('password')).toBeDefined();

    const nameControl = component.registerForm.get('name');
    const emailControl = component.registerForm.get('email');
    const passwordControl = component.registerForm.get('password');

    nameControl?.setValue('');
    emailControl?.setValue('');
    passwordControl?.setValue('');

    expect(nameControl?.valid).toBeFalsy();
    expect(emailControl?.valid).toBeFalsy();
    expect(passwordControl?.valid).toBeFalsy();

    expect(nameControl?.errors?.['required']).toBeTruthy();
    expect(emailControl?.errors?.['required']).toBeTruthy();
    expect(passwordControl?.errors?.['required']).toBeTruthy();

    emailControl?.setValue('invalid-email');
    expect(emailControl?.errors?.['email']).toBeTruthy();

    emailControl?.setValue('test@example.com');
    expect(emailControl?.errors).toBeNull();
  });

  it('should call userService.register and navigate to /home on successful registration', () => {
    const mockUser: IUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      token: 'some-token',
    };
    userServiceMock.register.mockReturnValue(of(mockUser));

    component.registerForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(userServiceMock.register).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should log an error on failed registration', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    userServiceMock.register.mockReturnValue(throwError(() => new Error('Registration failed')));

    component.registerForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(userServiceMock.register).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(consoleSpy).toHaveBeenCalledWith('Error', 'Usuário ou senha inválidos');
    expect(routerMock.navigate).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should not call userService.register if the form is invalid', () => {
    component.registerForm.setValue({
      name: '',
      email: 'invalid-email',
      password: '',
    });

    component.onSubmit();

    expect(userServiceMock.register).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});

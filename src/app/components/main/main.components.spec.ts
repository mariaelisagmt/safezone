import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MainComponent } from './main.components';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let userServiceMock: MockUserService;
  let routerMock: MockRouter;

  const mockUser: IUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'testpassword',
    token: 'some-token',
  };

  interface MockUserService {
    currentUser$: Observable<IUser | null>;
    logout: jest.Mock;
  }

  interface MockRouter {
    navigate: jest.Mock;
    routerState: {
      snapshot: {
        root: object;
      };
    };
    events: Observable<unknown>;
    createUrlTree: jest.Mock;
    serializeUrl: jest.Mock;
  }

  beforeEach(async () => {
    userServiceMock = {
      currentUser$: of(null), // Default to null, can be overridden
      logout: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
      routerState: {
        snapshot: {
          root: {},
        },
      },
      events: of(),
      createUrlTree: jest.fn(),
      serializeUrl: jest.fn(() => 'mock-url'), // Add mock for serializeUrl
    };

    await TestBed.configureTestingModule({
      imports: [MainComponent, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update user on ngOnInit', () => {
    userServiceMock.currentUser$ = of(mockUser);
    component.ngOnInit();
    expect(component.user).toEqual(mockUser);
  });

  it('should call userService.logout and navigate to /login on logout', () => {
    component.logout();
    expect(userServiceMock.logout).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should toggle menuAberto on toggleMenu', () => {
    component.menuAberto = false;
    component.toggleMenu();
    expect(component.menuAberto).toBe(true);

    component.toggleMenu();
    expect(component.menuAberto).toBe(false);
  });

  it('should set menuAberto to false on fecharMenu', () => {
    component.menuAberto = true;
    component.fecharMenu();
    expect(component.menuAberto).toBe(false);
  });
});

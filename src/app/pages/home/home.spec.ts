import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { RouterTestingModule } from '@angular/router/testing';

describe('Home Component', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [Home, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toBe('SafeZone identifica ameaças antes que virem problemas.');
  });

  it('should have the correct description', () => {
    expect(component.description).toContain('Somos uma plataforma web');
  });

  it('should have correct button texts', () => {
    expect(component.rentButtonText).toBe('PESQUISAR');
    expect(component.buyButtonText).toBe('REPORTAR');
  });
});

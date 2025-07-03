import { App } from './app';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './components/main/main.components';
import { RouterTestingModule } from '@angular/router/testing';

describe('App Component', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, MainComponent, RouterTestingModule.withRoutes([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should have title "safezone-frontend"', () => {
    expect(component['title']).toBe('safezone-frontend');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listocorrences } from './listocorrences';

describe('Listocorrences', () => {
  let component: Listocorrences;
  let fixture: ComponentFixture<Listocorrences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listocorrences],
    }).compileComponents();

    fixture = TestBed.createComponent(Listocorrences);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

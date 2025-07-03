import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { PrivacyTerms } from './privacy-terms.component';

describe('PrivacyTerms', () => {
  let component: PrivacyTerms;
  let fixture: ComponentFixture<PrivacyTerms>;
  let dialogRefSpy: { close: jest.Mock };

  beforeEach(async () => {
    dialogRefSpy = { close: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [PrivacyTerms],
      providers: [{ provide: MatDialogRef, useValue: dialogRefSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyTerms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when close() is called', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should close the dialog when agree() is called', () => {
    component.agree();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});

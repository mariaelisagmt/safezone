import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermsOfService } from './terms-of-service';
import { MatDialogRef } from '@angular/material/dialog';

describe('TermsOfService', () => {
  let component: TermsOfService;
  let fixture: ComponentFixture<TermsOfService>;
  let matDialogRefMock: any;

  beforeEach(async () => {
    matDialogRefMock = {
      close: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TermsOfService],
      providers: [{ provide: MatDialogRef, useValue: matDialogRefMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TermsOfService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogRef.close on close()', () => {
    component.close();
    expect(matDialogRefMock.close).toHaveBeenCalled();
  });

  it('should call dialogRef.close on agree()', () => {
    component.agree();
    expect(matDialogRefMock.close).toHaveBeenCalled();
  });
});

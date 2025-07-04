import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer.components';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TermsOfService } from '../terms-of-service/terms-of-service';
import { PrivacyTerms } from '../privacy-terms/privacy-terms.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;
  let matDialogMock: Partial<MatDialog>;

  beforeEach(async () => {
    matDialogMock = {
      open: jest.fn().mockReturnValue({
        afterClosed: () => of(true),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [Footer, MatDialogModule, NoopAnimationsModule],
      providers: [], // Providers will be overridden
    })
      .overrideProvider(MatDialog, { useValue: matDialogMock }) // Override MatDialog here
      .compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open TermsOfService dialog when openTerms() is called', () => {
    component.openTerms();
    expect(matDialogMock.open).toHaveBeenCalledWith(TermsOfService);
  });

  it('should open PrivacyTerms dialog when openPrivacy() is called', () => {
    component.openPrivacy();
    expect(matDialogMock.open).toHaveBeenCalledWith(PrivacyTerms);
  });
});

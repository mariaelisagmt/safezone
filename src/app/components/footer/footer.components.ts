import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PrivacyTerms } from '../privacy-terms/privacy-terms.component';
import { TermsOfService } from '../terms-of-service/terms-of-service';

@Component({
  selector: 'app-footer',
  imports: [MatDialogModule],
  templateUrl: './footer.components.html',
  styleUrl: './footer.components.scss',
})
export class Footer {
  private dialog = inject(MatDialog);

  openTerms(): void {
    this.dialog.open(TermsOfService);
  }

  openPrivacy(): void {
    this.dialog.open(PrivacyTerms);
  }
}

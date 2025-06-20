import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-privacy-terms',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './privacy-terms.component.html',
  styleUrl: './privacy-terms.component.scss',
})
export class PrivacyTerms {
  private dialogRef = inject(MatDialogRef<PrivacyTerms>);

  close() {
    this.dialogRef.close();
  }

  agree() {
    this.dialogRef.close();
  }
}

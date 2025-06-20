import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-terms-of-service',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './terms-of-service.html',
  styleUrl: './terms-of-service.scss',
})
export class TermsOfService {
  private dialogRef = inject(MatDialogRef<TermsOfService>);

  close() {
    this.dialogRef.close();
  }

  agree() {
    this.dialogRef.close();
  }
}

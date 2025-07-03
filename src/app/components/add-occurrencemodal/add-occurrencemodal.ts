import * as core from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

import { AddOccurrenceTypeObject } from '../../enums/add-occurrence-type.object';
import { AddressForm } from '../../models/addressform.model';

@core.Component({
  selector: 'app-add-occurrence-modal',
  standalone: true,
  templateUrl: './add-occurrencemodal.html',
  styleUrl: './add-occurrencemodal.scss',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class AddOccurrenceModalComponent {
  @core.Input() latitude!: number;
  @core.Input() longitude!: number;
  @core.Input() title!: string;
  @core.Input() address!: string;
  @core.Output() submitted = new core.EventEmitter<AddressForm>();
  @core.Output() closed = new core.EventEmitter<void>();

  description = '';
  selectedType = 0;
  userId = Number(localStorage.getItem('userId')) || 0;

  typeOptions = Object.entries(AddOccurrenceTypeObject);

  submit(event: Event) {
    event.preventDefault();
    this.submitted.emit({
      title: this.title,
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude,
      type: this.selectedType,
      description: this.description,
      userId: this.userId,
    } as AddressForm);
    this.close();
  }

  close() {
    this.closed.emit();
  }
}

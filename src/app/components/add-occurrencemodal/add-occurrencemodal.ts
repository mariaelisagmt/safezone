import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

import { AddOccurrenceTypeObject } from '../../enums/add-occurrence-type.object';
import { AddressForm } from '../../models/addressform.model';

@Component({
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
  @Input() latitude!: number;
  @Input() longitude!: number;
  @Input() title!: string;
  @Input() address!: string;
  @Output() submitted = new EventEmitter<AddressForm>();
  @Output() closed = new EventEmitter<void>();

  description = '';
  selectedType = 0;

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
    } as AddressForm);
    this.close();
  }

  close() {
    this.closed.emit();
  }
}

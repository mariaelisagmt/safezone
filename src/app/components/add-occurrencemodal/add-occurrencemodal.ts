import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

import { AddOccurrenceTypeObject } from '../../enums/add-occurrence-type.object';

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
  @Output() submitted = new EventEmitter<{
    title: string;
    latitude: number;
    longitude: number;
    type: string;
    description: string;
  }>();
  @Output() closed = new EventEmitter<void>();

  description = '';
  selectedType = '';

  typeOptions = Object.entries(AddOccurrenceTypeObject);

  submit(event: Event) {
    event.preventDefault();
    this.submitted.emit({
      title: this.title,
      latitude: this.latitude,
      longitude: this.longitude,
      type: this.selectedType,
      description: this.description,
    });
    this.close();
  }

  close() {
    this.closed.emit();
  }
}

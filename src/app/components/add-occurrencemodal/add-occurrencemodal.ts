import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-occurrence-modal',
  standalone: true,
  templateUrl: './add-occurrencemodal.html',
  styleUrl: './add-occurrencemodal.scss',
  imports: [FormsModule]
})
export class AddOccurrenceModalComponent {
  @Input() latitude!: number;
  @Input() longitude!: number;
  @Input() title!: string;
  @Output() submitted = new EventEmitter<{ latitude: number; longitude: number; description: string; title: string }>();
  @Output() closed = new EventEmitter<void>();

  description = '';

  submit(event: Event) {
    event.preventDefault();
    this.submitted.emit({
      title: this.title,
      latitude: this.latitude,
      longitude: this.longitude,
      description: this.description,
    });
    this.close();
  }

  close() {
    this.closed.emit();
  }
}
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOccurrenceModalComponent } from './add-occurrencemodal';

describe('AddOccurrenceModalComponent', () => {
  let component: AddOccurrenceModalComponent;
  let fixture: ComponentFixture<AddOccurrenceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOccurrenceModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddOccurrenceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

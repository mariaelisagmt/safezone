import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOccurrencemodal } from './add-occurrencemodal';

describe('AddOccurrencemodal', () => {
  let component: AddOccurrencemodal;
  let fixture: ComponentFixture<AddOccurrencemodal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOccurrencemodal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOccurrencemodal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyTerms } from './privacy-terms.component';

describe('PrivacyTerms', () => {
  let component: PrivacyTerms;
  let fixture: ComponentFixture<PrivacyTerms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyTerms],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyTerms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOcorrences } from './listOcorrences';

describe('Listocorrences', () => {
  let component: ListOcorrences;
  let fixture: ComponentFixture<ListOcorrences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOcorrences],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOcorrences);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

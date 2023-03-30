import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDatetimepickerComponent } from './base-datetimepicker.component';

describe('BaseDatetimepickerComponent', () => {
  let component: BaseDatetimepickerComponent;
  let fixture: ComponentFixture<BaseDatetimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseDatetimepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDatetimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

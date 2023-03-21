import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComboboxComponent } from './base-combobox.component';

describe('BaseComboboxComponent', () => {
  let component: BaseComboboxComponent;
  let fixture: ComponentFixture<BaseComboboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseComboboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

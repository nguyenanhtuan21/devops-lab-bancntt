import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTextboxComponent } from './base-textbox.component';

describe('BaseTextboxComponent', () => {
  let component: BaseTextboxComponent;
  let fixture: ComponentFixture<BaseTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTextboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

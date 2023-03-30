import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddTaskComponent } from './popup-add-task.component';

describe('PopupAddTaskComponent', () => {
  let component: PopupAddTaskComponent;
  let fixture: ComponentFixture<PopupAddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAddTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

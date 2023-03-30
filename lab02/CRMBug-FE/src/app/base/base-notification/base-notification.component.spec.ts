import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseNotificationComponent } from './base-notification.component';

describe('BaseNotificationComponent', () => {
  let component: BaseNotificationComponent;
  let fixture: ComponentFixture<BaseNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

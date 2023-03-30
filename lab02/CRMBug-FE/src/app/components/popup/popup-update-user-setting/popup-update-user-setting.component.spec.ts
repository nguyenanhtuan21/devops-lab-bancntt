import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUpdateUserSettingComponent } from './popup-update-user-setting.component';

describe('PopupUpdateUserSettingComponent', () => {
  let component: PopupUpdateUserSettingComponent;
  let fixture: ComponentFixture<PopupUpdateUserSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupUpdateUserSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupUpdateUserSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupInviteMemberComponent } from './popup-invite-member.component';

describe('PopupInviteMemberComponent', () => {
  let component: PopupInviteMemberComponent;
  let fixture: ComponentFixture<PopupInviteMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupInviteMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupInviteMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

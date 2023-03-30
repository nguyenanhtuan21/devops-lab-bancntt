import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEditIssueComponent } from './popup-edit-issue.component';

describe('PopupEditIssueComponent', () => {
  let component: PopupEditIssueComponent;
  let fixture: ComponentFixture<PopupEditIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupEditIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupEditIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

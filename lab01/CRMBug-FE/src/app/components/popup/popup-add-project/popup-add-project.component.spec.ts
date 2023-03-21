import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddProjectComponent } from './popup-add-project.component';

describe('PopupAddProjectComponent', () => {
  let component: PopupAddProjectComponent;
  let fixture: ComponentFixture<PopupAddProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAddProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

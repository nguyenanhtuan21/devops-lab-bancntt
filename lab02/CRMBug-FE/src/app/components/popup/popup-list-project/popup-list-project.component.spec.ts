import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupListProjectComponent } from './popup-list-project.component';

describe('PopupListProjectComponent', () => {
  let component: PopupListProjectComponent;
  let fixture: ComponentFixture<PopupListProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupListProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupListProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

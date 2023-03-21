import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedReportComponent } from './assigned-report.component';

describe('AssignedReportComponent', () => {
  let component: AssignedReportComponent;
  let fixture: ComponentFixture<AssignedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

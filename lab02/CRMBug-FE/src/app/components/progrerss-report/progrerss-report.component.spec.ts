import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrerssReportComponent } from './progrerss-report.component';

describe('ProgrerssReportComponent', () => {
  let component: ProgrerssReportComponent;
  let fixture: ComponentFixture<ProgrerssReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrerssReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrerssReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

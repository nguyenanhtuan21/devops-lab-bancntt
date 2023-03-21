import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base-component';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data/data.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { ProjectService } from 'src/app/service/project/project.service';
import { AppServerResponse } from 'src/app/service/base/base.service';
import { TypeControl } from 'src/app/enumeration/type-control.enum';

@Component({
  selector: 'app-assigned-report',
  templateUrl: './assigned-report.component.html',
  styleUrls: ['./assigned-report.component.scss']
})
export class AssignedReportComponent extends BaseComponent implements OnInit {
  param: any = {
    IDs: [],
    FromDate: moment().startOf("year").subtract(10, "year"),
    ToDate: moment().endOf("year"),
    ProjectID: 0
  };

  typeControl = TypeControl;
  
  employeeCbx: Array<any> = [];

  projectID: number = 0;

  isHaveData: boolean = true;

  datas: Array<any> = [];

  fieldDisplay: Array<any> = [
    {
      fieldName: 'FullName',
      displayText: 'Member name',
      typeControl: TypeControl.Textbox,
    },
    {
      fieldName: 'TotalTask',
      displayText: 'Total task assigned',
      typeControl: TypeControl.Textbox,
    },
    {
      fieldName: 'AvarageCompletedTime',
      displayText: 'Avarage completed time',
      typeControl: TypeControl.Time,
    },
    {
      fieldName: 'AvarageDueTime',
      displayText: 'Avarage due time',
      typeControl: TypeControl.Time,
    },
    {
      fieldName: 'CompletedLateTime',
      displayText: 'Completed late iime',
      typeControl: TypeControl.Time,
    },
  ];

  totalRecord: number = 0;

  constructor(
    private dataSV: DataService,
    private projectSV: ProjectService,
    private employeeSV: EmployeeService,
    private activeRoute: ActivatedRoute
  ) {
    super();
   }

  ngOnInit(): void {
    this.dataSV.project
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((project) => {
        if(project) {
          this.projectID = project.ID;
          this.param.ProjectID = this.projectID;
          this.initData();
        } else {
          var projectID = this.activeRoute.snapshot.params.projectID;
          this.projectSV.getDataByID(projectID)
            .pipe(takeUntil(this._onDestroySub))
            .subscribe((resp: AppServerResponse<any>) => {
              if(resp?.Success && resp?.Data) {
                this.dataSV.project.next(resp.Data);
              }
            })
        }
      })
  }

  initData() {
    this.employeeSV.getEmployeeByProjectID(this.projectID, true)
    .pipe(takeUntil(this._onDestroySub))
    .subscribe((resp: AppServerResponse<any>) => {
      if(resp?.Success && resp?.Data?.length > 0) {
        this.initCombobox(resp.Data);
        this.getData();
      }
    })
  }

  initCombobox(data: any) {
    this.employeeCbx = data.map((x: any) => {
      return {
        Value: x.ID,
        Text: `${x.FullName} (${x.EmployeeCode})`
      }
    })
    this.param.IDs = data.map((x: any) => x.ID);
  }

  getData() {
    this.projectSV.getAssignedReport(this.param)
    .pipe(takeUntil(this._onDestroySub))
    .subscribe((resp: AppServerResponse<any>) => {
      console.log(resp);
      if(resp?.Success && resp?.Data?.length > 0) {
        this.isHaveData = true;
        this.datas = resp.Data.map((x: any) => {
          const avarageCompletedTime = (x.AvarageCompletedTime / 60).toFixed(2),
            avarageDueTime = (x.AvarageDueTime / 60).toFixed(2),
            completedLateTime = (x.CompletedLateTime / 60).toFixed(2);
          return {
            ...x,
            AvarageCompletedTime: avarageCompletedTime,
            AvarageDueTime: avarageDueTime,
            CompletedLateTime: completedLateTime
          }
        });
        this.totalRecord = resp.TotalRecord
      } else {
        this.isHaveData = false;
      }
    })
  }

  valueChangeCombo(data: any) {
    if(data) {
      switch(data.FieldName) {
        case 'DateRange':
          const date = data.Value;
          if(date?.startDate &&  date?.endDate) {
            this.param.FromDate = date.startDate.toDate();
            this.param.ToDate = date.endDate.toDate();
            this.getData();
          }
        break;
        case 'EmployeeIDs':
          this.param.IDs= data.Value;
          this.getData();
          break;
      }
    }
  }
}

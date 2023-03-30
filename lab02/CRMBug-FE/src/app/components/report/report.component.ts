import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data/data.service';
import { EmployeeService } from './../../service/employee/employee.service';
import { TaskPriority, TaskState } from './../../enumeration/task.enum';
import { AppServerResponse } from 'src/app/service/base/base.service';
import { takeUntil, map } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base-component';
import { ProjectService } from 'src/app/service/project/project.service';
import { Component, OnInit } from '@angular/core';
import { ViewReportType } from 'src/app/enumeration/project.enum';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { GanttViewType } from 'src/app/enumeration/gantt-chart.enum';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent extends BaseComponent implements OnInit {

  container: string = `report-container`;

  title: string = 'Summary priority data by member';

  yTitle: string = 'Priority';

  param: any = {
    IDs: [],
    FromDate: moment().startOf("year").subtract(10, "year"),
    ToDate: moment().endOf("year"),
    GroupBy: ViewReportType.Priority,
    ProjectID: 0
  }

  employeeCbx: Array<any> = [];

  groupByCbx:Array<any> = [
    {
      Value: ViewReportType.Priority,
      Text: 'Priority'
    },
    {
      Value: ViewReportType.Status,
      Text: 'Status'
    },
  ]; 

  employeeNames: Array<any> = [];

  series: Array<any> = [];

  projectID: number = 0;

  totalRecord: number = 0;

  constructor(
    private projectSV: ProjectService,
    private employeeSV: EmployeeService,
    private dataSV: DataService,
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
          this.getReportData();
        }
      })
  }

  getReportData() {
    this.projectSV.getReport(this.param)
    .pipe(takeUntil(this._onDestroySub))
    .subscribe((resp: AppServerResponse<any>) => {
      console.log(resp);
      this.totalRecord = resp.TotalRecord;
      if(resp?.Success && resp?.Data?.length > 0) {
        this.initReport(resp.Data);
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
    this.employeeNames = data.map((x: any) => `${x.FullName} (${x.EmployeeCode})`);
  }

  valueChangeCombo(data: any) {
    if(data) {
      switch(data.FieldName) {
        case 'DateRange':
          const date = data.Value;
          if(date?.startDate &&  date?.endDate) {
            this.param.FromDate = date.startDate.toDate();
            this.param.ToDate = date.endDate.toDate();
            this.getReportData();
          }
        break;
        case 'EmployeeIDs':
          this.param.IDs= data.Value;
          this.employeeNames = data.Text;
          this.getReportData();
          break;
        case 'GroupBy':
          this.param.GroupBy = data.Value;
          if(data.Value == ViewReportType.Status) {
            this.title = 'Summary status data by member';
            this.yTitle = 'Status';
          } else {
            this.title = 'Summary priority data by member';
            this.yTitle = 'Priority';
          }
          this.getReportData();
          break;
      }
    }
  }

  initReport(data: any) {
    switch(this.param.GroupBy) {
      case ViewReportType.Priority:
        this.initPriorityData(data);
        break;
      case ViewReportType.Status:
        this.initStatusData(data);
        break;
    }
    Highcharts.chart(this.container, {
      chart: {
        type: 'column'
      },
      title : {
        text: this.title ? this.title : ""
      },
      xAxis: {
        categories: this.employeeNames,
        crosshair: true
      },yAxis: {
        min: 0,
        title: {
          text: this.yTitle
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"> <b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: this.series
    });
  }

  initPriorityData(data: any) {
    let lowArr: any = [], 
      normalArr: any = [],
      highArr: any = [];
    this.param.IDs.forEach((x: any, index: number) => {
      const low = data.find((item: any) => item.AssignedUserID == x && item.PriorityID == TaskPriority.Low);
      if(low) {
        lowArr.push(Number(low.Total));
      } else {
        lowArr.push(0)
      }
      const normal = data.find((item: any) => item.AssignedUserID == x && item.PriorityID == TaskPriority.Normal);
      if(normal) {
        normalArr.push(Number(normal.Total));
      } else {
        normalArr.push(0);
      }
      const high = data.find((item: any) => item.AssignedUserID == x && item.PriorityID == TaskPriority.High);
      if(high) {
        highArr.push(Number(high.Total));
      } else {
        highArr.push(0);
      }
    })
    this.series = [
      {
        name: 'Low',
        data: lowArr,
        color: '#bbbbbb'
    
      }, {
        name: 'Normal',
        data: normalArr,
        color: '#01B075'
      }, {
        name: 'High',
        data: highArr,
        color: '#fa383e'
      },
    ]
  }

  initStatusData(data: any) {
    let pendingArr: any = [], 
      completedArr: any = [],
      completedLateArr: any = [];
    this.param.IDs.forEach((x: any) => {
      const pending = data.find((item: any) => item.AssignedUserID == x && item.StatusID == TaskState.Pending);
      if(pending) {
        pendingArr.push(Number(pending.Total));
      } else {
        pendingArr.push(0)
      }
      const completed = data.find((item: any) => item.AssignedUserID == x && item.StatusID == TaskState.Completed);
      if(completed) {
        completedArr.push(Number(completed.Total));
      } else {
        completedArr.push(0);
      }
      const completedLate = data.find((item: any) => item.AssignedUserID == x && item.StatusID == TaskState.CompletedLate);
      if(completedLate) {
        completedLateArr.push(Number(completedLate.Total));
      } else {
        completedLateArr.push(0);
      }
    })
    this.series = [
      {
        name: 'Pending',
        data: pendingArr,
        color: '#bbbbbb'
    
      }, {
        name: 'Completed',
        data: completedArr,
        color: '#01B075'
      }, {
        name: 'Completed Late',
        data: completedLateArr,
        color: '#fa383e'
      },
    ]
  }
}

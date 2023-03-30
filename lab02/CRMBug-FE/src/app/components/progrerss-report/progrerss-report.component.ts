import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './../../service/employee/employee.service';
import { ProjectService } from './../../service/project/project.service';
import { DataService } from './../../service/data/data.service';
import { BaseComponent } from 'src/app/shared/base-component';
import { Component, OnInit } from '@angular/core';
import { AppServerResponse } from 'src/app/service/base/base.service';
import * as moment from 'moment';
import { ViewReportType } from 'src/app/enumeration/project.enum';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-progrerss-report',
  templateUrl: './progrerss-report.component.html',
  styleUrls: ['./progrerss-report.component.scss']
})
export class ProgrerssReportComponent extends BaseComponent implements OnInit {
  container: string = `progress-report-container`;

  param: any = {
    IDs: [],
    FromDate: moment().startOf("year").subtract(10, "year"),
    ToDate: moment().endOf("year"),
    GroupBy: ViewReportType.Priority,
    ProjectID: 0
  };

  title: string = 'Summary progress data by member';

  yTitle: string = 'Task Progress';


  employeeNames: Array<any> = [];

  employeeCbx: Array<any> = [];

  projectID: number = 0;

  series: Array<any> = [];

  isHaveData: boolean = true;

  constructor(
    private dataSV: DataService,
    private projectSV: ProjectService,
    private employeeSV: EmployeeService,
    private activeRoute: ActivatedRoute
  ) { 
    super()
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
      }
    }
  }

  getReportData() {
    this.projectSV.getProgressReport(this.param)
    .pipe(takeUntil(this._onDestroySub))
    .subscribe((resp: AppServerResponse<any>) => {
      console.log(resp);
      if(resp?.Success && resp?.Data?.length > 0) {
        this.isHaveData = true;
        this.initReport(resp.Data);
      } else {
        this.isHaveData = false;
      }
    })
  }

  initReport(data: any) {
    let progressArr: Array<any> = [];
    this.param.IDs.forEach((x: any) => {
      const progress = data.find((item: any) => item.AssignedUserID == x);
      if(progress && !isNaN(progress.ProcessPercent)) {
        var percent = parseFloat(progress.ProcessPercent);
        if(percent > 1) {
          progressArr.push(percent * 100);
        } else {
          progressArr.push(-1 / percent * 100);
        }
      } else {
        progressArr.push(0);
      }
    });
    console.log(progressArr);
    this.series = [{
      name: 'Progress',
      data: progressArr
    }]
    console.log(this.series);
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
        title: {
          text: this.yTitle
        }
      },
      credits: {
        enabled: false
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"> <b>{point.y:1.2f} %</b></td></tr>',
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
}

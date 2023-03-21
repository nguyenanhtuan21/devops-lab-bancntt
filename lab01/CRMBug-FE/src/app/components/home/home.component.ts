import { ProjectService } from './../../service/project/project.service';
import { DataService } from './../../service/data/data.service';
import { TaskService } from 'src/app/service/task/task.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base-component';
import { NotificationService } from './../../service/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { AppServerResponse } from 'src/app/service/base/base.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent extends BaseComponent implements OnInit {

  colorEnum: any = {
    Completed: "#01B075",
    CompletedLate: "#fa383e",
    Pending: "#bbbbbb",
    Low: "#bbbbbb",
    Normal:"#01B075",
    High: "#fa383e",
  };

  notifications: Array<any> = [];

  projectID: string = '';

  titleStatus: string = 'Summary status data for task';

  seriesStatus: Array<any> = [{
    type: 'pie',
    name: 'Status',
    data: []
  }]


  titlePriority: string = 'Summary priority data for task';

  seriesPriority: Array<any> = [{
    type: 'pie',
    name: 'Priority',
    data: []
  }]

  summaryData = {
    Completed: 0,
    CompletedLate: 0,
    Pending: 0,
    TotalRecord: 0
  }

  summaryStyle: any = {
    Completed: 0,
    CompletedLate: 0,
    Pending: 0,
  }

  totalRecord: number = 0;

  configPaging: any = {
    ProjectID: 0,
    FromDate: moment().startOf("year").subtract(10, "year"),
    ToDate: moment().endOf("year")
  }

  userID: number = 0;

  constructor(
    private activeRoute: ActivatedRoute,
    private taskSV: TaskService,
    private dataSV: DataService,
    private projectSV: ProjectService
  ) { 
    super();
  }

  ngOnInit(): void {
    this.dataSV.project.pipe(takeUntil(this._onDestroySub))
      .subscribe(project => {
        if(project) {
          this.projectID = project.ID;
          this.configPaging.ProjectID = this.projectID;
          this.getDatas()
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
    this.dataSV.user
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((user) => {
        if(user) {
          this.userID = Number(user.ID);
        }
      })
  }

  getDatas() {
    this.taskSV.getSummaryData(this.configPaging)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((resp) => {
        console.log(resp);
        if(resp?.Success && resp?.Data) {
          this.seriesStatus = [{
            type: 'pie',
            name: 'Status',
            data: Object.keys(resp.Data.Status).map(x => {
              if(x == "CompletedLate") {
                return {
                  name: 'Completed late', 
                  y: Number(resp.Data.Status[x]),
                  color: this.colorEnum[x]
                };
              }
              return {
                name: x, 
                y: Number(resp.Data.Status[x]),
                color: this.colorEnum[x]
              };
            })
          }]
          this.seriesPriority = [{
            type: 'pie',
            name: 'Priority',
            data: Object.keys(resp.Data.Priority).map(x => {
              return {
                name: x, 
                y: Number(resp.Data.Priority[x]),
                color: this.colorEnum[x]
              };
            })
          }];
          this.totalRecord = resp.Data.TotalRecord
        }
      })
  }

  valueChangeCombo(data: any) {
    if(data) {
      switch(data.FieldName) {
        case 'DateRange':
          const date = data.Value;
          if(date?.startDate &&  date?.endDate) {
            this.configPaging.FromDate = date.startDate.toDate();
            this.configPaging.ToDate = date.endDate.toDate();
            this.getDatas();
          }
        break;
      }
    }
  }
}

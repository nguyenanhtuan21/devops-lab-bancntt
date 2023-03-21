import { ProjectService } from './../../service/project/project.service';
import { DataService } from 'src/app/service/data/data.service';
import { ActivatedRoute } from '@angular/router';
import { AppServerResponse } from './../../service/base/base.service';
import { takeUntil } from 'rxjs/operators';
import { TaskService } from 'src/app/service/task/task.service';
import { BaseComponent } from 'src/app/shared/base-component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts-gantt';
import { Addition } from 'src/app/enumeration/addition.enum';
import { ParamGrid } from 'src/app/models/param-grid.model';
import { Operator } from 'src/app/enumeration/operator.enum';
import * as moment from 'moment';
import { GanttViewType } from 'src/app/enumeration/gantt-chart.enum';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent extends BaseComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    title: {
      text: "Gantt Chart with Progress Indicators"
    },
    xAxis: {
      min: moment().subtract(20, "year").toDate().getTime(),
      max: moment().toDate().getTime()
    },
    yAxis: {
        uniqueNames: true
    },
    rangeSelector: {
      enabled: true,
      selected: 0
    },
    series: [
      {
        type: "gantt",
        name: "Project 1",
        data: [
          {
            completed: 0,
            end: 1657152561000,
            name: "Vũ Minh Hoàng",
            start: 1657152395000
          },
          {
            name: "Test prototype",
            start: Date.UTC(2014, 10, 27),
            end: Date.UTC(2014, 10, 29)
          },
          {
            name: "Develop",
            start: Date.UTC(2014, 10, 20),
            end: Date.UTC(2014, 10, 25),
            completed: {
              amount: 0.12,
              fill: "#fa0"
            }
          },
          {
            name: "Run acceptance tests",
            start: Date.UTC(2014, 10, 23),
            end: Date.UTC(2014, 10, 26)
          }
        ]
      }
    ]
  };

  configPaging: ParamGrid = {
    Filters: [
      {
        FieldName: 'CreatedDate',
        Value: null,
        Addition: Addition.And,
        IsFormula: false,
        Operator: Operator.Between,
        Value1: moment().startOf("year").subtract(10, "year"),
        Value2: moment().endOf("year")
      },
      {
        FieldName: 'ProjectID',
        Value: null,
        Addition: Addition.And,
        IsFormula: false,
        Operator: Operator.Equal,
      },
    ],
    PageIndex: 0,
    Formula: '',
    PageSize: 0,
    Columns: btoa(
      'ID,TaskCode,Subject,CompletedProgress,Description,AssignedUserID,AssignedUserIDText,DueDate,StatusID,StatusIDText,PriorityID,PriorityIDText,PriorityColor,StatusColor,CreatedBy,CreatedDate,ModifiedBy,ModifiedDate'
    ),
  };

  projectID: number = 0;

  projectName: string = '';

  ganttTypeCbx: Array<any> = [
    {
      Value: GanttViewType.User,
      Text: 'View by user'
    },
    {
      Value: GanttViewType.Task,
      Text: 'View by task'
    }
  ]

  currGanttView: GanttViewType = GanttViewType.User;

  constructor(
    private taskSV: TaskService,
    private activeRoute: ActivatedRoute,
    private dataSV: DataService,
    private datePipe: DatePipe,
    private projectSV: ProjectService
  ) {
    super();
  }

  ngOnInit(): void {
    this.dataSV.project
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((project) => {
        if(project) {
          this.projectID = project.ID
          this.projectName = `${project.ProjectName} (${project.ProjectCode})`
          this.configPaging.Filters[1].Value = this.projectID;
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
    this.getData();
  }

  getData() {
    const me = this;
    this.configPaging.Filters[0].Value = JSON.stringify({
      Value1: this.configPaging.Filters[0].Value1,
      Value2: this.configPaging.Filters[0].Value2
    })
    this.taskSV.grid(this.configPaging)
    .pipe(takeUntil(this._onDestroySub))
    .subscribe((resp: AppServerResponse<any>) => {
      console.log(resp);
      if(resp?.Success && resp?.Data?.TotalRecord > 0) {
        this.isHaveData = true;
        let series = [];
        switch(this.currGanttView) {
          case GanttViewType.User:
            series = [{
              type: "gantt",
              name: me.projectName,
              data: resp.Data.Result.map((x: any) => {
                  return {
                    name: `${x.AssignedUserIDText}`,
                    start: new Date(x.CreatedDate).getTime(),
                    end: new Date(x.DueDate).getTime(),
                    description: `${x.TaskCode} / ${x.Subject}`,
                    completed: x.CompletedProgress / 100
                  }
                }),
              }
            ]
            break;
          case GanttViewType.Task:
            series = [{
              type: "gantt",
              name: me.projectName,
              data: resp.Data.Result.map((x: any) => {
                  return {
                    name: x.TaskCode,
                    start: new Date(x.CreatedDate).getTime(),
                    end: new Date(x.DueDate).getTime(),
                    description: `${x.AssignedUserIDText}-${x.PriorityIDText}-${x.StatusIDText})`,
                    completed: x.CompletedProgress / 100
                  }
                })
              }
            ]
            console.log(resp.Data.Result);
            break;
        }
        this.initConfig(series);
      } else {
        this.isHaveData = false;
      }
    }) 
  }

  initConfig(series: any) {
    let me = this;
    Highcharts.ganttChart("gantt-chart-container", {
      title: {
        text:`Gantt Chart for project ${this.projectName}`
      },
      xAxis: {
        min: moment().subtract(10, "year").toDate().getTime(),
        max: moment().toDate().getTime()
      },
      yAxis: {
          uniqueNames: true
      },
      rangeSelector: {
        enabled: true,
        selected: 1,
      },
      series: series,
      tooltip: {
        formatter: function() {
          const point: any = this.point;
          const datePipe = me.datePipe;
          switch(me.currGanttView) {
            case GanttViewType.User:
              return [`<span>${point.description}</span>`,
                `<span>Completed Progress: ${point.completed * 100}%</span>`,
                `<span>Start: ${datePipe.transform(point.start, 'dd-MM-yyyy hh:mm:ss')}</span>`,
                `<span>End: ${datePipe.transform(point.end, 'dd-MM-yyyy hh:mm:ss')}</span>`].join("</br>");
            case GanttViewType.Task:
              return [`<span>${point.name}</span>`,
                `<span>${point.description}</span>`,
                `<span>Completed Progress: ${point.completed * 100}%</span>`,
                `<span>Start: ${datePipe.transform(point.start, 'dd-MM-yyyy hh:mm:ss')}</span>`,
                `<span>End: ${datePipe.transform(point.end, 'dd-MM-yyyy hh:mm:ss')}</span>`].join("</br>");
          }
        }
      }
    });
  }

  valueChangeCombo(data: any) {
    if(data) {
      switch(data.FieldName) {
        case 'DateRange':
          const date = data.Value;
          if(date?.startDate &&  date?.endDate) {
            this.configPaging.Filters[0].Value1 = date.startDate.toDate();
            this.configPaging.Filters[0].Value2 = date.endDate.toDate();
            this.getData();
          }
        break;
        case 'GanttViewType':
          this.currGanttView = data.Value;
          this.getData();
          break;
      }
    }
  }


}

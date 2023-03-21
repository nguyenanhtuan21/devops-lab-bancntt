import { EmployeeService } from './../../service/employee/employee.service';
import { ToastService } from './../../service/toast/toast.service';
import { ValidateService } from './../../service/validation/validate.service';
import { ProjectService } from './../../service/project/project.service';
import { BaseComponent } from 'src/app/shared/base-component';
import { TaskPriority } from './../../enumeration/task.enum';
import { PopupAddTaskComponent } from './../popup/popup-add-task/popup-add-task.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Addition } from 'src/app/enumeration/addition.enum';
import { CalendarType } from 'src/app/enumeration/calendar.enum';
import { EntityState } from 'src/app/enumeration/entity-state.enum';
import { Operator } from 'src/app/enumeration/operator.enum';
import { TypeControl } from 'src/app/enumeration/type-control.enum';
import { ConfigDialog } from 'src/app/modules/config-dialog';
import { DataService } from 'src/app/service/data/data.service';
import { TaskService } from 'src/app/service/task/task.service';
import { TaskView } from 'src/app/enumeration/task.enum';
import { ParamGrid } from 'src/app/models/param-grid.model';
import { AppServerResponse } from 'src/app/service/base/base.service';
import { PopupConfirmComponent } from '../popup/popup-confirm/popup-confirm.component';
import * as moment from 'moment';
import { Permission } from 'src/app/enumeration/permission.enum';
import { PermissionMessage } from 'src/app/constants/constant.enum';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent extends BaseComponent implements OnInit {

  currentView: TaskView = TaskView.List;

  taskView = TaskView;

  calendarType = CalendarType;

  currCalendarType: CalendarType = CalendarType.MonthLy;

  fieldDisplay: Array<any> = [
    {
      fieldName: 'TaskCode',
      displayText: 'Task Code',
      typeControl: TypeControl.Textbox,
    },
    {
      fieldName: 'Subject',
      displayText: 'Subject',
      typeControl: TypeControl.Textbox,
    },
    {
      fieldName: 'PriorityIDText',
      displayText: 'Priority',
      typeControl: TypeControl.Textbox,
    },
    {
      fieldName: 'CompletedProgress',
      displayText: 'Completed progress',
      typeControl: TypeControl.Textbox,
    },
    {
      fieldName: 'Description',
      displayText: 'Description',
      typeControl: TypeControl.Textbox,
    },
    {
      fieldName: 'AssignedUserIDText',
      displayText: 'Assigned to',
      typeControl: TypeControl.Textbox,
    },
    {
      fieldName: 'RelatedUserIDText',
      displayText: 'Related to',
      typeControl: TypeControl.Textbox,
    },
    {
      fieldName: 'StatusIDText',
      displayText: 'Status',
      typeControl: TypeControl.List,
    },
    {
      fieldName: 'DueDate',
      displayText: 'Deadline',
      typeControl: TypeControl.DateTime,
    },
    {
      fieldName: 'CompletedDate',
      displayText: 'Completed date',
      typeControl: TypeControl.DateTime,
    },
    {
      fieldName: 'CreatedDate',
      displayText: 'Created date',
      typeControl: TypeControl.DateTime,
    },
  ];

  tasks: Array<any> = [];

  pageSizeCbx = [
    {
      Value: 10,
      Text: '10 records/page',
    },
    {
      Value: 20,
      Text: '20 records/page',
    },
    {
      Value: 50,
      Text: '50 records/page',
    },
    {
      Value: 100,
      Text: '100 records/page',
    },
  ];

  assignedUserCbx: Array<any> = [];

  relatedUserCbx: Array<any> = [];

  assignedUserIDs: Array<any> = [];

  relatedUserIDs: Array<any> = [];

  currentPage = 1;

  totalRecord = 0;

  fromRecord = 1;

  toRecord = 1;

  configPaging: ParamGrid = {
    Filters: [
      {
        FieldName: 'ProjectID',
        Value: null,
        Addition: Addition.And,
        IsFormula: false,
        Operator: Operator.Equal,
      },
      {
        FieldName: 'Subject',
        Value: '',
        Addition: Addition.Or,
        IsFormula: true,
        Operator: Operator.Like,
      },
      {
        FieldName: 'AssignedUserIDText',
        Value: '',
        Addition: Addition.Or,
        IsFormula: true,
        Operator: Operator.Like,
      },
      {
        FieldName: 'RelatedUserIDText',
        Value: '',
        Addition: Addition.Or,
        IsFormula: true,
        Operator: Operator.Like,
      },
      {
        FieldName: 'TaskCode',
        Value: '',
        Addition: Addition.Or,
        IsFormula: true,
        Operator: Operator.Like,
      },
    ],
    PageIndex: 0,
    Formula: '({0} OR {1} OR {2} OR {3})',
    PageSize: 20,
    Columns: btoa(
      'ID,TaskCode,Subject,PriorityID,PriorityIDText,StatusID,StatusIDText,CompletedProgress,Description,AssignedUserID,AssignedUserIDText,RelatedUserID,RelatedUserIDText,ProjectID,DueDate,PriorityColor,StatusColor,CompletedDate,CreatedBy,CreatedDate,ModifiedBy,ModifiedDate'
    ),
  };

  entityState = EntityState;

  oldData: any = {};

  typeControl = TypeControl;

  isEditing: boolean = false;

  currentData: any = {};

  projectID: number = 0;

  constructor(
    private taskSV: TaskService,
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private dataSV: DataService,
    private toastSV: ToastService,
    private projectSV: ProjectService,
    private validateSV: ValidateService,
    private employeeSV: EmployeeService
  ) {
    super();
  }

  ngOnInit() {
    let me = this
    this.dataSV.project
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((project) => {
        if(project) {
          me.projectID = project.ID;
          me.configPaging.Filters[0].Value = `${project.ID}`;
          me.getDataPaging();
          this.initConfig();
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
    this.initData();
  }

  initConfig() {
    this.employeeSV.getEmployeeByProjectID(this.projectID, true)
    .pipe(takeUntil(this._onDestroySub))
    .subscribe((resp: AppServerResponse<any>) => {
      if(resp?.Success && resp?.Data) {
        this.assignedUserCbx = resp.Data.map((x: any) => {
          return {
            Value: x.ID,
            Text: `${x.FullName} (${x.EmployeeCode})`
          }
        })
        this.relatedUserCbx = resp.Data.map((x: any) => {
          return {
            Value: x.ID,
            Text: `${x.FullName} (${x.EmployeeCode})`
          }
        })
        this.assignedUserIDs = resp.Data.map((x: any) => x.ID);
        this.relatedUserIDs = resp.Data.map((x: any) => x.ID);
      }
    })
  }

  initData() {
    this.dataSV.task
    .pipe(takeUntil(this._onDestroySub))
      .subscribe(task => {
        if(task) {
          this.editTask(task);
          this.dataSV.task.next(null)
        }
      })
    
  }

  getDataPaging() {
    this.configPaging.PageIndex =
      (this.currentPage - 1) * this.configPaging.PageSize;
    this.taskSV
      .grid(this.configPaging)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(
        (resp) => {
          // this.dataSV.loading.next(false);
          if (resp && resp.Success) {
            this.tasks = resp.Data.Result.map((x: any) => {
              return {
                ...x,
                title: x.Subject,
                date: new Date(x.CreatedDate),
                color: x.StatusColor
              };
            });
            this.totalRecord = resp.Data.TotalRecord;
            this.calculateRecord();
          } else {
            console.log(resp);
          }
        },
        (error) => {
          // this.dataSV.loading.next(false);
          console.log(error);
        }
      );
  }

  addTask(e: any) {
    const config = new ConfigDialog('800px');
    config.data = {
      ProjectID: this.projectID,
    };
    const dialogRef = this.dialog.open(PopupAddTaskComponent, config);
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.getDataPaging();
      }
    });
  }

  switchView(viewType: TaskView) {
    if (viewType === TaskView.Calendar) {
      this.currCalendarType = CalendarType.MonthLy;
    }
    this.currentView = viewType;
  }

  switchcalendarType(calendarType: CalendarType) {
    this.currCalendarType = calendarType;
  }

  cancelEdit(item: any, index: number) {
    this.isEditing = false;
    if (item.State == EntityState.Add) {
      this.tasks.splice(index, 1);
      return;
    }
    this.tasks[index] = this.oldData;
    item.State = EntityState.View;
  }
  
  editTask(task: any) {
    const config = new ConfigDialog('800px');
    config.data = {
      ProjectID: this.projectID,
      TaskID: task.ID,
    };
    config.delayFocusTrap = false;
    const dialogRef = this.dialog.open(PopupAddTaskComponent, config);
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.getDataPaging();
      }
    });
  }

  deleteTask(task: any) {
    if(!this.validateSV.hasPermission("Task", Permission.Delete)) {
      this.toastSV.showWarning(PermissionMessage.DeleteTask);
      return;
    }
    const config = new ConfigDialog('600px');
    config.data = {
      title: "Delete task",
      content: `Do you want to delete task <b>${task.TaskCode}</b>?`
    };
    const dialogRef = this.dialog.open(PopupConfirmComponent, config);
    dialogRef.afterClosed()
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((resp) => {
        if(resp) {
          this.taskSV.delete(task.ID)
            .pipe(takeUntil(this._onDestroySub))
            .subscribe((resp: AppServerResponse<any>) => {
              if(resp.Success) {
                this.getDataPaging();
              }
            })
        }
      })
  }

  valueChangeCombo(e: any) {
    if (e) {
      switch (e.FieldName) {
        case 'PageSize':
          this.configPaging.PageSize = e.Value;
          break;
        case 'AssignedUserID': 
            const assignedFilter = this.configPaging.Filters.find(x => x.FieldName ==  'AssignedUserID');
            if(assignedFilter) {
              assignedFilter.Value = e.Value.join(","); 
            } else {
              this.configPaging.Filters.push({
                FieldName: 'AssignedUserID',
                Value: e.Value.join(","),
                Addition: Addition.And,
                IsFormula: false,
                Operator: Operator.In,
              });
            }
          break;
        case 'RelatedUserID':
            const relatedFilter = this.configPaging.Filters.find(x => x.FieldName ==  'RelatedUserID');
            if(relatedFilter) {
              relatedFilter.Value = e.Value.join(","); 
            } else {
              this.configPaging.Filters.push({
                FieldName: 'RelatedUserID',
                Value: e.Value.join(","),
                Addition: Addition.And,
                IsFormula: false,
                Operator: Operator.In,
              });
            }
          break;
      }
    }
    this.getDataPaging();
  }

  searchTask(data: any) {
    console.log(data);
    this.configPaging.Filters.forEach((x: any) => {
      if(x.IsFormula) {
        x.Value = data.trim();
      }
    })
    this.getDataPaging();
  }

  calculateRecord() {
    this.fromRecord =
      this.totalRecord > 0
        ? (this.currentPage - 1) * this.configPaging.PageSize + 1
        : 0;
    this.toRecord =
      this.currentPage * this.configPaging.PageSize < this.totalRecord
        ? this.currentPage * this.configPaging.PageSize
        : this.totalRecord;
  }

  prevFirst() {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.getDataPaging();
    }
  }

  prevOne() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getDataPaging();
    }
  }

  nextLast() {
    if (
      this.currentPage * this.configPaging.PageSize <
      this.totalRecord
    ) {
      this.currentPage = Math.ceil(this.totalRecord / this.configPaging.PageSize);
      this.getDataPaging();
    }
  }

  nextOne() {
    if (
      this.currentPage * this.configPaging.PageSize <
      this.totalRecord
    ) {
      this.currentPage++;
      this.getDataPaging();
    }
  }
}

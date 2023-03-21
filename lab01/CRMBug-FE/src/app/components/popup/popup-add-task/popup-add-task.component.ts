import { CommentService } from './../../../service/comment/comment.service';
import { AppServerResponse } from './../../../service/base/base.service';
import { SignalrService } from './../../../service/signalr/signalr.service';
import { TaskPriority, TaskState } from './../../../enumeration/task.enum';
import { BaseComponent } from 'src/app/shared/base-component';
import { Options } from '@angular-slider/ngx-slider';
import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { SuccessMessage, ErrorMessage } from 'src/app/constants/constant.enum';
import { EntityState } from 'src/app/enumeration/entity-state.enum';
import { TypeControl } from 'src/app/enumeration/type-control.enum';
import { DataService } from 'src/app/service/data/data.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { TaskService } from 'src/app/service/task/task.service';
import { ToastService } from 'src/app/service/toast/toast.service';
import { ParamGrid } from 'src/app/models/param-grid.model';
import { Addition } from 'src/app/enumeration/addition.enum';
import { Operator } from 'src/app/enumeration/operator.enum';
import * as $ from 'jquery';

@Component({
  selector: 'app-popup-add-task',
  templateUrl: './popup-add-task.component.html',
  styleUrls: ['./popup-add-task.component.scss'],
})
export class PopupAddTaskComponent extends BaseComponent implements OnInit {
  //#region Properties
  entityState = EntityState;

  sliderOptions: Options = {
    // floor: 0,
    // ceil: 100,
    // step: 10,
    // showTicksValues: true
  };

  typeControl = TypeControl;

  title: string = 'Add task';

  taskType: any = [];

  taskPriority: any = [];

  taskState: any = [];

  employees: any = [];

  isDisabled: boolean = false;

  commentValue: string = '';

  dataSave: any = {
    Subject: '',
    PriorityID: TaskPriority.Low,
    PriorityIDText: 'Low',
    StatusID: TaskState.Pending,
    StatusIDText: 'Pending',
    AssignedUserID: '',
    AssignedUserIDText: '',
    RelatedUserID: '',
    RelatedUserIDText: '',
    FoundInBuild: '',
    IntergratedBuild: '',
    DueDate: moment(),
    CompletedProgress: 0,
    State: EntityState.Add,
    Description: '',
  };

  comments: Array<any> = [];

  configPaging: ParamGrid = {
    Filters: [
      {
        FieldName: 'TaskID',
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
      'ID,TaskID,OwnerID,Content,FullName,FirstCharacter,ModifiedDate,ModifiedBy,CreatedDate,CreatedBy'
    ),
  };

  user: any;
  isHaveComment: boolean = true;

  currComment: any;

  oldCommentValue: string = '';
  //#endregion

  //#region Lifecycles
  constructor(
    public dialogRef: MatDialogRef<PopupAddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskSV: TaskService,
    private dataSV: DataService,
    private toastSV: ToastService,
    private signalrSV: SignalrService,
    private commentSV: CommentService
  ) {
    super();
    this.dataSave['ProjectID'] = data['ProjectID'];
    this.dataSV.user.pipe(takeUntil(this._onDestroySub)).subscribe((user) => {
      if (user) {
        const userID = Number(user.ID);
        this.dataSave['AssignedUserID'] = userID;
        this.dataSave['AssignedUserIDText'] = user.DisplayName;
        this.dataSave['RelatedUserID'] = userID;
        this.dataSave['RelatedUserIDText'] = user.DisplayName;
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    this.sliderOptions = {
      floor: 0,
      ceil: 100,
      step: 10,
      showTicksValues: true
    };
    if (this.data) {
      let formMode = EntityState.Add;
      let taskID = 0;
      if (this.data['TaskID']) {
        taskID = this.data['TaskID'];
        this.saveDataToSessionStorage(taskID);

        formMode = EntityState.Edit;
        this.title = 'Edit task';
        this.getCommentData(taskID);
      }
      this.toastSV.loading();
      this.taskSV
        .getFormData(this.data['ProjectID'], taskID, formMode)
        .pipe(takeUntil(this._onDestroySub))
        .subscribe(
          (resp) => {
            this.toastSV.unLoad();
            if (resp?.Success) {
              if (resp.Data?.Dictionary) {
                // this.taskType = resp.Data.Dictionary[0];
                this.taskPriority = resp.Data.Dictionary[1].map((x: any) => {
                  return {
                    Value: Number(x.Value),
                    Text: x.Text,
                  };
                });
                // this.taskState = resp.Data.Dictionary[2];
              }
              if (resp.Data?.Employees) {
                this.employees = resp.Data.Employees.map((x: any) => {
                  return {
                    Value: x.ID,
                    Text: x.FullName,
                  };
                });
              }
              if (resp.Data?.CurrentData) {
                this.dataSave = {
                  ...resp.Data.CurrentData,
                  EntityState: EntityState.Edit,
                };
                var dueDate = new Date(this.dataSave.DueDate);
                if (moment().add(10, 'minutes').toDate() > dueDate) {
                  this.isDisabled = true;
                }
              }
            }
          },
          (error) => {
            console.log(error);
            this.toastSV.unLoad();
          }
        );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getCommentData(taskID: any) {
    this.configPaging.Filters[0].Value = taskID;
    this.commentSV
      .grid(this.configPaging)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((resp: AppServerResponse<any>) => {
        if (resp?.Success && resp?.Data && resp?.Data?.TotalRecord > 0) {
          this.comments = resp.Data.Result.map( (x: any) => {
            return {
              ...x,
              EntityState: EntityState.View 
            }
          })
          console.log(this.comments);
          this.isHaveComment = true;
        } else {
          this.isHaveComment = false;
        }
      });
  }

  saveDataToSessionStorage(taskID: number) {
    let tasks = JSON.parse(sessionStorage.getItem('Tasks') || '[]');
    if (tasks?.length > 0) {
      const index = tasks.indexOf(taskID);
      if (index > -1) {
        tasks.splice(index, 1);
      }
      tasks.unshift(taskID);
      if (tasks.lenth > 10) {
        tasks.pop();
      }
    } else {
      tasks.unshift(taskID);
    }
    sessionStorage.setItem('Tasks', JSON.stringify(tasks));
  }
  //#endregion
  /**
   * Thực hiện lưu dữ liệu
   * Author: HHDANG 14.4.2022
   */
  saveData() {
    this.toastSV.loading();
    if(this.dataSave.Subject.trim() == '') {
      this.toastSV.showWarning("Subject can not be empty!");
      return;
    }
    const msg =
      this.dataSave.EntityState === EntityState.Edit
        ? SuccessMessage.UpdateTask
        : SuccessMessage.AddTask;
    this.taskSV
      .saveData(this.dataSave)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(
        (resp: AppServerResponse<any>) => {
          if (resp?.Success) {
            this.toastSV.showSuccess(msg);
            this.signalrSV.askServer(resp.Data);
            this.dialogRef.close(true);
          } else if (resp?.ValidateInfo && resp?.ValidateInfo.length > 0) {
            this.toastSV.showError(resp?.ValidateInfo[0]);
          } else {
            this.toastSV.showError(ErrorMessage.Exception);
          }
        },
        (error) => {
          console.log(error);
          this.toastSV.showError(ErrorMessage.Exception);
        }
      );
  }
  /**
   * Thực hiện lưu và thêm
   * Author: HHDANG 14.4.2022
   */
  saveAndAddData() {}

  /**
   * Đóng popup
   */
  close() {
    this.dialogRef.close();
  }

  valueChangeCombo(data: any) {
    const fieldName = data?.FieldName;
    console.log(data);
    switch (fieldName) {
      case 'DueDate':
        this.dataSave[fieldName] = data.Value;
        console.log(this.dataSave);
        break;
      default:
        this.dataSave[fieldName] = data.Value;
        this.dataSave[`${fieldName}Text`] = data.Text;
        break;
    }
  }

  addComment(commentValue: any) {
    if (!commentValue) {
      return;
    }
    let objSave: any = {
      TaskID: this.dataSave.ID,
      OwnerID: this.user.ID,
      CreatedDate: moment(),
      EntityState: EntityState.Add,
      FullName: `${this.user.FullName} (${this.user.EmployeeCode})`,
      Content: commentValue,
      FirstCharacter: this.user.LastName.charAt(0).toUpperCase(),
    };
    this.commentSV
      .saveData(objSave)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(
        (resp: AppServerResponse<any>) => {
          this.commentValue = '';
          if (resp?.Success && resp?.Data) {
            this.comments.unshift({...resp.Data, EntityState: EntityState.View});
            this.isHaveComment = true;
          }
        },
        (err) => {
          this.commentValue = '';
          console.log(err);
        }
      );
  }

  changeCommentMode(state: EntityState, comment: any) {
    if(this.currComment) {
      this.currComment.EntityState = EntityState.View;
      this.currComment.Content = this.oldCommentValue;
    }
    if(state == EntityState.Edit) {
      this.oldCommentValue = comment.Content;
      this.currComment = comment;
      this.currComment.EntityState = EntityState.Edit;
    }
  }

  editComment(value: any) {
    this.commentSV
      .saveData(this.currComment)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((resp) => {
        if(resp?.Success) {
          this.currComment.EntityState = EntityState.View;
        }
      })
  }

  deleteComment(item: any) {
    this.commentSV
      .delete(item.ID)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((resp) => {
        console.log(resp);
        if(resp?.Success) {
          this.comments = this.comments.filter(x => x.ID != item.ID);
        }
      })
  }
}

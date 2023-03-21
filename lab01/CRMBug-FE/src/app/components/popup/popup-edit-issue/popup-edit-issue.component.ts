import { TaskService } from './../../../service/task/task.service';
import { ErrorMessage, SuccessMessage } from './../../../constants/constant.enum';
import { ToastService } from './../../../service/toast/toast.service';
import { DataService } from './../../../service/data/data.service';
import { Utils } from './../../../../shared/Utils';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IssueState } from './../../../enumeration/issue.enum';
import { IssuePriority } from './../../../enumeration/issue.enum';
import { EntityState } from './../../../enumeration/entity-state.enum';
import { EmployeeService } from './../../../service/employee/employee.service';
import { Component, Inject, OnInit, Input, OnDestroy } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TypeControl } from 'src/app/enumeration/type-control.enum';
import { IssueType } from 'src/app/enumeration/issue.enum';
import * as moment from 'moment';
import { Options } from '@angular-slider/ngx-slider';
import { BaseComponent } from 'src/app/shared/base-component';

@Component({
  selector: 'popup-edit-issue',
  templateUrl: './popup-edit-issue.component.html',
  styleUrls: ['./popup-edit-issue.component.scss']
})
export class PopupEditIssueComponent extends BaseComponent implements OnInit, OnDestroy {
  //#region Properties
  sliderOptions: Options = {
    floor: 0,
    ceil: 100
  };

  typeControl = TypeControl;

  title: string = "Add issue";

  issueType: any = [];

  issuePriority: any = [];
  
  issueState: any = [];

  employees: any = []

  dataSave: any = {
    TypeID: IssueType.Task,
    TypeIDText: "Task",
    Subject: "",
    PriorityID: IssuePriority.Low,
    PriorityIDText: "Low",
    StatusID: IssueState.New,
    StatusIDText: "New",
    AssignedUserID: "",
    AssignedUserIDText: "",
    RelatedUserID: "",
    RelatedUserIDText: "",
    FoundInBuild: "",
    IntergratedBuild: "",
    DueDate: moment(),
    CompletedProgress: 0,
    State: EntityState.Add
  }
  //#endregion

  //#region Lifecycles
  constructor(
      public dialogRef: MatDialogRef<PopupEditIssueComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private empService: EmployeeService,
      private taskSV: TaskService,
      private dataSV: DataService,
      private toastSV: ToastService
    ) { 
      super();
      this.dataSave["ProjectID"] = data["ProjectID"];
      this.dataSV.user
        .pipe(takeUntil(this._onDestroySub))
        .subscribe(
          (user) => {
            if(user) {
              this.dataSave['AssignedUserID'] = Number(user.ID);
              this.dataSave['AssignedUserIDText'] = user.FullName;
              this.dataSave['RelatedUserID'] = Number(user.ID);
              this.dataSave['RelatedUserIDText'] = user.FullName;
            }
          }
        );
    }

  ngOnInit(): void {
    if(this.data) {
      let formMode = EntityState.Add;
      let issueID = 0;
      if(this.data["IssueID"]) {
        issueID = this.data["IssueID"];
        formMode = EntityState.Edit;
        this.title = "Edit issue"
      }
      this.toastSV.loading();
      this.taskSV
        .getFormData(this.data["ProjectID"], issueID, formMode)
        .pipe(takeUntil(this._onDestroySub))
        .subscribe((resp) => {
          this.toastSV.unLoad();
          if(resp?.Success) {
            if(resp.Data?.Dictionary) {
              // this.issueType = resp.Data.Dictionary[0];
              this.issuePriority = resp.Data.Dictionary[1].map((x: any) => {
                return {
                  Value: Number(x.Value),
                  Text: x.Text
                }
              });
              // this.issueState = resp.Data.Dictionary[2];
            }
            if(resp.Data?.Employees) {
              this.employees = resp.Data.Employees.map((x: any) => {
                return {
                  Value: x.ID,
                  Text: x.FullName
                }
              });
            }
            if(resp.Data?.CurrentData) {
              this.dataSave = {
                ...resp.Data.CurrentData,
                State: EntityState.Edit
              }
            }
          }
        },
        error => {
          console.log(error);
          this.toastSV.unLoad();
        })
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
  //#endregion
  /**
   * Thực hiện lưu dữ liệu
   * Author: HHDANG 14.4.2022
   */
  saveData() {
    this.toastSV.loading();
    const msg = this.dataSave.EntityState === EntityState.Edit ? SuccessMessage.UpdateTask : SuccessMessage.AddTask;
    this.taskSV
      .saveData(this.dataSave)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(
      resp => {
        if(resp?.Success) {
          this.toastSV.showSuccess(msg);
        } else if(resp?.ValidateInfo && resp?.ValidateInfo.length > 0) {
          this.toastSV.showError(resp?.ValidateInfo[0]);
        } else {
          this.toastSV.showError(ErrorMessage.Exception);
        }
        this.dialogRef.close(true);
      },
      error => {
        console.log(error);
        this.toastSV.showError(ErrorMessage.Exception);
      }
    )
  }
  /**
   * Thực hiện lưu và thêm
   * Author: HHDANG 14.4.2022
   */
  saveAndAddData() {
    
  }
  
  /**
   * Đóng popup
   */
  close() {
    this.dialogRef.close();
  }

  valueChangeCombo(data: any) {
    const fieldName = data?.FieldName;
    switch(fieldName) {
      case 'DueDate':
        this.dataSave[fieldName] = data.Value;
        break;
      default: 
        this.dataSave[fieldName] = data.Value;
        this.dataSave[`${fieldName}Text`] = data.Text;
        break;
    }
  }
}

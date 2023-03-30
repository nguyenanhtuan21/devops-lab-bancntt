import { ToastService } from './../../../service/toast/toast.service';
import { BaseComponent } from 'src/app/shared/base-component';
import { ProjectService } from 'src/app/service/project/project.service';
import { Utils } from './../../../../shared/Utils';
import { Subject } from 'rxjs';
import { EmployeeService } from './../../../service/employee/employee.service';
import { DataService } from './../../../service/data/data.service';
import { TypeControl } from 'src/app/enumeration/type-control.enum';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil, map } from 'rxjs/operators';
import { ErrorMessage, SuccessMessage } from 'src/app/constants/constant.enum';

@Component({
  selector: 'app-popup-invite-member',
  templateUrl: './popup-invite-member.component.html',
  styleUrls: ['./popup-invite-member.component.scss']
})
export class PopupInviteMemberComponent extends BaseComponent implements OnInit,OnDestroy {
  typeControl = TypeControl;

  project: Array<any> = [];
  employees: Array<any> = [];

  param: any = {
    ProjectID: 0,
    UserIDs: []
  }

  constructor(
    public dialogRef: MatDialogRef<PopupInviteMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataSV: DataService,
    private employeeSV: EmployeeService,
    private projectSV: ProjectService,
    private toastSV: ToastService
  ) { 
    super();
  }

  ngOnInit(): void {
    this.dataSV
    .project
    .pipe(takeUntil(this._onDestroySub))
    .subscribe((project) => {
      if(project) {
        this.project = [{
          Value: project.ID,
          Text: project.ProjectName
        }]
        this.param.ProjectID = project.ID;
        this.getEmployees(project.ID);
      }
    });
  }

  ngOnDestroy(): void {
    Utils.unSubscribe(this._onDestroySub);
  }

  saveData() {
    console.log(this.param);
    if(this.param.UserIDs?.length > 0) {
      this.toastSV.loading();
      this.projectSV
      .inviteMember(this.param)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((resp) => {
        if(resp?.Success) {
          this.toastSV.showSuccess(SuccessMessage.InviteMember);
        } else if(resp?.ValidateInfo && resp?.ValidateInfo.length > 0) {
          this.toastSV.showError(resp?.ValidateInfo[0]);
        } else {
          this.toastSV.showError(ErrorMessage.Exception);
        }
        this.dialogRef.close();
      },
      error => {
        console.log(error);
        this.toastSV.showError(ErrorMessage.Exception);
      });
    }
  }

  getEmployees(projectID: number) {
    this.employeeSV
      .getEmployeeByProjectID(projectID, false)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((resp) => {
        if(resp?.Success) {
          this.employees = resp.Data.map((x: any) => {
            return {
              Value: x.ID,
              Text: x.FullName
            }
          })
        }
      })
  }

  valueChangeCombo(data: any) {
    if(data) {
      this.param.UserIDs = [
        data.Value
      ]
    }
  }

  close() {
    this.dialogRef.close();
  }
}

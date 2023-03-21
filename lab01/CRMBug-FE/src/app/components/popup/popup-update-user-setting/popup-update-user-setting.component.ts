import { SuccessMessage } from './../../../constants/constant.enum';
import { ToastService } from './../../../service/toast/toast.service';
import { EntityState } from './../../../enumeration/entity-state.enum';
import { DataService } from './../../../service/data/data.service';
import { EmployeeService } from './../../../service/employee/employee.service';
import { TypeControl } from './../../../enumeration/type-control.enum';
import { ConfigDialog } from './../../../modules/config-dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppServerResponse } from 'src/app/service/base/base.service';

@Component({
  selector: 'app-popup-update-user-setting',
  templateUrl: './popup-update-user-setting.component.html',
  styleUrls: ['./popup-update-user-setting.component.scss']
})
export class PopupUpdateUserSettingComponent implements OnInit {
  typeControl = TypeControl;

  userData: any = {
    FirstName: '',
    LastName: '',
    Email: '',
    PhoneNumber: ''
  };

  constructor(
    public dialogRef: MatDialogRef<PopupUpdateUserSettingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataSV: DataService,
    private employeeSV: EmployeeService,
    private toastSV: ToastService
  ) { }

  ngOnInit(): void {
    let userID = 0;
    this.dataSV.user.subscribe((user: any) => {
      userID = user.ID;
    })
    this.employeeSV
      .getDataByID(userID)
      .subscribe((resp) => {
        if(resp && resp.Success && resp.Data) {
          this.userData = {
            ...resp.Data,
            EntityState: EntityState.Edit
          };
        }
    })
  }

  close() {
    this.dialogRef.close();
  }

  saveData() {
    this.employeeSV
      .saveData(this.userData)
      .subscribe((resp: AppServerResponse<any>) => {
        console.log(resp);
        if(resp?.Success && resp?.Data) {
          var userInfo = {
            ...resp.Data,
            DisplayName: `${resp.Data.FullName} (${resp.Data.EmployeeCode})`
          }
          this.toastSV.showSuccess(SuccessMessage.UpdateEmployee)
          this.dataSV.user.next(userInfo);
          localStorage.setItem("UserData", JSON.stringify(userInfo))
          this.dialogRef.close()
        }
      })
  }
}

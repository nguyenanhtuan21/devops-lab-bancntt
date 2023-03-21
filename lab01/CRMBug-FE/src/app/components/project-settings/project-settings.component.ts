import { Permission } from './../../enumeration/permission.enum';
import { ValidateService } from './../../service/validation/validate.service';
import { PopupContactComponent } from './../popup/popup-contact/popup-contact.component';
import { PopupConfirmComponent } from './../popup/popup-confirm/popup-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from './../../service/data/data.service';
import { EntityState } from './../../enumeration/entity-state.enum';
import { ErrorMessage, SuccessMessage, PermissionMessage } from './../../constants/constant.enum';
import { ToastService } from './../../service/toast/toast.service';
import { EmployeeService } from './../../service/employee/employee.service';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from './../../service/project/project.service';
import { BaseComponent } from 'src/app/shared/base-component';
import { TypeControl } from 'src/app/enumeration/type-control.enum';
import { Component, OnInit } from '@angular/core';
import { ConfigDialog } from 'src/app/modules/config-dialog';
import { AppServerResponse } from 'src/app/service/base/base.service';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent extends BaseComponent implements OnInit {
  typeControl = TypeControl;

  projectID: number;

  projectOwnerID: number = 0;

  projectInfo = {
    ProjectName: '',
    ProjectCode: '',
  }

  projectMember: Array<any> = [];

  fieldDisplay: Array<any> = [
    {
      fieldName: "EmployeeCode",
      displayText: "Employee Code",
      typeControl: TypeControl.Textbox
    },
    {
      fieldName: "FullName",
      displayText: "Full Name",
      typeControl: TypeControl.Textbox
    },
    {
      fieldName: "Email",
      displayText: "Email",
      typeControl: TypeControl.Textbox
    },
    {
      fieldName: "PhoneNumber",
      displayText: "PhoneNumber",
      typeControl: TypeControl.Textbox
    },
    {
      fieldName: "RoleIDText",
      displayText: "Role",
      typeControl: TypeControl.Textbox
    },
    {
      fieldName: "CreatedDate",
      displayText: "Join on",
      typeControl: TypeControl.DateTime
    },
  ];

  tabIndex = 1;

  user: any;
  
  roles: any;

  constructor(
    private projectSV: ProjectService,
    private activeRoute: ActivatedRoute,
    private employeeSV: EmployeeService,
    private toastSV: ToastService,
    private dataSV: DataService,
    private dialog: MatDialog,
    private validateSV: ValidateService
  ) { 
    super();
    this.projectID = this.activeRoute.snapshot.params.projectID;
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.dataSV.project
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((project) => {
        if(project) {
          this.projectID = project.ID;
          this.projectOwnerID = project.OwnerID;
          this.getProjectInfo();
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

  switchTab(e: any, index: number) {
    this.tabIndex = index;
    if(index === 1) {
      this.getProjectInfo();
    } else {
      this.getMemberInfo();
    }
  }

  getProjectInfo() {
    if(this.projectID) {
      this.projectSV.getDataByID(this.projectID)
        .pipe(takeUntil(this._onDestroySub))
        .subscribe((resp) => {
          if(resp?.Success) {
            this.projectInfo ={ 
              ...resp.Data,
              EntityState: EntityState.Edit
            };
          }
        })
    }
  }

  getMemberInfo() {
    this.employeeSV.getEmployeeByProjectID(this.projectID, true)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((resp) => {
        if(resp?.Success) {
          this.projectMember = resp.Data;
        }
      })
  }

  saveData(e: any) {
    this.projectSV.saveData(this.projectInfo)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((resp) => {
        if(resp?.Success) {
          this.dataSV.project.next(resp?.Data);
          this.toastSV.showSuccess(SuccessMessage.UpdateProject);
        } else if(resp?.ValidateInfo && resp?.ValidateInfo.length > 0) {
          this.toastSV.showError(resp?.ValidateInfo[0]);
        } else {
          this.toastSV.showError(ErrorMessage.Exception);
        }
      })
  }

  removeMember(member: any) {
    if(!this.validateSV.hasPermission("Member", Permission.Delete)) {
      this.toastSV.showWarning(PermissionMessage.RemoveMember);
      return;
    }
    const config = new ConfigDialog('600px');
    config.position = {
      top: "200px"
    }
    config.data = {
      title: "Remove member",
      content: `Do you want to remove member <b>${member.FullName} (${member.EmployeeCode})</b>?`
    };
    console.log(member);
    const dialogRef = this.dialog.open(PopupConfirmComponent, config);
    dialogRef.afterClosed()
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((resp) => {
        if(resp) {
          const param = {
            ProjectID: this.projectID,
            UserIDs: [member.ID]
          }
          this.projectSV.removeMember(param)
            .pipe(takeUntil(this._onDestroySub))
            .subscribe((resp: AppServerResponse<any>) => {
              if(resp.Success) {
                this.getMemberInfo();
              }
            })
        }
      })
  }

  scanToCall(member: any) {
    const config = new ConfigDialog("580px");
    config.position = {
      top: '100px'
    }
    const name = `${member.FullName} (${member.EmployeeCode})`;
    if(member.PhoneNumber) {
      config.data = {
        title: "Scan QR code to call",
        qrData: `tel:${member.PhoneNumber}`,
        width: "130",
        email: member.Email,
        phoneNumber: member.PhoneNumber,
        fullName: name,
        lastName: member.LastName
      }
      this.dialog.open(PopupContactComponent, config);
    } else {
      this.toastSV.showWarning("Phone number is empty!");
    }
  }

  scanToSaveContact(member: any) {
    const config = new ConfigDialog("600px");
    config.position = {
      top: '100px'
    };
    const name = `${member.FullName} (${member.EmployeeCode})`;
    const homePhone = member.PhoneNumber ? member.PhoneNumber : "";
    config.data = {
      title: "Scan QR code to save contact",
      qrData: `BEGIN:VCARD\nVERSION:3.0\nN;CHARSET=UTF-8:${name};\nFN;CHARSET=UTF-8:${name}\nTEL;HOME;VOICE:${homePhone}\nEMAIL;HOME;INTERNET:${member.Email}\nEND:VCARD`,
      width: "150",
      email: member.Email,
      phoneNumber: member.PhoneNumber,
      lastName: member.LastName,
      fullName: name,
    }
    
    this.dialog.open(PopupContactComponent, config);
  }
}


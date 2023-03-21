import { AppServerResponse } from './../../service/base/base.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { PopupListProjectComponent } from './../popup/popup-list-project/popup-list-project.component';
import { RecentlyViewedComponent } from './../recently-viewed/recently-viewed.component';
import { SignalrService } from './../../service/signalr/signalr.service';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base-component';
import { Router } from '@angular/router';
import { DataService } from './../../service/data/data.service';
import { AuthService } from './../../service/auth/auth.service';
import { PopupUpdateUserSettingComponent } from './../popup/popup-update-user-setting/popup-update-user-setting.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ConfigDialog } from 'src/app/modules/config-dialog';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent extends BaseComponent implements OnInit {

  fullName: string = "";

  firstCharacter: string = "H";

  constructor(
    private dialog: MatDialog,
    private authSV: AuthService,
    private dataSV: DataService,
    private router: Router,
    private signalr: SignalrService,
    private employeeSV: EmployeeService
  ) { 
    super();
    this.dataSV.user
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((user) => {
        console.log(user);
        if(user) {
          this.fullName = user.FullName;
          this.firstCharacter = user.LastName.charAt(0).toUpperCase();
        }
      });
    this.initData();
  }

  ngOnInit(): void {
    this.signalr.startConnection();
    this.signalr.addListener();
  }

  ngOnDestroy(): void {
    this.signalr.disconnect();
    super.ngOnDestroy();
  }

  initData() {
    var roles = localStorage.getItem("RolePermission");
    if(roles) {
      this.dataSV.roles.next(JSON.parse(roles));
    } else {
      this.employeeSV.getAllRole()
        .pipe(takeUntil(this._onDestroySub))
        .subscribe((resp: AppServerResponse<any>) => {
          if(resp?.Success && resp?.Data) {
            localStorage.setItem("RolePermission", JSON.stringify(resp.Data));
            this.dataSV.roles.next(resp.Data);
          }
        })
    }
  }
  
  updateUserSetting() {
    let config = new ConfigDialog('600px');
    config.position = {
      top: '100px'
    }
    const dialogRef = this.dialog.open(PopupUpdateUserSettingComponent, config);
  }

  logout() {
    this.authSV.logout();
    this.router.navigate(["/login"])
  }

  openRecentlyViewed() {
    let config = new ConfigDialog('500px', '450px');

    config.position = {
      top: '50px',
      left: '160px'
    }
    config.backdropClass = 'no-background'
    const dialogRef = this.dialog.open(RecentlyViewedComponent, config);
    dialogRef.afterClosed()
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => {
        if(resp) {
          this.dataSV.task.next(resp)
          this.dataSV.project.next({
            ID: resp.ProjectID,
            ProjectName: resp.ProjectName,
            ProjectCode: resp.ProjectCode,
            OwnerID: resp.OwnerID
          })
          this.router.navigate([`/project/view-task/${resp.ProjectID}`])
        }
      })
  }

  openPopupListProject() {
    let config = new ConfigDialog('450px');

    config.position = {
      top: '50px',
      left: '100px'
    }
    config.backdropClass = 'no-background'
    const dialogRef = this.dialog.open(PopupListProjectComponent, config);
    // dialogRef.afterClosed()
    //   .pipe(takeUntil(this._onDestroySub))
    //   .subscribe(resp => {
    //     if(resp) {
    //       this.dataSV.project.next(resp)
    //       this.router.navigate([`/project/view-task/${resp.ProjectID}`])
    //     }
    //     console.log(resp);
    //   })
  }
}

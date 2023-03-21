import { BaseProjectComponent } from './../../base/base-project/base-project.component';
import { AppServerResponse } from './../../service/base/base.service';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base-component';
import { PopupConfirmComponent } from './../popup/popup-confirm/popup-confirm.component';
import { NotificationService } from './../../service/notification/notification.service';
import { DataService } from './../../service/data/data.service';
import { ProjectService } from 'src/app/service/project/project.service';
import { PopupAddProjectComponent } from './../popup/popup-add-project/popup-add-project.component';
import { MatDialog } from '@angular/material/dialog';
import { TypeControl } from './../../enumeration/type-control.enum';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfigDialog } from 'src/app/modules/config-dialog';
import { Router } from '@angular/router';
import { Addition } from 'src/app/enumeration/addition.enum';
import { ParamGrid } from 'src/app/models/param-grid.model';
import { Operator } from 'src/app/enumeration/operator.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  typeControl = TypeControl;

  projects: any;

  @ViewChild("projectComponent", {static: true, read: BaseProjectComponent})
  projectComponent?: BaseProjectComponent;

  userID: number = 0;

  constructor(
    private dialog: MatDialog,
    private dataSV: DataService
  ) { 
    super();
  }

  ngOnInit(): void {
    this.dataSV.user
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((user) => {
        if(user) {
          this.userID = Number(user.ID);
        }
      })
  }

  addProject() {
    const config = new ConfigDialog('800px');
    config.position = {
      top: '100px'
    }
    const dialogRef = this.dialog.open(PopupAddProjectComponent, config);
    dialogRef.afterClosed()
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((resp) => {
        if(resp) {
          this.projectComponent?.getDatas();
        }
      })

  }

  searchProject(data: any) {
    this.projectComponent?.searchProject(data);
  }
}

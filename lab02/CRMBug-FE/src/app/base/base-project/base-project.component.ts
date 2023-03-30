import { ValidateService } from './../../service/validation/validate.service';
import { PermissionMessage } from './../../constants/constant.enum';
import { ToastService } from './../../service/toast/toast.service';
import { Permission } from './../../enumeration/permission.enum';
import { BaseComponent } from 'src/app/shared/base-component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Addition } from 'src/app/enumeration/addition.enum';
import { Operator } from 'src/app/enumeration/operator.enum';
import { ParamGrid } from 'src/app/models/param-grid.model';
import { AppServerResponse } from 'src/app/service/base/base.service';
import { DataService } from 'src/app/service/data/data.service';
import { ProjectService } from 'src/app/service/project/project.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupConfirmComponent } from 'src/app/components/popup/popup-confirm/popup-confirm.component';
import { ConfigDialog } from 'src/app/modules/config-dialog';

@Component({
  selector: 'base-project',
  templateUrl: './base-project.component.html',
  styleUrls: ['./base-project.component.scss']
})
export class BaseProjectComponent extends BaseComponent implements OnInit {
  projects: any;

  configPaging: ParamGrid = {
    Filters: [
      {
        FieldName: 'EmployeeID',
        Value: null,
        Addition: Addition.None,
        IsFormula: false,
        Operator: Operator.None,
      },
      {
        FieldName: 'ProjectCode',
        Value: null,
        Addition: Addition.And,
        IsFormula: true,
        Operator: Operator.Like,
      },
      {
        FieldName: 'ProjectName',
        Value: null,
        Addition: Addition.And,
        IsFormula: true,
        Operator: Operator.Like,
      },
    ],
    PageIndex: 0,
    Formula: '({0} OR {1})',
    PageSize: 0,
    Columns: btoa(
      'ID,ProjectName, ProjectCode,CreatedBy,CreatedDate,ModifiedBy,ModifiedDate'
    ),
  };

  @Input()
  heightNoData: string = '600px';

  @Output()
  openProjectEvent = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private projectSV: ProjectService,
    private router: Router,
    private dataSV: DataService,
    private toastSV: ToastService,
    private validateSV: ValidateService
  ) { 
    super();
  }

  ngOnInit(): void {
    
    this.initData();
    this.getDatas();
  }

  initData() {
    this.dataSV.user
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((user) => {
        console.log(user);
        if(user) {
          this.configPaging.Filters[0].Value = user.ID;
        }
      });
  }

  getDatas() {
    this.projectSV.grid(this.configPaging)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((resp: AppServerResponse<any>) => {
        if(resp?.Success && resp?.Data?.Result?.length > 0) {
          this.isHaveData = true;
          this.projects = resp.Data.Result;
        } else {
          this.isHaveData = false;
        }
      })
  }

  openProject(project: any) {
    this.openProjectEvent.emit();
    this.router.navigate([`/project/home/${project.ID}`]);
    this.dataSV.project.next(project);
  }

  openProjectSettings(project: any) {
    this.dataSV.project.next(project);
    this.router.navigate([`/project/settings/${project.ID}`]);
  }

  searchProject(data: any) {
    this.configPaging.Filters.forEach((x: any) => {
      if(x.IsFormula) {
        x.Value = data.trim();
      }
    })
    this.getDatas();
  }

  deleteProject(project: any) {
    if(!this.validateSV.hasPermission("Project", Permission.Delete)) {
      this.toastSV.showWarning(PermissionMessage.DeleteProject);
      return;
    }
    const config = new ConfigDialog('600px');
    config.data = {
      title: "Delete project",
      content: `Do you want to delete project <b>${project.ProjectName}</b> (${project.ProjectCode})?`
    };
    const dialogRef = this.dialog.open(PopupConfirmComponent, config);
    dialogRef.afterClosed()
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((resp) => {
        if(resp) {
          this.projectSV.delete(project.ID)
            .pipe(takeUntil(this._onDestroySub))
            .subscribe((resp: AppServerResponse<any>) => {
              if(resp.Success) {
                this.getDatas();
              }
            })
        }
      })
  }
}

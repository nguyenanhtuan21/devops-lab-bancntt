import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base-component';
import { TypeControl } from 'src/app/enumeration/type-control.enum';
import { PopupInviteMemberComponent } from './../popup/popup-invite-member/popup-invite-member.component';
import { ConfigDialog } from 'src/app/modules/config-dialog';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from './../../service/data/data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent extends BaseComponent implements OnInit {
  typeControl = TypeControl;
  projectName: string = '';

  projectCode: string = '';


  constructor(
    private router: ActivatedRoute,
    private dataSV: DataService,
    private dialog: MatDialog
  ) { 
    super();
  }

  ngOnInit(): void {
    console.log(this.router.snapshot.params.projectID);
    this.dataSV.project.pipe(takeUntil(this._onDestroySub)).subscribe((project: any) => {
      if(project) {
        this.projectName = project.ProjectName;
        this.projectCode = project.ProjectCode
      }
    })
  }

  inviteMember(e: any) {
    const config = new ConfigDialog('600px');
    config.position = {
      top: '100px'
    }
    this.dialog.open(PopupInviteMemberComponent, config);
  }
}

import { AppServerResponse } from 'src/app/service/base/base.service';
import { takeUntil } from 'rxjs/operators';
import { TaskService } from 'src/app/service/task/task.service';
import { BaseComponent } from 'src/app/shared/base-component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrls: ['./recently-viewed.component.scss']
})
export class RecentlyViewedComponent extends BaseComponent implements OnInit {

  tasks: Array<any> = [];

  title: string = 'List task recently viewed';

  constructor(
    private taskSV: TaskService,
    public dialogRef: MatDialogRef<RecentlyViewedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
   }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    const taskIDs = JSON.parse(sessionStorage.getItem("Tasks") || '[]');
    if(taskIDs?.length > 0) {
      this.taskSV.getDataRecentlyViewed(taskIDs)
        .pipe(takeUntil(this._onDestroySub))
        .subscribe((resp: AppServerResponse<any>) => {
          if(resp?.Success && resp.Data.length > 0) {
            this.isHaveData = true;
            this.tasks = resp.Data;
          } else {
            this.isHaveData = false;
          }
        })
    } else {
      this.isHaveData = false;
    }
    
  }

  viewTask(data: any) {
    this.dialogRef.close(data);
  }

  close() {
    this.dialogRef.close();
  }
}

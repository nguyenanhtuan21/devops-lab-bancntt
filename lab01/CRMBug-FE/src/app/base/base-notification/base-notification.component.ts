import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base-component';
import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Addition } from 'src/app/enumeration/addition.enum';
import { Operator } from 'src/app/enumeration/operator.enum';
import { NotificationService } from 'src/app/service/notification/notification.service';

@Component({
  selector: 'base-notification',
  templateUrl: './base-notification.component.html',
  styleUrls: ['./base-notification.component.scss']
})
export class BaseNotificationComponent extends BaseComponent implements OnInit {
  @Input()
  data: any = [];

  @Input()
  height: string = 'calc(100vh - 202px)';

  @Input()
  projectID: string = '';

  @Input()
  userID: number = 0;

  currentPage: number = 0;

  totalRecord: number = 0;

  isFirstLoad: boolean = true;

  configPaging = {
    Filters: [
      {
        FieldName: 'ProjectID',
        Value: '',
        Addition: Addition.And,
        IsFormula: false,
        Operator: Operator.Equal,
      },
      {
        FieldName: 'ToUserID',
        Value: '',
        Addition: Addition.And,
        IsFormula: true,
        IsAllowEmpty: true,
        Operator: Operator.Equal,
      },
    ],
    PageIndex: 0,
    Formula: '',
    PageSize: 20,
    Columns: btoa(
      'ID,FromUserID,ToUserID,LayoutCode,EventName,Content,ModifiedDate,ModifiedBy,CreatedDate,CreatedBy,ProjectID'
    ),
  }

  constructor(
    private notificationSV: NotificationService,
    private cdf: ChangeDetectorRef
  ) { 
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.projectID) {
      this.configPaging.Filters[0].Value = changes.projectID.currentValue; 
    }
    if(changes.userID) {
      this.configPaging.Filters[1].Value = changes.userID.currentValue; 
    }
    this.getData(true);
  }

  scollReachEnd() {
    if(this.currentPage < Math.floor(this.totalRecord / this.configPaging.PageSize) && !this.isFirstLoad) {
      this.currentPage++;
      this.getData(false);
    }
    this.isFirstLoad = false;
  }

  getData(isFirstLoad: boolean = false) {
    this.configPaging.PageIndex = this.currentPage * this.configPaging.PageSize;
    this.notificationSV.grid(this.configPaging)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => {
        if(isFirstLoad) {
          this.data = [];
        }
        if(resp?.Success) {
          this.data = this.data.concat(resp.Data.Result);
          this.cdf.detectChanges();
          this.totalRecord = resp.Data.TotalRecord;
        }
      })
  }
}
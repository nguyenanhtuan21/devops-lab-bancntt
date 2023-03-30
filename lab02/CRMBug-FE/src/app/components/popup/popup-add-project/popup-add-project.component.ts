import { ErrorMessage, SuccessMessage } from './../../../constants/constant.enum';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base-component';
import { ToastService } from './../../../service/toast/toast.service';
import { ValidateService } from './../../../service/validation/validate.service';
import { TypeControl } from 'src/app/enumeration/type-control.enum';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/service/project/project.service';

@Component({
  selector: 'app-popup-add-project',
  templateUrl: './popup-add-project.component.html',
  styleUrls: ['./popup-add-project.component.scss']
})
export class PopupAddProjectComponent extends BaseComponent implements OnInit {

  //#region Properties
  typeControl = TypeControl;

  data: any = {
    ProjectName: '',
    ProjectCode: ''
  }
  //#endregion
  constructor(
    public dialogRef: MatDialogRef<PopupAddProjectComponent>,
    private validateSV: ValidateService,
    private projectSV: ProjectService,
    private toastSV: ToastService
  ) { 
    super();
  }

  ngOnInit(): void {
  }
  
  saveData() {
    if(this.data.ProjectName.trim() == '') {
      this.toastSV.showWarning("Project Name can not be empty!")
      return;
    }
    if(this.data.ProjectCode.trim() == '') {
      this.toastSV.showWarning("Project Code can not be empty!")
      return;
    }
    this.toastSV.loading();
    this.projectSV.saveData(this.data)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((resp) => {
        if(resp?.Success) {
          this.toastSV.showSuccess(SuccessMessage.AddProject);
          this.dialogRef.close(true);
        } else if(resp?.ValidateInfo && resp?.ValidateInfo.length > 0) {
          this.toastSV.showError(resp?.ValidateInfo[0]);
        } else {
          this.toastSV.showError(ErrorMessage.Exception);
        }
      },
      error => {
        console.log(error);
        this.toastSV.showError(ErrorMessage.Exception);
      });
    
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
}

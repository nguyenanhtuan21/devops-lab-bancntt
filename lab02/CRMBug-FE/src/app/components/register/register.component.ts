import { AuthService } from './../../service/auth/auth.service';
import { SuccessMessage } from './../../constants/constant.enum';
import { ToastService } from './../../service/toast/toast.service';
import { DataService } from './../../service/data/data.service';
import { takeUntil, catchError } from 'rxjs/operators';
import { EmployeeService } from './../../service/employee/employee.service';
import { EntityState } from './../../enumeration/entity-state.enum';
import { ValidateService } from './../../service/validation/validate.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ErrorMessage, ValidateMessage } from 'src/app/constants/constant.enum';
import { Subject } from 'rxjs';
import { BaseComponent } from 'src/app/shared/base-component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
  
  validateMessage: any = ValidateMessage;

  dataSave: any = {
    Username: '',
    Password: '',
    Email: '',
    PhoneNumber: '',
    FirstName: '',
    LastName: '',
    EntityState: EntityState.Add,
  }

  errorList: any = {
    Username: '',
    Password: '',
    Email: '',
    PhoneNumber: '',
    FirstName: '',
    LastName: '',
    PasswordReEnter: '',
  }

  passwordReEnter = '';

  isShowErrorMessage: boolean = false;
  constructor(
    private router: Router,
    private validateSV : ValidateService,
    private employeeSV: EmployeeService,
    private toastSV: ToastService,
    private authSV: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
  }


  register(e: any) {
    if(this.validateRegister()) {
      this.saveData()
    }
  }

  backToLogin(e: any) {
    this.router.navigate(['/login'])
  }

  saveData() {
    const dataSave = JSON.parse(JSON.stringify(this.dataSave));
    dataSave.Password = btoa(dataSave.Password);
    this.toastSV.loading();
    this.authSV
      .register(dataSave)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((resp) => {
        if(resp?.Success) {
          this.toastSV.showSuccess(SuccessMessage.Register);
          this.router.navigate(['/login'])
        } else if(resp?.ValidateInfo?.length > 0) {
          this.toastSV.showError(resp?.ValidateInfo[0]);
        } else {
          this.toastSV.showError(ErrorMessage.Exception);
        }
      },
      error => {
        console.log(error);
        this.toastSV.showError(ErrorMessage.Exception);
      })
  }

  validateRegister(): boolean {
    let isValid = true;
    this.errorList = {};
    Object.keys(this.dataSave).forEach(fieldName => {
      let valid = this.validateSV.validateOption(this.dataSave[fieldName], fieldName);
      if(!valid) {
        this.errorList[fieldName] = this.validateMessage[fieldName]
      } else {
        this.errorList[fieldName] = '';
      }
      isValid = isValid && valid;
    })
    if(this.passwordReEnter !== this.dataSave.Password) {
      isValid = false;
      this.errorList['PasswordReEnter'] = this.validateMessage['PasswordReEnter'];
    }
    this.isShowErrorMessage = isValid;
    return isValid;
  }
}

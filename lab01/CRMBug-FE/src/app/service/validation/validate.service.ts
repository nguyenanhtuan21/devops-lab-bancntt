import { Utils } from './../../../shared/Utils';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/service/data/data.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Permission } from 'src/app/enumeration/permission.enum';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  public _onDestroySub: Subject<void> = new Subject<void>();

  user: any = {};
  roles: any = [];

  constructor(
    private dataSV: DataService
  ) {
    this.dataSV.user
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((user) => {
        this.user = user;
      })
    this.dataSV.roles
      .pipe(takeUntil(this._onDestroySub))
      .subscribe((roles) => {
        this.roles = roles;
      })
  }

  validateRequired(data: string): boolean {
    if(!data) {
      return false;
    }
    if(data.trim() === '') {
      return false;
    }
    return true;
  } 

  validateEmail(email: string): boolean {
    const regex =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  validateOption(value: any, fieldName: string): boolean {
    switch(fieldName) {
      case "Username":
      case "Password":
      case "FirstName":
      case "LastName":
      case "Subject":
      case "ProjectName":
      case "ProjectCode":
        return this.validateRequired(value);
      case "Email":
        return this.validateEmail(value);

      default: 
        return true;
    }
  }

  hasPermission(layoutCode: string, permission: number): boolean {
    const role = this.roles.find((x : any) => x.ID == this.user.RoleID && x.LayoutCode == layoutCode);
    if(!role) {
      return false;
    }
    const havePermission = Number(role.Permission) & permission;
    if(havePermission == 0){
      return false;
    }
    return true;
  }

  ngOnDestroy(): void {
    Utils.unSubscribe(this._onDestroySub);
  }
}

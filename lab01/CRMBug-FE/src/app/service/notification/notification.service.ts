import { HttpClient } from '@angular/common/http';
import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseService {

  constructor(
    protected http: HttpClient
  ) { 
    super(http);
    this.controller = `${this.controller}/Notification`;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseService {

  constructor(
    http: HttpClient
  ) { 
    super(http);
    this.controller = `${this.controller}/Comment`
  }
}

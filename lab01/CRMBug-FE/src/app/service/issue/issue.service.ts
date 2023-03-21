import { BaseService } from './../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IssueService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.controller = `${this.controller}/Issue`
  }

  getFormData(projectID: number, masterID: number, formModeState: number): Observable<any> {
    return this.http.get<any>(`${this.controller}/FormData/${projectID}/${masterID}/${formModeState}`, {headers: this.headers});
  }
}

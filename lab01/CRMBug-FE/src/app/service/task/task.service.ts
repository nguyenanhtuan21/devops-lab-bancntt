import { AppServerResponse, BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
    this.controller = `${this.controller}/Task`
  }

  getFormData(projectID: number, masterID: number, formModeState: number): Observable<any> {
    return this.http.get<AppServerResponse<any>>(`${this.controller}/FormData/${projectID}/${masterID}/${formModeState}`, {headers: this.headers});
  }

  getSummaryData(param: any): Observable<any> {
    return this.http.post<AppServerResponse<any>>(`${this.controller}/GetSummaryData`,param, {headers: this.headers});
  }

  getDataRecentlyViewed(taskIDs: Array<any>): Observable<any> {
    return this.http.post<AppServerResponse<any>>(`${this.controller}/GetDataRecentlyViewed`, taskIDs, {headers: this.headers});
  }
}

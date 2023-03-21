import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/service/data/data.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService {

  constructor(
    http: HttpClient,
    private dataSV: DataService
  ) {
    super(http);
    this.controller = `${this.controller}/Project`;
  }
  /**
   * Hàm thực hiện mời thành viên vào dự án
   * Author: hhdang 11.8.2022
   * @param param 
   * @returns 
   */
  inviteMember(param: any): Observable<any> {
    return this.http.post<any>(`${this.controller}/InviteMember`, param, {headers: this.headers});
  }

  /**
   * Hàm thực hiện loại bỏ thành viên khỏi dự án
   * Author: hhdang 11.8.2022
   * @param param 
   * @returns 
   */
  removeMember(param: any): Observable<any> {
    return this.http.post<any>(`${this.controller}/RemoveMember`, param, {headers: this.headers});
  }

  getReport(param: any): Observable<any> {
    return this.http.post<any>(`${this.controller}/GetReport`, param, {headers: this.headers});
  }

  getProgressReport(param: any): Observable<any> {
    return this.http.post<any>(`${this.controller}/GetProgressReport`, param, {headers: this.headers});
  }

  getAssignedReport(param: any): Observable<any> {
    return this.http.post<any>(`${this.controller}/GetAssignedReport`, param, {headers: this.headers});
  }
}

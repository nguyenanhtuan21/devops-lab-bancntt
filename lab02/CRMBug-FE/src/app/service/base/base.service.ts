import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIConfig } from 'src/app/api/config';

export interface AppServerResponse<T> {
  Success: boolean,
  Data: T,
  Messenger: string,
  ValidateInfo: Array<any>,
  TotalRecord: number
}

@Injectable({
  providedIn: 'root'
})


export class BaseService {
  controller: string = "";

  headers: any;
  constructor(
    protected http: HttpClient
  ) {
    let accessToken = localStorage.getItem('AccessToken');
    this.controller = `${APIConfig.development}/api/v1`;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': "Bearer " + accessToken
    });
  }

  getDatas(): Observable<any> {
    return this.http.get<AppServerResponse<any>>(this.controller, {headers: this.headers});
  }

  grid(param: any): Observable<any> {
    const url = `${this.controller}/Grid`;
    return this.http.post<AppServerResponse<any>>(url,param , {headers: this.headers})
  }

  saveData(data: any):  Observable<any> {
    return this.http.post<AppServerResponse<any>>(this.controller, data , {headers: this.headers});
  }

  getDictionary(): Observable<any> {
    const url = `${this.controller}/Dictionary`;
    return this.http.get<AppServerResponse<any>>(url, {headers: this.headers});
  }

  getDataByID(id: number): Observable<any> {
    const url = `${this.controller}/${id}`;
    return this.http.get<AppServerResponse<any>>(url, {headers: this.headers});
  }

  delete(id: number): Observable<any> {
    const url = `${this.controller}/${id}`;
    return this.http.delete<AppServerResponse<any>>(url, {headers: this.headers});
  }
}

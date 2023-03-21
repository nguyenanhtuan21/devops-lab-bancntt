import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // project hiện tại
  project = new BehaviorSubject<any>(null);

  // user hiện tại
  user = new BehaviorSubject<any>(null);

  task = new BehaviorSubject<any>(null);

  roles = new BehaviorSubject<any>(null);

  loading = new BehaviorSubject<boolean>(false);

  constructor() { 
    
  }
}

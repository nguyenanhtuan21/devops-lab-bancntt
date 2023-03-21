import { DataService } from './service/data/data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BugTracking';
  isLogin = false;
  isLoading = false;
  /**
   * Constructor
   */
  constructor(
    private dataSV: DataService
  ) {
    this.dataSV.user.subscribe(user => {
      if(user) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    })
    this.dataSV.loading.subscribe(loading => {
      this.isLoading = loading;
    })
  }
}

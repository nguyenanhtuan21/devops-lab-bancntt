import { Subject } from 'rxjs';
import { DataService } from './../../service/data/data.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  _onDestroySub: Subject<void> = new Subject<void>();
  error: string = '';
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private dataSV: DataService
  ) {

  }

  /**
   * Handle sự kiện form submit
   */
  submit(e: any) {
    this.dataSV.loading.next(true);

    //Gọi api login từ service
    this.authService
      .login(this.username, this.password)
      .subscribe(
        (resp) => {
          this.dataSV.loading.next(false);
          if (!resp.Success) {
            this.error = resp['userMsg'];
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        (error) => {
          console.log(error);
          this.error = error;
          this.dataSV.loading.next(false);
        }
      );
  }

  toRegister(e: any) {
    this.router.navigate(['/register']);
  }
}

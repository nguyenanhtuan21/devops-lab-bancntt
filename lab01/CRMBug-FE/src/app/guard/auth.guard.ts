import { DataService } from './../service/data/data.service';
import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";
import { AuthService } from "../service/auth/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService, 
        private router: Router,
        private dataSV: DataService
    ) { 
        
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.dataSV.user.pipe(
            take(1),
            map(user => {
                if (user) {
                    console.log(user.RoleID)

                    //Kiểm tra role có nằm trong danh sách cho phép truy cập không
                    // if (!(route.data.role && route.data.role.indexOf(user.role) === -1)) {
                    //     return true;
                    // } else {
                    //     this.authService.logout();
                    // }

                    return true;
                }

                return this.router.createUrlTree(['/login']);
            }));
    }

}
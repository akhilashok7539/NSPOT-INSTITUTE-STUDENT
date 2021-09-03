import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserTypeGuard implements CanActivate {

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const userType = this.authService.userProfile.userType;
    // check if the user is an institute type else redirect to the user app
    if (userType === 3) {
      return true;
    }

    // if the user not logedin at all going to the login page of the same portal
    if (!this.authService.userProfile) {
      console.log("redirect url state",state);
      
      this.toastr.error('Oops!', 'Please login.');
      this.authService.logoutUser();
      this.router.navigate(['/login'],{queryParams:{'redirectURL':state.url}});
      return false;
    }

    // user is not an institute type, so redirecting to correct portal
    this.toastr.error('Oops!', 'loged in to the wrong portal');
    this.authService.logoutUser();
    setTimeout(() => {
      window.location.replace(this.authService.find_UserTypePortal(userType));
    }, 2000);
    return false;
  }

}

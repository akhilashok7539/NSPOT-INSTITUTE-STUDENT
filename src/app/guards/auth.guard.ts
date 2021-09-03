import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // constructor(
  //   private toastr: ToastrService,
  //   private router: Router
  // ) {
  // }
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  //   if (sessionStorage.getItem('userLogin')) {
  //     // logged in so return true
  //     return true;
  //   }
  //   console.log("redirect url state",state);

  //   //  not logged in so redirect to login page
  //   this.toastr.error('Oops!', 'Please login before redirecting.')
  //   this.router.navigate(['/login'],{queryParams:{'redirectURL':state.url}});
  //   return false;
  // }
  constructor(
    private router: Router,private toastr: ToastrService,
) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   
    console.log("check",state);
   
    if (sessionStorage.getItem('userLogin')) {
      // logged in so return true
      return true;
    }
    
    this.router.navigate(['/login'], 
    { queryParams: { returnUrl: state.url }}
    
    );

  
    return false;
}
}

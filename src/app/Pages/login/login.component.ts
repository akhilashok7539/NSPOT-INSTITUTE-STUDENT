import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { endPoints } from '../../config/endPoints';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  redirectURL;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
    private activateroute:ActivatedRoute
  ) { }

  form: FormGroup;
  touched = false;
  instituteTypes;
  ngOnInit(): void {

    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    let params = this.activateroute.snapshot.queryParams;
    console.log(params);
    if (params['returnUrl']) {
      this.redirectURL = params['returnUrl'];
    }
  }



  onSubmit(): void {
    this.touched = true;
    if (this.form.invalid) {
      return;
    } else {
      (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
    }
    const formData = this.form.value;
    this.apiService.doPostRequest(endPoints.login, formData).subscribe((returnData: any) => {
      if (returnData.status === true) {
        this.toastr.success('Login successfull');
        this.authService.setUser(returnData.data);
        console.log(this.redirectURL);
        
        if (this.redirectURL) {        
          this.router.navigateByUrl(this.redirectURL)
             console.log("here");
             
      } else {
        console.log("else");
      
        this.router.navigate([`/student/profile`]);
      }
      }
      else {
        this.toastr.error(returnData.error.message);
        (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
      }
    },
      error => {
        console.error(error);
        this.toastr.error(error.error[0].message);
        (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
      });

  }

  get f() { return this.form.controls; }
}

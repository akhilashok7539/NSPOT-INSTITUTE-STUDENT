import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmPasswordValidator } from "./confirm-password.validtor";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  userdetails:any=[];
  userId;
  constructor(private fb: FormBuilder,private apiservice:ApiService,private router:Router) {}

  ngOnInit() {
    this.userdetails =JSON.parse(sessionStorage.getItem("userLogin"))
    this.userId = this.userdetails['userProfile'].userId;
    console.log(this.userId);

    this.registerForm = this.fb.group(
      {
      
        password: ["",Validators.required],
        confirmPassword: ["",Validators.required]
      },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      }
    );
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.valid);
    if(this.registerForm.valid)
    {
      let req = {
        "newPassword":this.registerForm.value['confirmPassword']
      }
      this.apiservice.doPostRequest("user/reset-password/"+this.userId,req).subscribe(
        data =>{
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigate(['/login']);
        },
        error =>{

        }
      )
    }
    
  }
}

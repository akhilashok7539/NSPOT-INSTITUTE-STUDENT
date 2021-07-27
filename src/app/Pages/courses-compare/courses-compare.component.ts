import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from 'src/app/config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-courses-compare',
  templateUrl: './courses-compare.component.html',
  styleUrls: ['./courses-compare.component.css']
})
export class CoursesCompareComponent implements OnInit {
  comparelist:any=[];
  studentId;
  courseFees;
  paymentTenures:any=[];
  constructor(private apiservice:ApiService,private authService:AuthService,private toaster:ToastrService) { 
  this.studentId = this.authService.userProfile.userId;

  }

  ngOnInit(): void {
    this.getcoursByStuneId();
    this.apiservice.doGetRequest(endPoints.Get_paymentTenures).subscribe((returnData: any) => {
      this.paymentTenures = returnData.data;
      console.log(this.paymentTenures);
    });
  }
  getcoursByStuneId()
  { 
    this.apiservice.doGetRequest(`CourseCompare/`+this.studentId).subscribe(
      data =>{
        this.comparelist = data['result'];
        console.log(this.comparelist);
        
      }
    )
  }
  remove(id)
  {
    this.apiservice.doDeleteRequest(`CourseCompare/delete/`+id.id).subscribe(
      data =>{
          this.toaster.success("Removed")
          this.ngOnInit();
      }
    )
  }
  getinstititeFees(id)
  {
    this.apiservice.doGetRequest(`institute/course/fees/`+id).subscribe(
      data =>{
        console.log("feess",data);
        this.courseFees = data['data']
        // return(
        //   this.courseFees.otherFee
        // )
      } 
    )
  }
  getpaymentTenture(id){
    console.log(id);
    
    return (
      this.paymentTenures.find((el) => el.id.toString() === (id || "").toString()) || {
        title: "",
      }
    );
  }
}

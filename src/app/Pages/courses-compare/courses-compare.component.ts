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
  comparelist: any = [];
  studentId;
  courseFees;
  paymentTenures: any = [];
  addmisionstartdateCount1;
  addmisionstartdateCount2;
  addmisionstartdateCount3;

  constructor(private apiservice: ApiService, private authService: AuthService, private toaster: ToastrService) {
    this.studentId = localStorage.getItem("USERID");;

  }

  ngOnInit(): void {
    this.getcoursByStuneId();
    this.apiservice.doGetRequest(endPoints.Get_paymentTenures).subscribe((returnData: any) => {
      this.paymentTenures = returnData.data;
      console.log(this.paymentTenures);
    });

  }
  getcoursByStuneId() {
    this.apiservice.doGetRequest(`CourseCompare/` + this.studentId).subscribe(
      data => {
        this.comparelist = data['result'];
        console.log(this.comparelist);
        if( this.comparelist[0])
        {
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          let s = mm + '/' + dd + '/' + yyyy;
          var cuuretdate = new Date(mm + '/' + dd + '/' + yyyy)
          console.log(cuuretdate.getTime());
          var date1 = new Date(this.comparelist[0].instituteCourse['admissionStartDate']);
          var Difference_In_Time = cuuretdate.getTime() - date1.getTime();
          var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          console.log(Math.round(Difference_In_Days));
          this.addmisionstartdateCount1 = Math.round(Difference_In_Days);
          console.log("oth arrays",this.addmisionstartdateCount1);
          
        }
        if( this.comparelist[1])
        {
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          let s = mm + '/' + dd + '/' + yyyy;
          var cuuretdate = new Date(mm + '/' + dd + '/' + yyyy)
          console.log(cuuretdate.getTime());
          var date1 = new Date(this.comparelist[1].instituteCourse['admissionStartDate']);
          var Difference_In_Time = cuuretdate.getTime() - date1.getTime();
          var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          console.log(Math.round(Difference_In_Days));
          this.addmisionstartdateCount2 = Math.round(Difference_In_Days);
          console.log("1th arrays",this.addmisionstartdateCount2);

        }
        if( this.comparelist[2])
        {
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          let s = mm + '/' + dd + '/' + yyyy;
          var cuuretdate = new Date(mm + '/' + dd + '/' + yyyy)
          console.log(cuuretdate.getTime());
          var date1 = new Date(this.comparelist[2].instituteCourse['admissionStartDate']);
          var Difference_In_Time = cuuretdate.getTime() - date1.getTime();
          var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          console.log(Math.round(Difference_In_Days));
          this.addmisionstartdateCount3 = Math.round(Difference_In_Days);
          console.log("2th arrays",this.addmisionstartdateCount1);

        }
      }
    )
  }
  remove(id) {
    this.apiservice.doDeleteRequest(`CourseCompare/delete/` + id.id).subscribe(
      data => {
        this.toaster.success("Removed")
        this.ngOnInit();
      }
    )
  }
  getinstititeFees(id) {
    this.apiservice.doGetRequest(`institute/course/fees/` + id).subscribe(
      data => {
        console.log("feess", data);
        this.courseFees = data['data']
        // return(
        //   this.courseFees.otherFee
        // )
      }
    )
  }
  getpaymentTenture(id) {
    console.log(id);

    return (
      this.paymentTenures.find((el) => el.id.toString() === (id || "").toString()) || {
        title: "",
      }
    );
  }
}

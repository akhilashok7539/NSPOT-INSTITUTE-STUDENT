import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-course-details',
  templateUrl: './view-course-details.component.html',
  styleUrls: ['./view-course-details.component.css']
})
export class ViewCourseDetailsComponent implements OnInit {
  courseinfo:any =[];
  multiForm: FormData = new FormData();
  currentdate;
  addmisonstarts;
  constructor(private router:Router,private apiservice:ApiService) { }

  ngOnInit(): void {
    this.courseinfo = JSON.parse(sessionStorage.getItem("courseinfo"));
    console.log(this.courseinfo);
    // this.admionstatus(this.courseinfo.item) 
    this.updatecount();
  }
  apply()
  {
    // sessionStorage.setItem("coursename", JSON.stringify(courseinfo))
    this.router.navigate(['/student/course/apply/' + this.courseinfo.item.id])
  }

  updatecount()
  {
    let req  ={
      viewCount:parseInt(this.courseinfo?.item?.viewCount) + 1
    }
    let count =parseInt(this.courseinfo?.item?.viewCount) + 1
  
    this.multiForm.append("viewCount",count.toString())
    console.log(req);
    this.apiservice.doPostRequest_upload("institute/course/update/"+this.courseinfo?.item?.id,this.multiForm).subscribe(
      data =>{

      },
      error =>{

      }
    )
  }
  admionstatus(item) {
    // console.log(item);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let s = mm + '/' + dd + '/' + yyyy;
    this.currentdate = mm + '-' + dd + '-' + yyyy;
    var cuuretdate = new Date(mm + '/' + dd + '/' + yyyy)
    var date1 = new Date(item['admissionStartDate']);
    var Difference_In_Time = cuuretdate.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    // this.addmisionstartdateCount2 = Math.round(Difference_In_Days);
    // console.log("1th arrays",this.addmisionstartdateCount2);
    // let d1 = item['admissionStartDate']
    // console.log(new Date(d1));

    // d1 = d1.split("T");
    // d1 = d1[0];
    // d1 = d1.split("-");


    // let d2 = item['admissionCloseDate']
    // d2 = d2.split("T")
    // console.log(d2);
    // d2 = d2[0]
    // d2 = d2.split("-");

    // let c = this.currentdate.split("-");

    // var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  
    // var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    // var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

    let d1 = item['admissionStartDate']
    d1 = new Date(d1);
    let d2 = item['admissionCloseDate']
    d2 = new Date(d2);
    var check = new Date(this.currentdate);
    // console.log(d1);
    // console.log(d2);
    // console.log(check);
    // console.log( check.valueOf()- d1.valueOf());
    let count = check.valueOf() - d1.valueOf();
    var diffDays = Math.ceil(count / (1000 * 3600 * 24));
    // console.log(diffDays);

    if (check > d1 && check < d2) {

      // console.log("Addmission starts from "+d1 + "to"+d2 );
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      let s = mm + '/' + dd + '/' + yyyy;
      var cuuretdate = new Date(mm + '/' + dd + '/' + yyyy)
      var date1 = new Date(item['admissionCloseDate']);
      var Difference_In_Time = cuuretdate.getTime() - date1.getTime();
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      if (Difference_In_Days > 0) {
        this.addmisonstarts = "Opened"
      }
      else {
        this.addmisonstarts = "Opened"
      }


      return this.addmisonstarts;

    }
    else {
      // console.log("Admission not started yet or admission closed" );
      if (check < d1) {

        if (Difference_In_Days > 0) {
          this.addmisonstarts = "Not Started"
        }
        else {
          this.addmisonstarts = "Not Started"
        }

        return this.addmisonstarts;
      }
      else {
        // console.log("addmison closed");

        return this.addmisonstarts = "Closed";

      }
    }
  }
}

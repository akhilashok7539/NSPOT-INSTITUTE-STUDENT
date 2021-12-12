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

  constructor(private router:Router,private apiservice:ApiService) { }

  ngOnInit(): void {
    this.courseinfo = JSON.parse(sessionStorage.getItem("courseinfo"));
    console.log(this.courseinfo);
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
}

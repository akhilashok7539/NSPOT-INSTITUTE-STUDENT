import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-course-details',
  templateUrl: './view-course-details.component.html',
  styleUrls: ['./view-course-details.component.css']
})
export class ViewCourseDetailsComponent implements OnInit {
  courseinfo:any =[];
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.courseinfo = JSON.parse(sessionStorage.getItem("courseinfo"));
    console.log(this.courseinfo);
    
  }
  apply()
  {
    // sessionStorage.setItem("coursename", JSON.stringify(courseinfo))
    this.router.navigate(['/student/course/apply/' + this.courseinfo.item.id])
  }
}

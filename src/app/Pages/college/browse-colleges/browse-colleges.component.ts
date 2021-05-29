import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { endPoints } from '../../../config/endPoints';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-browse-colleges',
  templateUrl: './browse-colleges.component.html',
  styleUrls: ['./browse-colleges.component.css']
})
export class BrowseCollegesComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  form: FormGroup;
  touched = false;
  studentId = this.authService.userProfile.userType_modelId;
  username = this.authService.userProfile.username;
  studentDetails;
  accademicLevels;
  accademicLevelsCourses;
  courseStreams;
  courseStreamsSpecializations;
  courseTypes;
  universityTypes;
  courses

  baseApiUrl = environment.baseApiUrl;

  ngOnInit(): void {
    // fetching student details
    this.apiService.doGetRequest(endPoints.student + this.studentId).subscribe((returnData: any) => {
      console.log(returnData)
      this.studentDetails = returnData.data;
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch student details')
    });
    this.loadData();

    this.form = this.formBuilder.group({
      accademicLevelId: [''],
      accademicLevelCourseId: [''],
      // courseTypeId: [''],
      courseStreamId: [''],
      courseStreamSpecializationId: [''],
    });

  }

  loadData(): void {
    this.apiService.doGetRequest(endPoints.Get_academicLevels).subscribe((returnData: any) => {
      this.accademicLevels = returnData.data;
      console.log("accademic levels ", this.accademicLevels);
    });
    this.apiService.doGetRequest(endPoints.Get_courseTypes).subscribe((returnData: any) => {
      this.courseTypes = returnData.data;
      console.log("course types ", this.courseTypes);
    });
    this.apiService.doGetRequest(endPoints.Get_universityTypes).subscribe((returnData: any) => {
      this.universityTypes = returnData.data;
      console.log("university types", this.universityTypes);
    });
    this.apiService.doGetRequest(endPoints.Get_courseStream).subscribe((returnData: any) => {
      this.courseStreams = returnData.data;
      console.log("courseStreams ", this.courseStreams);
    });
  }

  loadAccademicLevelCourses(event): void {
    this.form.controls.accademicLevelCourseId.setValue("");
    const academicLevelId = event.target.value;
    this.apiService.doGetRequest(endPoints.Get_academicLevel_Courses + academicLevelId).subscribe((returnData: any) => {
      this.accademicLevelsCourses = returnData.data;
      console.log(this.accademicLevelsCourses);
    });
  }

  loadCourseStreamSpecializations(event): void {
    const streamId = event.target.value;
    // alert(academicLevelId)
    this.apiService.doGetRequest(endPoints.Get_courseStream_specialization + streamId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations = returnData.data;
      console.log(this.courseStreamsSpecializations);
    });
  }

  onSubmit() {
    this.touched = true;
    console.log(document.getElementsByClassName('ng-invalid'))
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;

    this.apiService.doPostRequest(
      endPoints.Get_course_filter, formData
    ).subscribe((returnData: any) => {
      if (returnData.status == true) {
        this.courses = returnData.data
        console.log(returnData)
      }
      else {
        this.toastr.error('Something went wrong!');
      }
    },
      error => {
        console.error(error);
        this.toastr.error('Something went wrong!');
      });
  }

  get f() { return this.form.controls; }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { endPoints } from '../../config/endPoints';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  studentId = this.authService.userProfile.userType_modelId;
  username = this.authService.userProfile.username;
  studentDetails;
  educations;
  certificates;
  entranceExams;
  allApplications = new Array();
  acceptedPreApplications = new Array();
  acceptedApplications = new Array();
  rejectedApplications = new Array();
  resubmitApplications = new Array();

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

    // fetching education details of the student
    this.apiService.doGetRequest(endPoints.Get_studentEducations + this.studentId).subscribe((returnData: any) => {
      this.educations = returnData.data;
    }, error => {
      console.error(error);
      this.toastr.warning('Failed to fetch education details');
    });

    // fetching certificates
    this.apiService.doGetRequest(endPoints.Get_studentCertificates + this.studentId).subscribe((returnData: any) => {
      this.certificates = returnData.data;
      console.log(this.certificates)
    }, error => {
      console.error(error);
      this.toastr.warning('Failed to fetch certificate details')
    });

    // fetching entrance exams
    this.apiService.doGetRequest(endPoints.Get_studentEntranceExams + this.studentId).subscribe((returnData: any) => {
      this.entranceExams = returnData.data;
      console.log(this.entranceExams)
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch entrance exams details')
    });

    // fetching submitted applications
    this.apiService.doGetRequest(endPoints.Get_applicationForm
      + "?where[studentId]=" + this.studentId
      // + "&include[0]=Institute_Course"
      // + "&include[0][model]=Institute_Course"
      // + "&include[0][include][0]=AccademicLevel_Course"
    ).subscribe((returnData: any) => {
      this.allApplications = returnData.data;
      this.allApplications.map(element => {
        if (element.applicationStatus == "pre-application-approved")
          this.acceptedPreApplications.push(element)
        if (element.applicationStatus == "payment-done")
          this.acceptedApplications.push(element)
        if (element.applicationStatus == "rejected")
          this.rejectedApplications.push(element)
        if (element.applicationStatus == "pre-application-returned")
          this.resubmitApplications.push(element)
      })
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch application details')
    });

  }

  getStatusText(status) {
    switch (status) {
      case 'pre-application-applied':
        return "Applied"
        break;

      case 'pre-application-approved':
        return "Payment Awaiting"
        break;

      case 'payment-done':
        return "Approved"
        break;

      case 'rejected':
        return "Rejected"
        break;

      case 'pre-application-returned':
        return "Returned"
        break;

      default:
        return "Applied"
        break;
    }
  }

}

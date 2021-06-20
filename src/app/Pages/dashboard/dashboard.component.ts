import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { endPoints } from '../../config/endPoints';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
declare var  Razorpay:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rzp1:any;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
    
  ) { }

  studentId = this.authService.userProfile.userType;
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
  options = {
    "key": "rzp_test_g8vPt9nJiYuDMj",
    "amount": "2000",
    "name": "Akhil",
 };
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
        return "Course-Applied"
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
  pay(){
  //   var options = {
  //     "key": "rzp_test_g8vPt9nJiYuDMj", 
  //     "amount": "50000",
  //     "currency": "INR",
  //     "name": "Acme Corp",
  //     "description": "Test Transaction",
  //     "image": "https://example.com/your_logo",
  //     "order_id": "WCVcYAWsnAKjtWGLwqp3lCiu", 
  //     "handler": function (response){
  //         alert(response.razorpay_payment_id);
  //         alert(response.razorpay_order_id);
  //         alert(response.razorpay_signature)
  //     },
  //     "prefill": {
  //         "name": "Gaurav Kumar",
  //         "email": "gaurav.kumar@example.com",
  //         "contact": "9999999999"
  //     },
  //     "notes": {
  //         "address": "Razorpay Corporate Office"
  //     },
  //     "theme": {
  //         "color": "#3399cc"
  //     }
  // };
  // var rzp1 = new Razorpay(options);
  // rzp1.open();
  // rzp1.on('payment.failed', function (response){
  //   console.log(response);
    
  //         alert(response.error.code);
  //         alert(response.error.description);
  //         alert(response.error.source);
  //         alert(response.error.step);
  //         alert(response.error.reason);
  //         alert(response.error.metadata.order_id);
  //         alert(response.error.metadata.payment_id);
  // });
  
  this.rzp1 = new window.Razorpay(this.options);
  this.rzp1.open();
  this.rzp1.on('payment.failed', function (response){
      console.log(response);
      
           
    });
    this.rzp1.on('payment.success', function (response){
      console.log(response);
      
           
    });
  }
 
}

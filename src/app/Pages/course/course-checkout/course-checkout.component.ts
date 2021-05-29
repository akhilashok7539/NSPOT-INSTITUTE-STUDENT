import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../../services/api.service';
import { endPoints } from '../../../config/endPoints';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

declare var Razorpay: any;
@Component({
  selector: 'app-course-checkout',
  templateUrl: './course-checkout.component.html',
  styleUrls: ['./course-checkout.component.css']
})

export class CourseCheckoutComponent implements OnInit {

  courseFeeDetails;
  studentDetails
  totalFees;
  courseId
  applicationId;
  applicationDetails;
  studentId = this.authService.userProfile.userType_modelId;

  createdOrder
  canPay: boolean;
  cantPayReason = "";
  didPay: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.applicationId = parseInt(this.route.snapshot.paramMap.get('applicationId'));
    this.loadCourseFee();
    this.loadStudentDetails();
  }

  loadCourseFee() {
    this.apiService.doGetRequest(endPoints.Get_applicationForm + "?where[id]=" + this.applicationId).subscribe((returnData: any) => {
      console.log(returnData)
      this.applicationDetails = returnData.data[0]
      this.courseId = this.applicationDetails.courseId
      switch (this.applicationDetails.applicationStatus) {
        case "payment-done":
          this.didPay = true;
          this.canPay = false;
          this.cantPayReason = "Payment already completed!"
          break;

        case "pre-application-applied":
          this.didPay = false;
          this.canPay = false;
          this.cantPayReason = "Your application is not yet verified!"
          break;

        case "pre-application-approved":
          this.didPay = false;
          this.canPay = true;
          break;

        case "rejected":
          this.didPay = false;
          this.canPay = false;
          this.cantPayReason = "Sorry! Your application is rejected."
          break;

        case "pre-application-returned":
          this.didPay = false;
          this.canPay = false;
          this.cantPayReason = "Sorry! Your application is returned for resubmission. Resubmit your application to continue admission proccess."

          break;

        default:
          break;
      }

      this.apiService.doGetRequest(endPoints.Get_courseFee + "" + this.courseId).subscribe((returnData1: any) => {
        console.log(returnData1)
        this.courseFeeDetails = returnData1.data
        this.totalFees = this.courseFeeDetails.otherFee + this.courseFeeDetails.nspotServiceCharge + this.courseFeeDetails.nspotTax + this.courseFeeDetails.nspotBankCharge
      }, error => {
        console.error(error);
      });
    }, error => {
      console.error(error);
    });
  }

  loadStudentDetails() {
    this.apiService.doGetRequest(endPoints.student + this.studentId).subscribe((returnData: any) => {
      console.log("student details", returnData)
      this.studentDetails = returnData.data
    }, error => {
      console.error(error);
    });
  }


  /**
 * Initializing the payment
 */
  placeOrder() {
    const productObj = {
      applicationId: this.applicationId,
      courseId: this.courseId,
      studentId: this.studentId
    }
    console.log(productObj)
    this.apiService.doPostRequest(endPoints.Create_courseFeeOrder, productObj).subscribe((returnData: any) => {
      this.createdOrder = returnData.data

      const that = this;
      var options = {
        "key": environment.RAZORPAY_KEY_ID,
        "name": "Nspot",
        "description": "Course fee for: " + this.courseFeeDetails.Institute_Course.AccademicLevel_Course.title,
        "order_id": this.createdOrder.razorpayOrder_id,
        "handler": function (response) {
          console.log(response)
          that.paymentSuccess(response)
        },
        "prefill": {
          "name": that.studentDetails.firstName + " " + this.studentDetails.middleName + " " + this.studentDetails.lastName,
          "email": this.studentDetails.email,
          "contact": ""
        },
        "notes": {
          "address": "NSPOT CONSULTANCY SERVICES PRIVATE LIMITED 39/2475-B1, Suite#118 LR Towers, SJRRA 104, S Janatha Rd, Palarivattom, Kochi, Kerala 682025"
        },
        "theme": {
          "color": "#f8ad25"
        }
      };

      var rzp1 = new Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        that.paymentFailed(response)
      });

      rzp1.open();

    }, error => {
      console.error(error);

    });
  }

  paymentSuccess(successRespose) {
    const orderObj = {
      razorpay_payment_id: successRespose.razorpay_payment_id,
      razorpay_signature: successRespose.razorpay_signature,
      paymentsCourseFeeId: this.createdOrder.id,
      applicationId: this.applicationId
    }
    this.apiService.doPostRequest(endPoints.Confirm_courseFeeOrder, orderObj).subscribe((returnData: any) => {
      this.router.navigate(['/student/profile']);
    })
  }
  paymentFailed(failedRespose) {
    console.log(failedRespose)
    const orderObj = {
      paymentsCourseFeeId: this.createdOrder.id,
      reason: failedRespose.reason
    }
    this.apiService.doPostRequest(endPoints.Cancel_courseFeeOrder, orderObj).subscribe((returnData: any) => {
      alert("Order failed")
    })
  }


}

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
  options:any;
  courseFeeDetails;
  studentDetails
  totalFees;
  courseId
  applicationId;
  applicationDetails;
  studentId = this.authService.userProfile.userId;
  coursename;

  createdOrder
  canPay: boolean;
  cantPayReason = "";
  didPay: boolean;
  paymentcoursefeeid;
  rzp1: any;
  amounttopaied: any;
  razxorpayorderid;
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
    console.log(this.applicationId);
    this.route.paramMap.subscribe(res =>{
      console.log(res['params'].applicationId);
      
    })
    this.loadCourseFee();
  
  }

  loadCourseFee() {
    this.apiService.doGetRequest(endPoints.Get_applicationForm + "?where[id]=" + this.applicationId).subscribe((returnData: any) => {
      console.log(returnData)
      this.coursename = returnData.data[0].CourseName;
      this.applicationDetails = returnData.data[0]
      this.courseId = this.applicationDetails['item'].Institute_Course.id;

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
          this.loadStudentDetails();
        this.createcoursefeeorder();
      }, error => {
        console.error(error);
      });
    },
     error => {
      console.error(error);
    });
  }

  loadStudentDetails() {
    this.apiService.doGetRequest(endPoints.student + this.studentId).subscribe((returnData: any) => {
     
      this.studentDetails = returnData.data
      console.log("student details", this.studentDetails)
    

    }, error => {
      console.error(error);
    });
  }
  createcoursefeeorder()
  {
    console.log("course fee",this.courseId);
    console.log("studnet details",this.studentDetails?.id);
    
  let req ={
    
    "applicationId":this.applicationId,
    "courseId":this.courseId,
    "studentId":JSON.parse(localStorage.getItem("USERID"))
  }
  this.apiService.doPostRequest('payment/courseFee/create',req).subscribe(
    data =>{
      console.log(data);
      let response = data['data']
      this.razxorpayorderid=response.razorpayOrder_id;
      this.paymentcoursefeeid = response.id
      this.coursfeedetailsaftercreate(response.razorpayOrder_id)
    },
    error =>{
      console.log(error);
    }
  )
  }

  coursfeedetailsaftercreate(razorpayOrder_id)
  {
    let req = {
      "orderId":razorpayOrder_id
    }
    this.apiService.doPostRequest('payment/courseFee/order',req).subscribe(
      data =>{
      this.amounttopaied = data['order'].amount;
      console.log( this.amounttopaied);
      
      },
      error =>{

      }
    )
  }
  /**
 * Initializing the payment
 */
  // placeOrder() {
  //   const productObj = {
  //     applicationId: this.applicationId,
  //     courseId: this.courseId,
  //     studentId: this.studentId
  //   }
  //   console.log(productObj)
  //   this.apiService.doPostRequest(endPoints.Create_courseFeeOrder, productObj).subscribe((returnData: any) => {
  //     this.createdOrder = returnData.data

  //     const that = this;
  //     var options = {
  //       "key": environment.RAZORPAY_KEY_ID,
  //       "name": "Nspot",
  //       "description": "Course fee for: " + this.courseFeeDetails.Institute_Course.AccademicLevel_Course.title,
  //       "order_id": this.createdOrder.razorpayOrder_id,
  //       "handler": function (response) {
  //         console.log(response)
  //         that.paymentSuccess(response)
  //       },
  //       "prefill": {
  //         "name": that.studentDetails.firstName + " " + this.studentDetails.middleName + " " + this.studentDetails.lastName,
  //         "email": this.studentDetails.email,
  //         "contact": ""
  //       },
  //       "notes": {
  //         "address": "NSPOT CONSULTANCY SERVICES PRIVATE LIMITED 39/2475-B1, Suite#118 LR Towers, SJRRA 104, S Janatha Rd, Palarivattom, Kochi, Kerala 682025"
  //       },
  //       "theme": {
  //         "color": "#f8ad25"
  //       }
  //     };

  //     var rzp1 = new Razorpay(options);
  //     rzp1.on('payment.failed', function (response) {
  //       that.paymentFailed(response)
  //     });

  //     rzp1.open();

  //   }, error => {
  //     console.error(error);

  //   });
  // }



  

  paymentSuccess(successRespose) {
    console.log(successRespose);
    
    const orderObj = {
      razorpay_payment_id: successRespose.razorpay_payment_id,
      razorpay_signature: successRespose.razorpay_signature,
      paymentsCourseFeeId: this.paymentcoursefeeid,
      applicationId: this.applicationId
    }
    console.log(orderObj);
    this.apiService.doPostRequest(endPoints.Confirm_courseFeeOrder, orderObj).subscribe((returnData: any) => {
      this.router.navigate(['/student/explore-courses']);
    })
  }
  paymentFailed(failedRespose) {
    console.log(failedRespose)
    const orderObj = {
      paymentsCourseFeeId: this.paymentcoursefeeid,
      reason: failedRespose.reason
    }
    this.apiService.doPostRequest(endPoints.Cancel_courseFeeOrder, orderObj).subscribe((returnData: any) => {
      alert("Order failed")
    })
  }
  pay()
  {
  //  var options = {
  //     "key": "rzp_test_g8vPt9nJiYuDMj",
  //     "description": "Course fee for: " + this.courseFeeDetails.Institute_Course.AccademicLevel_Course.title,
      
  //     "amount":parseInt(totalfeeAmount),
  //     "name": "NSPOT",
  //     "prefill": {
  //       "name": this.studentDetails.firstName + " " + this.studentDetails.middleName + " " + this.studentDetails.lastName,
  //       "email": this.studentDetails.email,
  //       "contact": ""
  //     },
  //     "notes": {
  //       "address": "NSPOT CONSULTANCY SERVICES PRIVATE LIMITED 39/2475-B1, Suite#118 LR Towers, SJRRA 104, S Janatha Rd, Palarivattom, Kochi, Kerala 682025"
  //     },
  //      "currency": "INR",
     
  //  };
  
      const that = this;
   var options = {
    "key": "rzp_test_J7wOs0sSPhfvXU",
    "description": "Course fee for: "+this.coursename,
    
    "amount":this.amounttopaied * 100,
    "order_id": this.razxorpayorderid,
    "name": "NSPOT",
    "handler": function (response) {
              console.log(response)
              that.paymentSuccess(response)
     },
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": "NSPOT CONSULTANCY SERVICES PRIVATE LIMITED 39/2475-B1, Suite#118 LR Towers, SJRRA 104, S Janatha Rd, Palarivattom, Kochi, Kerala 682025"
    },
     "currency": "INR",
 };

    console.log(options);
   
    this.rzp1 = new window.Razorpay(options);
    this.rzp1.open();
    this.rzp1.on('payment.failed', function (response){
      console.log(response);
      this.paymentFailed(response)
           
    });
    // this.rzp1.on('payment.success', function (response){
    //   console.log(response);
    //   this.paymentSuccess(response)
           
    // });
      var rzp1 = new Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        that.paymentFailed(response)
      });
  }

}

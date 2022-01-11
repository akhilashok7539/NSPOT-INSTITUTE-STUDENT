import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { endPoints } from '../../config/endPoints';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { scrollnotes } from 'src/app/config/constants';
declare var  Razorpay:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rzp1:any;
  activeButton = 7;
  scrollnotes = scrollnotes;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
    
  ) { }

  studentId = this.authService.userProfile.userId;
  NewUserID;
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
 acceptedApplicationData:any=[];
  ngOnInit(): void {
    // fetching student details
    this.apiService.doGetRequest(endPoints.student + this.studentId).subscribe((returnData: any) => {
      console.log(returnData)
      this.studentDetails = returnData.data;
      localStorage.setItem("USERID",this.studentDetails.id)
      this.NewUserID = this.studentDetails.id;
    
      localStorage.setItem("isNri",this.studentDetails.isNRI);
      
      localStorage.setItem("isFilledByFather",this.studentDetails.isFilledByFather);
      localStorage.setItem("isFilledByGaurdian",this.studentDetails.isFilledByGaurdian);
      localStorage.setItem("isFilledByMyself",this.studentDetails.isFilledByMyself);
      sessionStorage.removeItem("formfields")

  this.loadafterfirstapi()

    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch student details')
    });

    
  }
  getinstituteName(s)
  {
  //  console.log(s.item.Institute_Course.Institute.name);
   return s.item.Institute_Course.Institute.name
  }
  onProfileChange(event)
  {
    let multiForm: FormData = new FormData();

    const file = event.target.files[0];
    multiForm.append("id",this.studentDetails.id)
    multiForm.append("profilePicture",file)
    this.apiService.doPostRequest_upload("student/update",multiForm).subscribe(
      data =>{
        this.ngOnInit()
      },
      error =>{
        
      }
    )

  }
  loadafterfirstapi()
  {
    
    // fetching education details of the student
    this.apiService.doGetRequest(endPoints.Get_studentEducations + this.NewUserID).subscribe((returnData: any) => {
      this.educations = returnData.data;
    }, error => {
      console.error(error);
      this.toastr.warning('Failed to fetch education details');
    });

    // fetching certificates
    this.apiService.doGetRequest(endPoints.Get_studentCertificates + this.NewUserID).subscribe((returnData: any) => {
      this.certificates = returnData.data;
      console.log(this.certificates)
    }, error => {
      console.error(error);
      this.toastr.warning('Failed to fetch certificate details')
    });

    // fetching entrance exams
    this.apiService.doGetRequest(endPoints.Get_studentEntranceExams + this.NewUserID).subscribe((returnData: any) => {
      this.entranceExams = returnData.data;
      console.log(this.entranceExams)
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch entrance exams details')
    });

    // fetching submitted applications
    this.apiService.doGetRequest(endPoints.Get_applicationForm
      + "?where[studentId]=" + this.NewUserID
      // + "&include[0]=Institute_Course"
      // + "&include[0][model]=Institute_Course"
      // + "&include[0][include][0]=AccademicLevel_Course"
    ).subscribe((returnData: any) => {
      this.allApplications = returnData.data;
      this.allApplications.map(element => {
        if (element.item.applicationStatus == "pre-application-approved")
          this.acceptedPreApplications.push(element)
        if (element.item.applicationStatus == "payment-done")
          this.acceptedApplications.push(element)
         
          
        if (element.item.applicationStatus == "rejected")
          this.rejectedApplications.push(element)
        if (element.item.applicationStatus == "pre-application-returned")
          this.resubmitApplications.push(element)
      })
      console.log("completed applciatants:",this.acceptedApplications);
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
  onImgError(event) { 
    event.target.src = 'https://stockpictures.io/wp-content/uploads/2020/01/image-not-found-big-768x432.png';
}
  showPhase(event){
    this.activeButton = event;
    if(this.activeButton === 5)
    {
      this.apiService.doGetRequest("payment/courseFee/student/"+this.NewUserID).subscribe(
        data =>{
          this.acceptedApplicationData = data['result'];
          console.log(this.acceptedApplicationData);
          
        },
        error =>{

        }
      )
    }
  }
  getaddmisonletter(s)
  {
    console.log(s);
    this.router.navigate(['/student/view-receipt/'+s])
  }
  getcourseName(s)
  {
    console.log(s);
    if(s.Course_Sub_Categories5 === null)
    {
      if(s.Course_Sub_Categories4 === null)
      {
        if(s.Course_Sub_Categories3 === null)
        {
          if(s.Course_Sub_Categories2 === null)
          {

          }
          else{
          return s.Course_Sub_Categories2['title']
          }
        }
        else{
          
          return s.Course_Sub_Categories3['title']
        }
      }
      else{
        return s.Course_Sub_Categories4['title']
      }
    }
    else{
      return s.Course_Sub_Categories5['title']
    }
  }
  download(s)
  {
    if(s != null)
    {
      window.open("https://www.api.nspotadmissions.com/"+s,"_blank")

    }
    else{
      this.toastr.error("Receipt Not uploaded")
    }
  }
}

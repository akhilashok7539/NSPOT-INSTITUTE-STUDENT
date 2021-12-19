import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { scrollnotes } from 'src/app/config/constants';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  studentId;
  listpayments= [];
  paymenthistory=[];
  scrollNotes = scrollnotes;
  constructor(private apiservice:ApiService,private authService:AuthService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.studentId= localStorage.getItem("USERID");
    this.loaddata();
  }

  loaddata()
  {
    this.apiservice.doGetRequest('payment/courseFee/student/'+this.studentId).subscribe(
      data =>{
        console.log(data);
        this.listpayments = data['result']
        for(let i=0;i<this.listpayments.length;i++)
        {
          if(this.listpayments[i]['item']['status'] === "paid")
          {
            this.paymenthistory.push(this.listpayments[i])
          }
        }
        console.log(this.paymenthistory);
        
      },
      error =>{

      }
    )
  }
  download(s)
  {
    if(s != null)
    {
      window.open("https://nspot-qa.herokuapp.com/"+s,"_blank")

    }
    else{
      this.toaster.error("Receipt Not uploaded")
    }
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



}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
      window.open("https://nspot-server.herokuapp.com/"+s,"_blank")

    }
    else{
      this.toaster.error("Receipt Not uploaded")
    }
  }
  
}

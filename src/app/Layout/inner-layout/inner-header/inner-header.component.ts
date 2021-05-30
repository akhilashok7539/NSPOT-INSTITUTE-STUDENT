import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { endPoints } from 'src/app/config/endPoints';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inner-header',
  templateUrl: './inner-header.component.html',
  styleUrls: ['./inner-header.component.css']
})
export class InnerHeaderComponent implements OnInit {
  userId = this.authService.userProfile.userId;
  notifications;
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const that = this;
    // this.checkForNotification()
    // setInterval(function () {
    //   that.checkForNotification();

    // }, 10000)
  
  }

  checkForNotification() {
    this.apiService.doGetRequest(
      endPoints.Get_notifications + "?where[userId]=" + this.userId + "&order[0][0]=createdAt"
    ).subscribe((returnData: any) => {
      this.notifications = returnData.data
      console.log(this.notifications)
    });
  }

  /**
   * changing notification status
   */
  changeStatus(id, status) {
    if (status == "new") {
      const newObj = { id: id, status: "viewed" }
      console.log(newObj)
      this.apiService.doPostRequest(endPoints.Update_notifications, newObj).subscribe(returnData => {
        console.log("update obj", returnData)
      })
    }
  }
  logout(): void {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }
}

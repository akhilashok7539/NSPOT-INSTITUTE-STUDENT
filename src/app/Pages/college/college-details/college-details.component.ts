import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { endPoints } from '../../../config/endPoints';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-college-details',
  templateUrl: './college-details.component.html',
  styleUrls: ['./college-details.component.css']
})
export class CollegeDetailsComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  instituteId = parseInt(this.route.snapshot.paramMap.get('instituteId'));
  instituteInfo;
  boardOfCouncilInfo;
  highlights;
  socialLinks;
  coursesOffered;
  gallery;
  instIdForCourse;
  baseApiUrl = environment.baseApiUrl;
  currentUrl;
  ngOnInit(): void {
    // fetching institute details
    this.apiService.doGetRequest(endPoints.GetInstituteInfo + this.instituteId + "?filter[include]=LicenceIssueAuthority").subscribe((returnData: any) => {
      console.log("Institute Info",returnData)
      this.instituteInfo = returnData.data;
      console.log(this.instituteInfo);
      this.instIdForCourse = this.instituteInfo.id;
      this.loadGalleryandCourse(this.instIdForCourse)
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch institute details')
    });
    this.currentUrl=window.location.origin + this.router.url;
   

    // fetching boardof council details
    this.apiService.doGetRequest(endPoints.Get_boardOfCouncil + this.instituteId).subscribe((returnData: any) => {
      this.boardOfCouncilInfo = returnData.data;
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch institute details');
    });

    // fetching highlights
    this.apiService.doGetRequest(endPoints.Get_highlights + this.instituteId).subscribe((returnData: any) => {
      this.highlights = returnData.data;
      console.log("highligts", this.highlights)
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch institute details')
    });

    // fetching social links
    this.apiService.doGetRequest(endPoints.Get_socialMedia + this.instituteId).subscribe((returnData: any) => {
      this.socialLinks = returnData.data;
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch institute details')
    });

    
  }


  loadGalleryandCourse(instIdForCourse)
  {
// fetching coureses offered by the college
    // const instidforcourse = this.instituteInfo['id'];
    this.apiService.doGetRequest(
      `/institute/courses/` + instIdForCourse).subscribe((returnData: any) => {
        this.coursesOffered = returnData.data;
        console.log("courses", this.coursesOffered)
      }, error => {
        console.error(error);
        this.toastr.error('Failed to fetch institute details')
      });
  
      // fetching gallery
      this.apiService.doGetRequest(endPoints.Get_gallery + instIdForCourse).subscribe((returnData: any) => {
        this.gallery = returnData.data;
      }, error => {
        console.error(error);
        this.toastr.error('Failed to fetch institute details')
      });
  }

  applycourse(item)
  {
    sessionStorage.setItem("coursename",JSON.stringify(item))
    this.router.navigate(['/student/course/apply/'+item.item.id])

  }
  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success("Link Copied")
  }
}

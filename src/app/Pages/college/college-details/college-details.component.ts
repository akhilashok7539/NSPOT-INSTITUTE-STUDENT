import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { endPoints } from '../../../config/endPoints';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-college-details',
  templateUrl: './college-details.component.html',
  styleUrls: ['./college-details.component.css']
})
export class CollegeDetailsComponent implements OnInit {
  @ViewChild('modal', {static: false}) modal: ModalComponent;
  classRoomVideoLink;
  activeButton = 1;
  hostelTourVideoLink;
  labTourVideoLink;
  recreationAreaTourVideoLink;
  libraryTourVideoLink;
  currentdate;
  addmisonstarts;
  admmisonclosed =false;
  admisionstarts = false;
  admisionnotstarts=false;
  travelinformations;
  baseurl= environment.baseApiUrl;
  infrascutreData :any =[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private domsantizer: DomSanitizer,
    private toastr: ToastrService
  ) { }

  instituteId = parseInt(this.route.snapshot.paramMap.get('instituteId'));
  instituteInfo;
  boardOfCouncilInfo;
  highlights;
  socialLinks;
  coursesOffered;
  virtualtourlinks;
  gallery;
  instIdForCourse;
  baseApiUrl = environment.baseApiUrl;
  currentUrl;
  campusTourVideoLink;
  viewShare = false;
  ngOnInit(): void {


    // fetching institute details
    this.apiService.doGetRequest(endPoints.GetInstituteInfo + this.instituteId + "?filter[include]=LicenceIssueAuthority").subscribe((returnData: any) => {
      console.log("Institute Info", returnData)
      this.instituteInfo = returnData.data;
      console.log(this.instituteInfo);
      this.instIdForCourse = this.instituteInfo.id;
      this.loadGalleryandCourse(this.instIdForCourse)
      this.loaddata();
      this.getinfrastucturedata(this.instituteInfo['id'])
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch institute details')
    });
    // this.currentUrl = window.location.origin + this.router.url;
    this.currentUrl = window.location.href;

    console.log(this.currentUrl);
    console.log("current", window.location.href);
 

  }
  onImageError(event)
  {
event.target.src = "https://unsplash.it/300/300/?random&pic=1(14 kB)";
  }
  getSanitizedURL() {
    return this.domsantizer.bypassSecurityTrustUrl(this.campusTourVideoLink);

  }
  loaddata(){

    // fetching boardof council details
    this.apiService.doGetRequest(endPoints.Get_boardOfCouncil + this.instIdForCourse).subscribe((returnData: any) => {
      this.boardOfCouncilInfo = returnData.data;
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch institute details');
    });

    // fetching highlights
    this.apiService.doGetRequest(endPoints.Get_highlights + this.instIdForCourse).subscribe((returnData: any) => {
      this.highlights = returnData.data;
      console.log("highligts", this.highlights)
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch institute details')
    });

    // fetching social links
    this.apiService.doGetRequest(endPoints.Get_socialMedia + this.instIdForCourse).subscribe((returnData: any) => {
      this.socialLinks = returnData.data;
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch institute details')
    });

    this.apiService.doGetRequest('instituteTravelInfo/byInstituteId/' + this.instIdForCourse).subscribe(returnData => {
      console.log(returnData);
      
      this.travelinformations = returnData['data'][0];
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch institute details')
    });

    // virtualtour links

    this.apiService.doGetRequest(`institute/virtual-tour/` + this.instIdForCourse).subscribe((returnData: any) => {
      this.virtualtourlinks = returnData.data;
      //  campusTourVideoLink
      let data = this.virtualtourlinks['campusTourVideoLink'].split('/');
      console.log(data[3].split('=')[1]);
      this.campusTourVideoLink = data[3].split('=')[1];
      this.campusTourVideoLink = "https://www.youtube.com/embed/" + this.campusTourVideoLink;
      console.log(this.campusTourVideoLink);
      this.campusTourVideoLink = this.domsantizer.bypassSecurityTrustResourceUrl(this.campusTourVideoLink);
      // classRoomVideoLink
      let d = this.virtualtourlinks['campusTourVideoLink'].split('/');
      this.classRoomVideoLink = d[3].split('=')[1];
      this.classRoomVideoLink = "https://www.youtube.com/embed/" + this.classRoomVideoLink;
      console.log(this.classRoomVideoLink);
      this.classRoomVideoLink = this.domsantizer.bypassSecurityTrustResourceUrl(this.classRoomVideoLink);
      // hostelTourVideoLink
      let s = this.virtualtourlinks['campusTourVideoLink'].split('/');
      this.hostelTourVideoLink = s[3].split('=')[1];
      this.hostelTourVideoLink = "https://www.youtube.com/embed/" + this.hostelTourVideoLink;
      console.log(this.hostelTourVideoLink);
      this.hostelTourVideoLink = this.domsantizer.bypassSecurityTrustResourceUrl(this.hostelTourVideoLink);
      // labTourVideoLink
      let ss = this.virtualtourlinks['campusTourVideoLink'].split('/');
      this.labTourVideoLink = ss[3].split('=')[1];
      this.labTourVideoLink = "https://www.youtube.com/embed/" + this.labTourVideoLink;
      console.log(this.labTourVideoLink);
      this.labTourVideoLink = this.domsantizer.bypassSecurityTrustResourceUrl(this.labTourVideoLink);
      // recreationAreaTourVideoLink
      let ss2 = this.virtualtourlinks['campusTourVideoLink'].split('/');
      this.recreationAreaTourVideoLink = ss2[3].split('=')[1];
      this.recreationAreaTourVideoLink = "https://www.youtube.com/embed/" + this.recreationAreaTourVideoLink;
      console.log(this.recreationAreaTourVideoLink);
      this.recreationAreaTourVideoLink = this.domsantizer.bypassSecurityTrustResourceUrl(this.recreationAreaTourVideoLink);
      //ibraryTourVideoLink
      let ss2s = this.virtualtourlinks['campusTourVideoLink'].split('/');
      this.libraryTourVideoLink = ss2s[3].split('=')[1];
      this.libraryTourVideoLink = "https://www.youtube.com/embed/" + this.libraryTourVideoLink;
      console.log(this.libraryTourVideoLink);
      this.libraryTourVideoLink = this.domsantizer.bypassSecurityTrustResourceUrl(this.libraryTourVideoLink);
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch institute details')
    });


  }

  loadGalleryandCourse(instIdForCourse) {
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

  applycourse(item) {
   

      sessionStorage.setItem("coursename", JSON.stringify(item))
      this.router.navigate(['/student/course/apply/' + item.item.id])

   

  }
  close()
  {
    this.viewShare = false;

  }
  copyMessage(val: string) {
    this.viewShare = true;
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
    // this.toastr.success("Link Copied")
    this.modal.open();
  }
  getaddmisonsnstartcount(item)
  {
    console.log(item);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let s = mm + '/' + dd + '/' + yyyy;
    this.currentdate = mm + '-' + dd + '-' + yyyy;
    var cuuretdate = new Date(mm + '/' + dd + '/' + yyyy)
    var date1 = new Date(item['admissionStartDate']);
    var Difference_In_Time = cuuretdate.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
   
    // this.addmisionstartdateCount2 = Math.round(Difference_In_Days);
    // console.log("1th arrays",this.addmisionstartdateCount2);
    // let d1 = item['admissionStartDate']
    // console.log(new Date(d1));

    // d1 = d1.split("T");
    // d1 = d1[0];
    // d1 = d1.split("-");
  

    // let d2 = item['admissionCloseDate']
    // d2 = d2.split("T")
    // console.log(d2);
    // d2 = d2[0]
    // d2 = d2.split("-");

    // let c = this.currentdate.split("-");

    // var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  
    // var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    // var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);
    
    let d1 = item['admissionStartDate']
    d1 = new Date(d1);
    let d2 = item['admissionCloseDate']
    d2 = new Date(d2);
    var check = new Date(this.currentdate);
    console.log(d1);
    console.log(d2);
    console.log(check);
    console.log( check.valueOf()- d1.valueOf());
    let count = check.valueOf() - d1.valueOf();
    var diffDays = Math.ceil(count / (1000 * 3600 * 24)); 
    // console.log(diffDays);

    if(check > d1 && check < d2)
    {
    
      console.log("Addmission starts from "+d1 + "to"+d2 );
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      let s = mm + '/' + dd + '/' + yyyy;
      var cuuretdate = new Date(mm + '/' + dd + '/' + yyyy)
      var date1 = new Date(item['admissionCloseDate']);
      var Difference_In_Time = cuuretdate.getTime() - date1.getTime();
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      if(Difference_In_Days >0)
      {
        this.addmisonstarts = "Opened"
      }
      else
      {
        this.addmisonstarts = "Opened"
      }
      

      return this.addmisonstarts;

    }
    else
    {
      console.log("Admission not started yet or admission closed" );
      if(check<d1)
      {

        if(Difference_In_Days >0)
        {
        this.addmisonstarts = "Not Started"
        }
        else
        {
        this.addmisonstarts = "Not Started"
        }
       
        return this.addmisonstarts;
      }
      else
      {
        console.log("addmison closed");
      
        return this.addmisonstarts = "Closed";
        
      } 
    } 
  }
  selecttab(index)
  {
    this.activeButton = index;
  }
  downloadrules(data)
  {
    console.log(data);
    
    if(data === "rule")
    {
      window.open("https://www.api.nspotadmissions.com/"+this.highlights.rulesFile)

    }
    if(data === "uniform")
    {
      window.open("https://www.api.nspotadmissions.com/"+this.highlights.uniformFile)

    }
    if(data === "placement")
    {
      window.open("https://www.api.nspotadmissions.com/"+this.highlights.placementInfoFile)

    }
    if(data === "scholarship")
    {
      window.open("https://www.api.nspotadmissions.com/"+this.highlights.financialAidFile)

    }
    if(data === "refund")
    {
      window.open("https://www.api.nspotadmissions.com/"+this.highlights.specialFeaturesFile)

    }
  }
  getinfrastucturedata(id)
  {
    this.apiService.doGetRequest(`instituteInfraStructure/byInstituteId/`+id).subscribe(
      data =>{
        console.log("infracscturedata",data);
        this.infrascutreData = data['data'][0]
      },
      error =>{

      }
    )
  }
}

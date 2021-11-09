import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { endPoints } from '../../../config/endPoints';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-browse-colleges',
  templateUrl: './browse-colleges.component.html',
  styleUrls: ['./browse-colleges.component.css']
})
export class BrowseCollegesComponent implements OnInit {
  active_index = 2;
  paginationCount = 1;
  district = "";
  searchText;
  notificationonstatus = false;
  selectedchipsvalues = [];
  currentdate;
  addmisonstarts;
  accademicLevels1;
  accademicLevels2;
  accademicLevels3;
  accademicLevels4;
  accademicLevels5;
  accademicLevels6;
  instutesname: any = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }
  stateId;
  form: FormGroup;
  touched = false;
  studentId = localStorage.getItem("USERID");;
  username = this.authService.userProfile.username;
  studentDetails;
  accademicLevels;
  accademicLevelsCourses;
  courseStreams;
  courseStreamsSpecializations;
  courseTypes;
  universityTypes;
  courses
  courseStreamsSpecializations3;
  courseStreamsSpecializations4;
  // baseApiUrl = environment.baseApiUrl;
  baseApiUrl = environment.baseApiUrl;
  // classifications=['Co-Ed','Boys','Girls']
  classifications = [{
    "name": "Co-Edu",
    "status": true
  }, {
    "name": "Boys",
    "status": true
  },
  {
    "name": "Girls",
    "status": true

  }
  ]
  facilites = ['AC Classrooms', 'Swimming Pool', 'Day Boarding', 'Transportation', 'Outdoor Play Area']

  districtList=[];
  stateList = [];
  filteredList1;
  ngOnInit(): void {
    // fetching student details
    this.apiService.doGetRequest(endPoints.student + this.studentId).subscribe((returnData: any) => {
      console.log(returnData)
      this.studentDetails = returnData.data;
    }, error => {
      console.error(error);
      this.toastr.error('Failed to fetch student details')
    });
    this.loadData();

    this.form = this.formBuilder.group({
      CourseCategoryId: [''],
      CourseSubCategoryId: [''],
      // courseTypeId: [''],
      CourseSubCategory2Id: [''],
      CourseSubCategory3Id: [''],
      CourseSubCategory4Id: [''],
      CourseSubCategory5Id: [''],
      districtId: [''],
      stateId: ['']
    });
    this.filteredList1 = this.stateList.slice();
    console.log(window.location.origin + this.router.url);
  }

  loadData(): void {
    this.apiService.doGetRequest(`/course-categories`).subscribe((returnData: any) => {
      this.accademicLevels = returnData.data;
      console.log("accademic levels ", this.accademicLevels);
    });
    this.apiService.doGetRequest(endPoints.Get_courseTypes).subscribe((returnData: any) => {
      this.courseTypes = returnData.data;
      console.log("course types ", this.courseTypes);
    });
    this.apiService.doGetRequest(endPoints.Get_universityTypes).subscribe((returnData: any) => {
      this.universityTypes = returnData.data;
      console.log("university types", this.universityTypes);
    });
    this.apiService.doGetRequest(endPoints.Get_courseStream).subscribe((returnData: any) => {
      this.courseStreams = returnData.data;
      console.log("courseStreams ", this.courseStreams);
    });
    this.apiService.doGetRequest(`state/`).subscribe((returnData: any) => {
      this.stateList = returnData.data;
      let req = {
        createdAt: "2021-07-09T06:10:38.752Z",
        id: 0,
        state: "All",
        updatedAt: "2021-07-09T06:10:38.752Z"
      }
      // this.stateList.push(req)
      // var suits = ["hearts", "clubs", "Brooks Brothers", "diamonds", "spades"];

      // this.stateList.splice(0, 0, req);
      

      console.log(this.stateList);
    });
  }

  loadAccademicLevelCourses(event): void {

    // const academicLevelId = event.target.value;
    const academicLevelId = event;

    this.apiService.doGetRequest(`course-categories/subcategory/` + academicLevelId).subscribe((returnData: any) => {
      this.accademicLevelsCourses = returnData.data;
      console.log(this.accademicLevelsCourses);
    });
  }

  loadCourseStreamSpecializations(event): void {
    const streamId = event.target.value;
    // alert(academicLevelId)
    this.apiService.doGetRequest(endPoints.Get_courseStream_specialization + streamId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations = returnData.data;
      console.log(this.courseStreamsSpecializations);
    });
  }
  loadAccademicLevelCoursessubcat(event): void {
    const subcategoryId = event;
    this.apiService.doGetRequest(`course-categories/subcategory2/` + subcategoryId).subscribe((returnData: any) => {
      this.courseStreams = returnData.data;
      console.log(this.accademicLevelsCourses);
    });
  }
  loadAccademicLevelCoursessubcat1(event): void {
    const subcategoryId = event;
    this.apiService.doGetRequest(`course-categories/subcategory3/` + subcategoryId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations = returnData.data;
      console.log(this.accademicLevelsCourses);
    });
  }
  loadAccademicLevelCoursessubcat2(event): void {
    const subcategoryId = event;
    this.apiService.doGetRequest(`course-categories/subcategory4/` + subcategoryId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations3 = returnData.data;
      console.log(this.accademicLevelsCourses);
    });
  }
  loadAccademicLevelCoursessubcat3(event): void {
    const subcategoryId = event;
    this.apiService.doGetRequest(`course-categories/subcategory5/` + subcategoryId).subscribe((returnData: any) => {
      this.courseStreamsSpecializations4 = returnData.data;
      console.log(this.accademicLevelsCourses);
    });
  }
  removeEmptyStringsData(obj) {
    const dataObj = { ...obj };
    Object.entries(dataObj).forEach(([key, val]) => val === "" && delete dataObj[key] && dataObj[key] !== []);
    let urlParams = new URLSearchParams();
    for (let key of Object.keys(dataObj)) {
      urlParams.set(key, dataObj[key])
    }
    return urlParams;
  }
  onSubmit() {
    this.touched = true;
    console.log(document.getElementsByClassName('ng-invalid'))
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;
    console.log(formData);
    for (var key in formData) {
      if (formData[key] === "") {
        delete formData[key];
      } else {
        // formData[Map[key]] = formData[key];
        // delete formData[key];
      }
    }

    console.log(formData);

    this.apiService.doPostRequest(
      endPoints.Get_course_filter, formData
    ).subscribe((returnData: any) => {
      if (returnData.status == true) {
        this.courses = returnData.result
        console.log(returnData)
        for (let i = 0; i < this.courses.length; i++) {
          this.instutesname.push(this.courses[i]?.item.Institute)

        }
        for (let list of this.instutesname) {
          map[Object.values(list).join('')] = list;
        }
        console.log('Using Map', Object.values(map));
        this.instutesname = Object.values(map)
      }
      else {
        this.toastr.error('Something went wrong!');
      }
    },
      error => {
        console.error(error);
        this.toastr.error('Something went wrong!');
      });
  }

  get f() { return this.form.controls; }
  Onselected(s) {
    this.active_index = s;
    this.courses = [];
  }
  next() {
    this.paginationCount++;

  }
  prev() {

    if (this.paginationCount === 1) {

    }
    else {
      this.paginationCount--;
    }
  }
  loaddistricts(event) {
    console.log(event);

  this.stateId = event;
  this.apiService.doGetRequest(`district/` + event).subscribe((returnData: any) => {
    this.districtList = returnData.data;
    let req = {
      createdAt: "2021-07-09T06:10:38.752Z",
      id: 0,
      state: "All",
      updatedAt: "2021-07-09T06:10:38.752Z"
    }
    this.districtList.push(req)
    console.log(this.districtList);
  });

   
  }
  searchByLocation() {
    let req = {
      "stateId": this.stateId,
      "districtId": this.district
    }
    this.apiService.doPostRequest(
      `institute/course/filter/location`, req
    ).subscribe((returnData: any) => {
      if (returnData.status == true) {
        this.courses = returnData.result
        console.log(this.courses)
      }
      else {
        this.toastr.error('Something went wrong!');
      }
    },
      error => {
        console.error(error);
        this.toastr.error('Something went wrong!');
      });
  }
  addtocompare(item) {
    console.log(item);
    let req = {
      "courseName": item.CourseName,
      "studentId": this.studentId,
      "instituteCourseId": item.item.id,
      "instituteId": item.item.Institute.id
    }
    console.log(req);
    this.apiService.doPostRequest(`CourseCompare/create`, req).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Course add to compare section")
      }
    )
  }
  toggleAccordian(event, index) {
    var element = event.target;
    element.classList.toggle("active");
    if (this.courses[index].isActive) {
      this.courses[index].isActive = false;
    } else {
      this.courses[index].isActive = true;
    }
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
  getaddmisonsnstartcount(item) {

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
    // console.log(d1);
    // console.log(d2);
    // console.log(check);
    // console.log( check.valueOf()- d1.valueOf());
    let count = check.valueOf() - d1.valueOf();
    var diffDays = Math.ceil(count / (1000 * 3600 * 24));
    // console.log(diffDays);

    if (check > d1 && check < d2) {
      // console.log("Addmission starts from "+d1 + "to"+d2 );
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      let s = mm + '/' + dd + '/' + yyyy;
      var cuuretdate = new Date(mm + '/' + dd + '/' + yyyy)
      var date1 = new Date(item['admissionCloseDate']);
      var Difference_In_Time = cuuretdate.getTime() - date1.getTime();
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      if (Difference_In_Days > 0) {
        this.addmisonstarts = "Admission Close " + Math.round(Difference_In_Days) + " Days Left"
      }
      else {
        this.addmisonstarts = "Admission Close " + Math.round(Difference_In_Days) * -1 + " Days Left"
      }


      return this.addmisonstarts;

    }
    else {
      // console.log("Admission not started yet or admission closed" );
      if (check < d1) {
        if (Difference_In_Days > 0) {
          this.addmisonstarts = "Admission Desk Opens in" + Math.round(Difference_In_Days) + " Days"
        }
        else {
          this.addmisonstarts = "Admission Desk Opens in" + Math.round(Difference_In_Days) * -1 + " Days"
        }

        return this.addmisonstarts;
      }
      else {
        // console.log("addmison closed");
        return this.addmisonstarts = "Admission Closed";

      }
    }



    // if (Math.round(Difference_In_Days) > 0) {
    //   this.addmisonstarts = "Admission Starts " + Math.round(Difference_In_Days) + " Days"
    // }
    // else {
    //   var today = new Date();
    //   var dd = String(today.getDate()).padStart(2, '0');
    //   var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    //   var yyyy = today.getFullYear();
    //   let s = mm + '/' + dd + '/' + yyyy;
    //   var cuuretdate = new Date(mm + '/' + dd + '/' + yyyy)
    //   var date1 = new Date(item['admissionCloseDate']);
    //   var Difference_In_Time = cuuretdate.getTime() - date1.getTime();
    //   var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    //   this.addmisonstarts = "Admission Close " + Math.round(Difference_In_Days) + " Days Left"
    // }
    // return this.addmisonstarts;
  }

  admionstatus(item) {
    // console.log(item);
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
    // console.log(d1);
    // console.log(d2);
    // console.log(check);
    // console.log( check.valueOf()- d1.valueOf());
    let count = check.valueOf() - d1.valueOf();
    var diffDays = Math.ceil(count / (1000 * 3600 * 24));
    // console.log(diffDays);

    if (check > d1 && check < d2) {

      // console.log("Addmission starts from "+d1 + "to"+d2 );
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      let s = mm + '/' + dd + '/' + yyyy;
      var cuuretdate = new Date(mm + '/' + dd + '/' + yyyy)
      var date1 = new Date(item['admissionCloseDate']);
      var Difference_In_Time = cuuretdate.getTime() - date1.getTime();
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      if (Difference_In_Days > 0) {
        this.addmisonstarts = "Opened"
      }
      else {
        this.addmisonstarts = "Opened"
      }


      return this.addmisonstarts;

    }
    else {
      // console.log("Admission not started yet or admission closed" );
      if (check < d1) {

        if (Difference_In_Days > 0) {
          this.addmisonstarts = "Not Started"
        }
        else {
          this.addmisonstarts = "Not Started"
        }

        return this.addmisonstarts;
      }
      else {
        // console.log("addmison closed");

        return this.addmisonstarts = "Closed";

      }
    }
  }
  applycourse(item) {


    sessionStorage.setItem("coursename", JSON.stringify(item))
    this.router.navigate(['/student/course/apply/' + item.item.id])



  }
  errorEvnt(event) {
    event.target.src = "./assets/images/inst.png";
  }
  selectedchips(s) {
    this.selectedchipsvalues.push(s)
    var unique = this.selectedchipsvalues.filter(function (elem, index, self) {
      console.log(elem);
      return index === self.indexOf(elem);
    })
    console.log(unique);
    let sorrteedarray = [];
    this.selectedchipsvalues = unique;
    // for(let i = 0 ;i<=this.selectedchipsvalues.length;i++)
    // {
    //   if(this.selectedchipsvalues[i].name === 'Boys')
    //   {
    //     for(let j =0; j<=this.courses.length;j++ )
    //     {
    //       if(this.courses[j]?.item?.maleAllowed === this.selectedchipsvalues[i].status){
    //         sorrteedarray.push(this.courses[j])
    //         console.log(sorrteedarray);
    //       }
    //     }
    //   }
    // }


  }
  clear() {
    this.selectedchipsvalues = [];
  }

  notificationOff() {
    this.notificationonstatus = false;
  }
  notificationon() {
    this.notificationonstatus = true;
  }
  selectinstitute(s) {
    console.log(s);
    let req = {
      name: s.name
    }
    this.selectedchipsvalues.push(req)
    var unique = this.selectedchipsvalues.filter(function (elem, index, self) {
      console.log(elem);

      return index === self.indexOf(elem);
    })
    console.log(unique);
    this.selectedchipsvalues = unique;


  }
  getselected(s) {

  }
  getcourseduration(s) {
    console.log("courseduration", s);
    console.log(s.split('s'));
    let char = s.split('s');
    return char[0] + "\xa0" + char[1] + "\xa0" + char[2] + "\xa0" + char[3]
    // if(char.length === 4)
    // {

    // }
    // else
    // {
    //   return char[0];
    // }
  }
  viewCourse(s)
  {
    sessionStorage.setItem("courseinfo",JSON.stringify(s))
    this.router.navigate(['/student/view-courses'])
  }
}

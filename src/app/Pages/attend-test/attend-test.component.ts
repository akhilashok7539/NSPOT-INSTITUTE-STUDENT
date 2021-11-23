import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-attend-test',
  templateUrl: './attend-test.component.html',
  styleUrls: ['./attend-test.component.css']
})
export class AttendTestComponent implements OnInit {
  display: any;
  studentId: any;
  date: any;
  questions: any = [
    // { "id": 6, "questionType": "1", "question": "Addmisison ___________?", "mark": 1, "createdAt": "2021-06-06T09:08:13.456Z", "updatedAt": "2021-06-06T09:08:13.456Z", "testId": 6, "Aptitude_Question_Options": [{ "id": 21, "option": "test", "isCorrectOption": true, "createdAt": "2021-06-06T09:08:13.465Z", "updatedAt": "2021-06-06T09:08:13.465Z", "questionId": 6 }, { "id": 22, "option": "sectuiib", "isCorrectOption": false, "createdAt": "2021-06-06T09:08:13.465Z", "updatedAt": "2021-06-06T09:08:13.465Z", "questionId": 6 }, { "id": 23, "option": "sd", "isCorrectOption": false, "createdAt": "2021-06-06T09:08:13.466Z", "updatedAt": "2021-06-06T09:08:13.466Z", "questionId": 6 }, { "id": 24, "option": "sd", "isCorrectOption": false, "createdAt": "2021-06-06T09:08:13.466Z", "updatedAt": "2021-06-06T09:08:13.466Z", "questionId": 6 }] }, { "id": 7, "questionType": "1", "question": "asdasdasd", "mark": 1, "createdAt": "2021-06-19T09:24:43.754Z", "updatedAt": "2021-06-19T09:24:43.754Z", "testId": 6, "Aptitude_Question_Options": [{ "id": 25, "option": "asd", "isCorrectOption": false, "createdAt": "2021-06-19T09:24:43.776Z", "updatedAt": "2021-06-19T09:24:43.776Z", "questionId": 7 }, { "id": 26, "option": "sad", "isCorrectOption": false, "createdAt": "2021-06-19T09:24:43.776Z", "updatedAt": "2021-06-19T09:24:43.776Z", "questionId": 7 }, { "id": 27, "option": "asd", "isCorrectOption": true, "createdAt": "2021-06-19T09:24:43.776Z", "updatedAt": "2021-06-19T09:24:43.776Z", "questionId": 7 }, { "id": 28, "option": "asd", "isCorrectOption": false, "createdAt": "2021-06-19T09:24:43.776Z", "updatedAt": "2021-06-19T09:24:43.776Z", "questionId": 7 }] }, { "id": 8, "questionType": "1", "question": "s", "mark": 1, "createdAt": "2021-06-19T09:26:13.339Z", "updatedAt": "2021-06-19T09:26:13.339Z", "testId": 6, "Aptitude_Question_Options": [{ "id": 29, "option": "dasa", "isCorrectOption": false, "createdAt": "2021-06-19T09:26:13.345Z", "updatedAt": "2021-06-19T09:26:13.345Z", "questionId": 8 }, { "id": 30, "option": "as", "isCorrectOption": false, "createdAt": "2021-06-19T09:26:13.345Z", "updatedAt": "2021-06-19T09:26:13.345Z", "questionId": 8 }, { "id": 31, "option": "da", "isCorrectOption": false, "createdAt": "2021-06-19T09:26:13.345Z", "updatedAt": "2021-06-19T09:26:13.345Z", "questionId": 8 }, { "id": 32, "option": "sdasdas", "isCorrectOption": true, "createdAt": "2021-06-19T09:26:13.345Z", "updatedAt": "2021-06-19T09:26:13.345Z", "questionId": 8 }] }, { "id": 9, "questionType": "1", "question": "s", "mark": 1, "createdAt": "2021-06-20T05:21:29.960Z", "updatedAt": "2021-06-20T05:21:29.960Z", "testId": 6, "Aptitude_Question_Options": [{ "id": 33, "option": "sda", "isCorrectOption": false, "createdAt": "2021-06-20T05:21:29.997Z", "updatedAt": "2021-06-20T05:21:29.997Z", "questionId": 9 }, { "id": 34, "option": "asd", "isCorrectOption": false, "createdAt": "2021-06-20T05:21:29.998Z", "updatedAt": "2021-06-20T05:21:29.998Z", "questionId": 9 }, { "id": 35, "option": "asd", "isCorrectOption": false, "createdAt": "2021-06-20T05:21:29.998Z", "updatedAt": "2021-06-20T05:21:29.998Z", "questionId": 9 }, { "id": 36, "option": "asd", "isCorrectOption": true, "createdAt": "2021-06-20T05:21:29.998Z", "updatedAt": "2021-06-20T05:21:29.998Z", "questionId": 9 }] }
  ]
  answers: any;
  form: FormGroup;
  arrayindex = 0;
  questionsarray: any = [];
  submmitedQuestion: any = [];
  questionwithanswers: any = [];
  totalmarks = 0;
  questionaraylength;
  questionId;
  submitButtonHide = false;
  verifyButtonHide = true;
  apptitudetestId;
  durationdetails:any=[];
  testduration:number;
  testname;
  aptitudetestreposne;
  constructor(private toaster: ToastrService, private authService: AuthService,
    private activaterouter:ActivatedRoute,private apiservice:ApiService,
    private router: Router, private fb: FormBuilder) {
        sessionStorage.removeItem("submittedanserss");
        this.activaterouter.paramMap.subscribe(params =>{
          console.log(params["params"].id);
          this.apptitudetestId = params["params"].id;

          
        })
     }

  ngOnInit(): void {
    this.date = new Date().toISOString();
    
    this.getapptudetestduration();
    // this.timer(60);
    this.form = this.fb.group({
      orders: ['', Validators.required]
    });
    this.getapptitudequestions();

    console.log(this.questions);
    // this.studentId = this.authService.userProfile.userId;
    this.studentId =  localStorage.getItem("USERID");

    
  }
  get f() { return this.form.controls; }
  checkedvalue(event, i) {
    // console.log(event,i);

  }
  getapptudetestduration()
  {
    this.apiservice.doGetRequest(`institute/aptitude-tests/questionsDuration/`+this.apptitudetestId).subscribe(
      data =>{
        this.durationdetails = data['data']; 
        this.testduration =this.durationdetails[0]['durationInMinuts'];
        console.log(this.testduration);
        this.timer(this.testduration);
      },
      error =>{

      }
    )
  }
  getapptitudequestions()
  {
    this.apiservice.doGetRequest(`institute/aptitude-tests/`+this.apptitudetestId+`/questions`).subscribe(
      data =>{
        this.questions = data['data'];
        this.questionaraylength = this.questions.length;
        this.getquestions();
      },
      error =>{
        
      }
    )
    
  }


  getquestions() {
    
    

    let updated = this.questions[this.arrayindex];
    console.log(updated);
    this.questionsarray.push(updated)
  }
  timer(minute) {
    // let minute = 1;
    console.log(minute);
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log("finished");
        clearInterval(timer);
        this.getfailureapicalls();
        this.toaster.success("Time Out 😀!Thanks for attending the Test.We will contact you shortly")
        this.router.navigate(['/student/profile']);
      }
    }, 1000);
  }
  submit() {
    console.log(this.arrayindex);
    console.log(this.questions.length);

  
    // console.log(this.form.value.orders);
    // console.log(this.questionsarray[0].id);
    // console.log(this.questionsarray[0].question);
    let req = {
      "choosedanswer": this.form.value.orders,
      "questionid": this.questionsarray[0].id,
      "questionname": this.questionsarray[0].question

    }
    this.submmitedQuestion.push(req);
    sessionStorage.setItem("submittedanserss", JSON.stringify(this.submmitedQuestion));
    this.questionsarray = [];
    // this.arrayindex = this.arrayindex+1;
    this.form.controls['orders'].setValue("");
    if (this.arrayindex == this.questions.length - 1) {
      this.toaster.success("questions completed");
      this.arrayindex = this.arrayindex;
      this.submitButtonHide = true;
      this.verifyButtonHide = false;

    }
    else {
      this.arrayindex = this.arrayindex + 1;

    }

    this.getquestions();
  }
  radioChecked(id, i) {
    this.questions.Aptitude_Question_Options.forEach(item => {
      if (item.id !== id) {
        item.selected = false;
      } else {
        item.selected = true;
      }
    })
  }
  verify() {

    this.questionwithanswers = JSON.parse(sessionStorage.getItem("submittedanserss"));
    this.questionwithanswers.forEach(element => {
      console.log(element.choosedanswer);
      let answer = element.choosedanswer;
      this.questions.forEach(element => {
        console.log(element.Aptitude_Question_Options);
        element.Aptitude_Question_Options.forEach(element => {
          if (answer == element.id) {
            if (element.isCorrectOption == true) {
              this.totalmarks = this.totalmarks + 1;
            }

          }
        });

      });
    });
    console.log(this.totalmarks);
    let req = {
      "studentId":this.studentId,
      "mark":this.totalmarks,
      "totalQuestions":this.questionaraylength,
      "questionId":this.apptitudetestId
   }
   this.apiservice.doPostRequest(`institute/aptitude-tests/answers`,req).subscribe(
     data =>{
      this.aptitudetestreposne = data['data'];
      this.mapIdtoapplicationFor(this.aptitudetestreposne['id'])
      this.toaster.success("Thanks for attending the Test.We will contact you shortly😀")
      this.router.navigate(['/student/profile']);
      
     },
     error=>{
       console.log(error);
        this.toaster.error("Unable to complete test!")
       
     }
   )
  }
  mapIdtoapplicationFor(id)
  {
    let req = {
      aptituteMarkId:id
    }
    this.apiservice.doPostRequest("applicationForm/applications/update",req).subscribe(
      data =>{
        
      },
      error =>{

      }
    )
  }
  getfailureapicalls()
  {
    let req = {
      "studentId":this.studentId,
      "mark":"0",
      "totalQuestions":this.questionaraylength,
      "questionId":this.apptitudetestId
   }
   this.apiservice.doPostRequest(`institute/aptitude-tests/answers`,req).subscribe(
    data =>{
      this.aptitudetestreposne = data['data'];
      this.mapIdtoapplicationFor(this.aptitudetestreposne['id'])
      this.toaster.success("Thanks for attending the Test.We will contact you shortly😀")
      this.router.navigate(['/student/profile']);
    },
    error=>{
      console.log(error);
      this.toaster.error("Unable to complete test!");
      
    }
  )
  }
}

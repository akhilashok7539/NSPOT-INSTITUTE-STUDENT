import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../../services/api.service';
import { UtilityService } from '../../../services/utility.service';
import { endPoints } from '../../../config/endPoints';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup4-four',
  templateUrl: './signup4-four.component.html',
  styleUrls: ['./signup4-four.component.css'],
})
export class Signup4FourComponent implements OnInit {
  studentId;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private utilities: UtilityService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  educationForm: FormGroup;
  entranceForm: FormGroup;
  accademicLevels;
  educations;
  entranceExams;

  educationTouched = false;
  entranceTouched = false;
  ngOnInit(): void {
    this.studentId = parseInt(this.route.snapshot.paramMap.get('studentId'));

    // this.form = this.formBuilder.group({
    //   id: [this.studentId],
    //   educations: this.formBuilder.array([
    //     this.formBuilder.group({
    //       educationLevelId: ['', Validators.required],
    //       schoolName: ['', Validators.required],
    //       specialization: ['', Validators.required],
    //       yearOfStudy: ['', Validators.required],
    //       startDate: ['', Validators.required],
    //       endDate: ['', Validators.required],
    //       certificateFile: ['', Validators.required],
    //       qualificationStatus: ['', Validators.required],
    //       cgpa: ['', Validators.required],
    //     })
    //   ]),
    //   entranceExams: this.formBuilder.array([
    //     this.formBuilder.group({
    //       qualifiedEntrance: ['', Validators.required],
    //       rollNumber: ['', Validators.required],
    //       yearOfQualification: ['', Validators.required],
    //       cgpa: ['', Validators.required],
    //       rank: ['', Validators.required],
    //     })
    //   ])

    // });

    this.educationForm = this.formBuilder.group({
      accademicLevelId: ['', [Validators.required]],
      schoolName: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      yearOfStudy: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      certificateFile: ['', [Validators.required]],
      qualificationStatus: ['', [Validators.required]],
      cgpa: ['', [Validators.required]],

    })

    this.entranceForm = this.formBuilder.group({
      qualifiedEntrance: ['', [Validators.required]],
      rollNumber: ['', [Validators.required]],
      yearOfQualification: ['', [Validators.required]],
      validUpto: ['', [Validators.required]],
      cgpa: ['', [Validators.required]],
      rank: ['', [Validators.required]],
    })
    this.loadEducationLevels();
    this.loadEducations();
    this.loadEntranceExams();

  }

  loadEducations(): void {
    this.educations = null;
    this.apiService.doGetRequest(
      endPoints.Get_studentEducations + this.studentId)
      .subscribe((returnData: any) => {
        this.educations = returnData.data;
        console.log(this.educations);
      });
  }

  loadEntranceExams(): void {
    this.entranceExams = null;
    this.apiService.doGetRequest(
      endPoints.Get_studentEntranceExams + this.studentId)
      .subscribe((returnData: any) => {
        this.entranceExams = returnData.data;
        console.log(this.entranceExams);
      });
  }

  loadEducationLevels(): void {
    this.apiService.doGetRequest(endPoints.Get_academicLevels).subscribe((returnData: any) => {
      this.accademicLevels = returnData.data;
      console.log(this.accademicLevels);
    });
  }

  /**
  * Common function for direct upload
  * @param event 
 */
  uploadFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      let multiForm: FormData = new FormData();

      if (file.size > 200000) {
        this.toastr.error("File size must be less than 200kB");
        multiForm.delete('file');
        this.f.certificateFile.setValue('');
        event.target.value = ""
      }
      else {
        multiForm.delete('file')
        multiForm.append('file', file, file.name);
      }

      this.apiService.doPostRequest_upload(
        endPoints.UploadFile, multiForm)
        .subscribe((returnData: any) => {
          console.log(returnData);
          if (returnData.status == true) {
            this.f.certificateFile.setValue(returnData.data.path)
          }
          else {
            this.f.certificateFile.setValue('');
          }
        }, error => {
          console.log(error)
        });
    }
  }

  // addEducation() {
  //   this.educations.push(
  //     this.formBuilder.group({
  //       educationLevelId: ['', Validators.required],
  //       schoolName: ['', Validators.required],
  //       specialization: ['', Validators.required],
  //       yearOfStudy: ['', Validators.required],
  //       startDate: ['', Validators.required],
  //       endDate: ['', Validators.required],
  //       certificateFile: ['', Validators.required],
  //       qualificationStatus: ['', Validators.required],
  //       cgpa: ['', Validators.required],
  //     })
  //   );
  // }

  /**
   * Submits the form if the form is valid
   */
  onSubmitEducation(): void {
    this.educationTouched = true;
    console.log(this.educationForm.invalid)
    if (this.educationForm.invalid) {
      return;
    } else {
      (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
    }
    const formData = this.educationForm.value;
    this.apiService.doPostRequest(endPoints.Get_studentEducations + endPoints.create + this.studentId, formData)
      .subscribe((returnData: any) => {
        if (returnData.status == true) {
          (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
          this.toastr.success('Education added');
          this.loadEducations();
        }
        else {
          (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
          this.toastr.error('Form submission failed.');
          this.loadEducations();
          (document.querySelector('#educationDiv') as HTMLInputElement).scrollIntoView();
          this.educationForm.reset();
        }
      },
        error => {
          console.error(error);
          this.toastr.error(error.error[0].message);
          (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
        });
  }


  onSubmitEntranceExam(): void {
    this.entranceTouched = true;
    console.log(this.entranceForm.invalid)
    if (this.entranceForm.invalid) {
      return;
    } else {
      (document.querySelector('#submit-btn-entrance') as HTMLInputElement).setAttribute('disabled', '');
    }
    const formData = this.entranceForm.value;
    this.apiService.doPostRequest(endPoints.Get_studentEntranceExams + endPoints.create + this.studentId, formData)
      .subscribe((returnData: any) => {
        if (returnData.status == true) {
          (document.querySelector('#submit-btn-entrance') as HTMLInputElement).removeAttribute('disabled');
          this.toastr.success('Entrance exam added');
          this.loadEntranceExams();
          (document.querySelector('#entranceDiv') as HTMLInputElement).scrollIntoView();
          this.entranceForm.reset();
        }
        else {
          (document.querySelector('#submit-btn-entrance') as HTMLInputElement).removeAttribute('disabled');
          this.toastr.error('Form submission failed.');
          this.loadEntranceExams();
        }
      },
        error => {
          console.error(error);
          this.toastr.error(error.error[0].message);
          (document.querySelector('#submit-btn-entrance') as HTMLInputElement).removeAttribute('disabled');
        });
  }

  get f() { return this.educationForm.controls; }
  get h() { return this.entranceForm.controls; }

  // getter function for education formarray
  // get educations() { return this.form.get('educations') as FormArray }
  // get entranceExams() { return this.form.get('entranceExams') as FormArray }
}

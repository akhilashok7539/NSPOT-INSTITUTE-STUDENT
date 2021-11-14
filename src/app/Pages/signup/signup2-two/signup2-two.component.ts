import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../../services/api.service';
import { UtilityService } from '../../../services/utility.service';
import { endPoints } from '../../../config/endPoints';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup2-two',
  templateUrl: './signup2-two.component.html',
  styleUrls: ['./signup2-two.component.css'],
})
export class Signup2TwoComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private utilities: UtilityService,
    private toastr: ToastrService
  ) { }

  form: FormGroup;
  touched = false;
  date = new Date();
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      adharNumber: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      ageByRegisteringDate: ['', [Validators.required, Validators.min(1)]],
      gender: ['', [Validators.required]],
      mothersFirstName: ['', [Validators.required]],
      mothersMiddleName: [''],
      mothersLastName: ['', [Validators.required]],
      mothersOccupation: ['', [Validators.required]],
      mothersEmail: [''],
      mothersPhoneNumber: [''],
      fathersFirstName: ['', [Validators.required]],
      fathersMiddleName: [''],
      fathersLastName: ['', [Validators.required]],
      fathersOccupation: ['', [Validators.required]],
      fathersEmail: [''],
      fathersPhoneNumber: [''],
      gaurdiansFirstName: ['', [Validators.required]],
      gaurdiansMiddleName: [''],
      gaurdiansLastName: ['', [Validators.required]],
      gaurdiansAddress: ['', [Validators.required]],
      gaurdiansEmail: ['', [Validators.required]],
      gaurdiansPhoneNumber: ['', [Validators.required]],
      isDifferentlyAbled: [''],
      religion: ['', [Validators.required]],
      cast: ['', [Validators.required]],
      // visibleMark1: [''],
      // visibleMark2: [''],
      citizenship:[''],
      isIndian: [false, [Validators.required]],
      isNRI: [false],
      isFilledByFather: [false],
      disabilityCertificateFile: [''],
      forginNationality: [''],
      isFilledByMyself:[false],
      isFilledByGaurdian:[false]

    });
    console.log(this.f.disabilityCertificateFile.validator)

    // handling validator for disability certificate
    this.form.get('isDifferentlyAbled').valueChanges
      .subscribe(value => {
        if (value) {
          this.form.get('disabilityCertificateFile').setValidators(Validators.required)
        } else {
          this.form.get('disabilityCertificateFile').clearValidators();
        }
      }
      );

    // handling validator for disability certificate
    this.form.get('isNRI').valueChanges
      .subscribe(value => {
        if (value) {
          this.form.get('forginNationality').setValidators(Validators.required)
        } else {
          this.form.get('forginNationality').clearValidators();
        }
      }
      );
  }

  /**
   * Submits the form if the form is valid
   */
  onSubmit(): void {
    // this.touched = true;
    // console.log(this.form.invalid)
    // console.log(document.getElementsByClassName('ng-invalid'))
    // if (this.form.invalid) {
    //   return;
    // } else {
    //   (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
    // }
    // const formData = this.form.value;
    // this.apiService.doPostRequest(endPoints.student + endPoints.create, formData).subscribe((returnData: any) => {
    //   if (returnData.status == true) {
    //     this.toastr.success('Form submission successfull');
    //     console.log(returnData)
    //     this.router.navigate([`/signup/step-3/${returnData.data.id}`]);
    //   }
    //   else {
    //     this.toastr.error('Form submission failed.');
    //   }
    // },
    //   error => {
    //     console.error(error);
    //     this.toastr.error(error.error[0].message);
    //     (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
    //   });

  }
  submit(){
        this.touched = true;
    console.log(this.form.invalid)
    console.log(document.getElementsByClassName('ng-invalid'))
  
    const formData = this.form.value;
    this.apiService.doPostRequest(endPoints.student + endPoints.create, formData).subscribe((returnData: any) => {
      if (returnData.status == true) {
        this.toastr.success('Form submission successfull');
        console.log(returnData)
        this.router.navigate([`/signup/step-3/${returnData.data.id}`]);
      }
      else {
        this.toastr.error('Form submission failed.');
      }
    },
      error => {
        console.error(error);
        this.toastr.error(error.error[0].message);
        (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
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
        this.f.disabilityCertificateFile.setValue('');
        event.target.value = ""
        return;
      }
      else {
        multiForm.delete('file')
        multiForm.append('file', file, file.name);
      }
      console.log(multiForm)
      this.apiService.doPostRequest_upload(
        endPoints.UploadFile, multiForm)
        .subscribe((returnData: any) => {
          console.log(returnData);
          if (returnData.status == true) {
            this.f.disabilityCertificateFile.setValue(returnData.data.path)
          }
          else {
            this.f.disabilityCertificateFile.setValue('');
          }
        }, error => {
          console.log(error)
        });
    }
  }

  calculateAge = (dob) => {
    const age = this.utilities.calculageAge(new Date(dob));
    this.form.controls.ageByRegisteringDate.setValue(age);
  }

  get f() { return this.form.controls; }
}

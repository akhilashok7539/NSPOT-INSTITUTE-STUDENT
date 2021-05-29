import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../../services/api.service';
import { UtilityService } from '../../../services/utility.service';
import { endPoints } from '../../../config/endPoints';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup3-three',
  templateUrl: './signup3-three.component.html',
  styleUrls: ['./signup3-three.component.css'],
})
export class Signup3ThreeComponent implements OnInit {
  studentId;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private utilities: UtilityService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  form: FormGroup;
  touched = false;
  ngOnInit(): void {
    this.studentId = parseInt(this.route.snapshot.paramMap.get('studentId'));

    this.form = this.formBuilder.group({
      id: [this.studentId],
      permanentAddressLine1: ['', [Validators.required]],
      permanentAddressLine2: ['', [Validators.required]],
      permanentAddressLine3: ['', [Validators.required]],
      permanentCountry: ['', [Validators.required]],
      permanentState: ['', [Validators.required]],
      permanentDistrict: ['', [Validators.required]],
      permanentPin: ['', [Validators.required]],
      permanentTelephoneSTDCode: ['', [Validators.required]],
      permanentTelephone: ['', [Validators.required]],
      permanentMobile: ['', [Validators.required]],
      communicationAddressLine1: ['', [Validators.required]],
      communicationAddressLine2: ['', [Validators.required]],
      communicationAddressLine3: ['', [Validators.required]],
      communicationCountry: ['', [Validators.required]],
      communicationState: ['', [Validators.required]],
      communicationDistrict: ['', [Validators.required]],
      communicationPin: ['', [Validators.required]],
      communicationTelephoneSTDCode: ['', [Validators.required]],
      communicationTelephone: ['', [Validators.required]],
      communicationMobile: ['', [Validators.required]],
    });
  }

  /**
   * Submits the form if the form is valid
   */
  onSubmit(): void {
    this.touched = true;
    console.log(this.form.invalid)
    if (this.form.invalid) {
      return;
    } else {
      (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
    }
    const formData = this.form.value;
    this.apiService.doPostRequest(endPoints.student + endPoints.update, formData).subscribe((returnData: any) => {
      if (returnData.status == true) {
        this.toastr.success('Form submission successfull');
        console.log(returnData)
        this.router.navigate([`/signup/step-4/${this.studentId}`]);
      }
      else {
        (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
        this.toastr.error('Form submission failed.');
      }
    },
      error => {
        console.error(error);
        this.toastr.error(error.error[0].message);
        (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
      });

  }

  get f() { return this.form.controls; }
}

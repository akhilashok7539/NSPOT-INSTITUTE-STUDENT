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
  multerform=new FormData();
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
      profilePicture:['']
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
    this.multerform.append("permanentAddressLine1",this.form.value['permanentAddressLine1'])
    this.multerform.append("permanentAddressLine2",this.form.value['permanentAddressLine2'])
    this.multerform.append("permanentAddressLine3",this.form.value['permanentAddressLine3'])
    this.multerform.append("permanentCountry",this.form.value['permanentCountry'])
    this.multerform.append("permanentState",this.form.value['permanentState'])
    this.multerform.append("permanentDistrict",this.form.value['permanentDistrict'])
    this.multerform.append("permanentPin",this.form.value['permanentPin'])
    this.multerform.append("permanentTelephoneSTDCode",this.form.value['permanentTelephoneSTDCode'])
    this.multerform.append("permanentTelephone",this.form.value['permanentTelephone'])
    
    this.multerform.append("permanentMobile",this.form.value['permanentMobile'])

    this.multerform.append("profilePicture","")
    this.multerform.append("communicationAddressLine1",this.form.value['communicationAddressLine1'])
    this.multerform.append("communicationAddressLine2",this.form.value['communicationAddressLine2'])
    this.multerform.append("communicationAddressLine3",this.form.value['communicationAddressLine3'])
    this.multerform.append("communicationCountry",this.form.value['communicationCountry'])
    this.multerform.append("communicationState",this.form.value['communicationState'])
    this.multerform.append("communicationDistrict",this.form.value['communicationDistrict'])
    this.multerform.append("communicationPin",this.form.value['communicationPin'])
    this.multerform.append("communicationTelephoneSTDCode",this.form.value['communicationTelephoneSTDCode'])
    this.multerform.append("communicationTelephone",this.form.value['communicationTelephone'])
    this.multerform.append("communicationMobile",this.form.value['communicationMobile'])
    this.multerform.append("id",this.studentId)
    console.log(this.multerform);
    
    this.apiService.doPostRequest_upload(endPoints.student + endPoints.update, this.multerform).subscribe((returnData: any) => {
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
  checkedEvent(event)
  {
    console.log(event.target.checked);
    if(event.target.checked === true)
    {
      this.form.controls["communicationAddressLine1"].setValue(this.form.value["permanentAddressLine1"])
      this.form.controls["communicationAddressLine2"].setValue(this.form.value["permanentAddressLine2"])
      this.form.controls["communicationAddressLine3"].setValue(this.form.value["permanentAddressLine3"])
      this.form.controls["communicationMobile"].setValue(this.form.value["permanentMobile"])
      this.form.controls["communicationTelephone"].setValue(this.form.value["permanentTelephone"])
      this.form.controls["communicationTelephoneSTDCode"].setValue(this.form.value["permanentTelephoneSTDCode"])
      this.form.controls["communicationPin"].setValue(this.form.value["permanentPin"])
      this.form.controls["communicationDistrict"].setValue(this.form.value["permanentDistrict"])
      this.form.controls["communicationState"].setValue(this.form.value["permanentState"])
      this.form.controls["communicationCountry"].setValue(this.form.value["permanentCountry"])

    }
  }
}

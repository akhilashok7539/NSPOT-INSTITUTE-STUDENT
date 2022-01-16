import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { endPoints } from '../../../config/endPoints';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup5-five',
  templateUrl: './signup5-five.component.html',
  styleUrls: ['./signup5-five.component.css'],
})
export class Signup5FiveComponent implements OnInit {
  multiForm: FormData = new FormData();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) { }
  studentId: number;
  form: FormGroup;
  touched = false;
  ngOnInit(): void {
    this.studentId = parseInt(this.route.snapshot.paramMap.get('studentId'));
    this.form = this.formBuilder.group({
      adharCardFile: ['',[Validators.required]],
      birthCertificateFile: [''],
      communityCertificateFile: [''],
      differentlyAbledCertificateFile: [''],
      characterCertificateFile: [''],
      conductCertificateFile: [''],
      entranceExamFile: [''],
      sslcFile: [''],
      plusTwoCertificateFile: [''],
      experienceCertificateFile: [''],
      incomeCertificateFile: [''],
      migrationCertificateFile: [''],
      nativityCertificateFile: [''],
      panCardFile: [''],
      passportSizePhotoFile: ['',[Validators.required]],
      scolarshipFile: [''],
      signatureFile: ['',[Validators.required]],
      tcFile: [''],
      thumbImpressionFile: [''],
      drivingLicenseFile: [''],
      fathersSignatureFile: ['',],
      mothersSignatureFile: ['',],
      guardiansSignatureFile: ['',],



      declaration: ['', [Validators.required]],
      accept: ['', [Validators.required]],

    });
  }
  // Handling the file change events to append the file with the submitting object
  onchangeFile(controlname, event): void {
    console.log(event);
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);

      this.multiForm.delete(controlname)
      this.multiForm.append(controlname, file, file.name);
      // console.log(file)
    }
  }

  // submitting the multipart data to the api
  onSubmit(): void {
    this.touched = true;
    if (this.form.invalid) {
      return;
    } else {
      // (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
    }

    // if (this.form.value['signatureFile'] === "") {
    //   this.form.controls["signatureFile"].setValue("admisonooficeemail@gmail.com")
    //   this.multiForm.append("signatureFile", "signatureFile ");
    // }
    // if (this.form.value['passportSizePhotoFile'] === "") {
    //   this.form.controls["passportSizePhotoFile"].setValue("passportSizePhotoFile")
    //   this.multiForm.append("passportSizePhotoFile", "passportSizePhotoFile ");
    // }
    // if (this.form.value['adharCardFile'] === "") {
    //   this.form.controls["adharCardFile"].setValue("adharCardFile")
    //   this.multiForm.append("adharCardFile", "adharCardFile");
    // }

    const formData = this.form.value;
    this.multiForm.forEach((value, key) => {
      console.log("value",key);
      console.log("value",value);
    })

    

    
    this.apiService.doPostRequest_upload(endPoints.Get_studentCertificates + endPoints.create + this.studentId, this.multiForm)
      .subscribe((returnData: any) => {
        console.log(returnData);
        this.toastr.success('Registration Successful');
        this.router.navigate(['/login']);
      },
        error => {
          console.error(error);
          const message = error.error ? error.error[0].message : "Something went wrong please try again later."
          this.toastr.success(message);
          (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
        });


  }
  get f() { return this.form.controls; }
}

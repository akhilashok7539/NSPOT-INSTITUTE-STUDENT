import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../../services/api.service';
import { endPoints } from '../../../config/endPoints';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

// import { ApplicationFormService } from '../../../services/application-form.service'
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-apply-course',
  templateUrl: './apply-course.component.html',
  styleUrls: ['./apply-course.component.css']
})
export class ApplyCourseComponent implements OnInit {
  form: FormGroup;
  // additionalPersonal: FormGroup;
  // additionalEducation: FormGroup;
  // additionalExam: FormGroup;
  // additionalCertificate: FormGroup;

  studentDetails
  courseDetails
  educationDetails
  examDetails
  certificateDetails
  touched


  additionalField = {
    personalInfo: [],
    education: [],
    entrance: [],
    certificates: []
  }
  eduAndEntrnceRemovedFields = {
    education: [],
    entrance: []
  }

  studentId = this.authService.userProfile.userType_modelId;
  courseId;

  constructor(
    // private applicationFormService: ApplicationFormService,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }
  async ngOnInit() {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('courseId'));
    this.form = this.formBuilder.group({
      studentId: [this.studentId],
      courseId: [this.courseId],
      personalInfo: this.formBuilder.group({
        courseName: [""],
        stream: [""],
        isHosteler: [""],
        adharNumber: [""],
        fullName: [""],
        dob: [""],
        age: [""],
        gender: [""],
        mothersName: [""],
        mothersOccupation: [""],
        mothersEmail: [""],
        mothersPhoneNumber: [""],
        fathersName: [""],
        fathersOccupation: [""],
        fathersEmail: [""],
        fathersPhoneNumber: [""],
        guardiansName: [""],
        gaurdiansAddress: [""],
        gaurdiansEmail: [""],
        gaurdiansPhoneNumber: [""],
        isDifferentlyAbled: [""],
        differentlyAbledCertFile: [""],
        religion: [""],
        cast: [""],
        visibleMark1: [""],
        visibleMark2: [""],
        isIndian: [""],
        isNRI: [""],
        isFilledByFather: [""],
        additionalFields: this.formBuilder.group({

        }),
      }),
      permanentAddress: this.formBuilder.group({
        permanentAddressLine1: [],
        permanentAddressLine2: [],
        permanentAddressLine3: [],
        permanentCountry: [],
        permanentState: [],
        permanentDistrict: [],
        permanentPin: [],
        permanentTelephoneSTDCode: [],
        permanentTelephone: [],
        permanentMobile: [],
        additionalFields: this.formBuilder.group({

        }),
      }),
      communicationAddress: this.formBuilder.group({
        communicationAddressLine1: [],
        communicationAddressLine2: [],
        communicationAddressLine3: [],
        communicationCountry: [],
        communicationState: [],
        communicationDistrict: [],
        communicationPin: [],
        communicationTelephoneSTDCode: [],
        communicationTelephone: [],
        communicationMobile: [],
        additionalFields: this.formBuilder.group({

        }),
      }),
      education: this.formBuilder.array([

      ]),
      entrance: this.formBuilder.array([

      ]),
      certificates: this.formBuilder.group({
        adharCardFile: [],
        birthCertificateFile: [],
        communityCertificateFile: [],
        differentlyAbledCertificateFile: [],
        characterCertificateFile: [],
        conductCertificateFile: [],
        entranceExamFile: [],
        sslcFile: [],
        plusTwoCertificateFile: [],
        experienceCertificateFile: [],
        incomeCertificateFile: [],
        migrationCertificateFile: [],
        nativityCertificateFile: [],
        panCardFile: [],
        passportSizePhotoFile: [],
        scolarshipFile: [],
        signatureFile: [],
        tcFile: [],
        thumbImpressionFile: [],
        drivingLicenseFile: [],
        fathersSignatureFile: [],
        mothersSignatureFile: [],
        guardiansSignatureFile: [],

        additionalFields: this.formBuilder.group({

        }),
      }),

    });
    await this.loadCourseDetails();
    await this.loadAdditionalField();
    await this.loadRemovedFields()
    await this.loadStudentDetails();

  }

  loadRemovedFields() {
    // fetching removed fields
    return new Promise(resolve => {
      this.apiService.doGetRequest(endPoints.Get_removedField + this.courseDetails.instituteId).subscribe((returnData: any) => {

        returnData.data.map(element => {
          if (element.formSection != "entrance" && element.formSection != "education") {
            const group = this.form.controls[element.formSection] as FormGroup;
            (document.querySelector('#' + element.fieldName) as HTMLInputElement).remove();
            group.removeControl(element.fieldName);
          }
          else {
            if (element.formSection == "education")
              this.eduAndEntrnceRemovedFields.education.push(element.fieldName)
            if (element.formSection == "entrance")
              this.eduAndEntrnceRemovedFields.entrance.push(element.fieldName)
          }
        })
        resolve(true)
      }, error => {
        console.error(error);
      });
    })


  }

  loadAdditionalField() {
    // Get additionanl fields
    return new Promise(resolve => {
      this.apiService.doGetRequest(endPoints.Get_additionalField + this.courseDetails.instituteId).subscribe((returnData: any) => {
        returnData.data.map(element => {
          let additionalFieldObj = {};
          additionalFieldObj[element.fieldName] = element.fieldText
          if (element.formSection == "personalInfo") {
            this.additionalField.personalInfo.push(element)
          }
          if (element.formSection == "certificates") {
            this.additionalField.certificates.push(element)
          }
          if (element.formSection == "education") {
            this.additionalField.education.push(element)
          }
          if (element.formSection == "entrance") {
            this.additionalField.entrance.push(element)
          }

          if (element.formSection != "education" && element.formSection != "entrance") {
            const group = (this.form.controls[element.formSection] as FormGroup).get("additionalFields") as FormGroup;
            const control = this.formBuilder.control("");
            group.addControl(element.fieldName, control);
          }

        })
        resolve(true);
      }, error => {
        console.error(error);
      });
    })

  }

  loadStudentDetails() {
    // fetching user details
    this.apiService.doGetRequest(endPoints.student + this.studentId).subscribe((returnData: any) => {
      // console.log(returnData)
      const groupPersonalInfo = this.form.controls['personalInfo'] as FormGroup;
      const groupPermanentAddr = this.form.controls['permanentAddress'] as FormGroup;
      const groupCommunicationAddr = this.form.controls['communicationAddress'] as FormGroup;
      this.studentDetails = returnData.data
      groupPersonalInfo.controls.fullName.setValue(this.studentDetails.firstName + " " + this.studentDetails.middleName + " " + this.studentDetails.lastName)
      groupPersonalInfo.controls.mothersName.setValue(this.studentDetails.mothersFirstName + " " + this.studentDetails.mothersMiddleName + " " + this.studentDetails.mothersLastName)
      groupPersonalInfo.controls.fathersName.setValue(this.studentDetails.fathersFirstName + " " + this.studentDetails.fathersMiddleName + " " + this.studentDetails.fathersLastName)
      groupPersonalInfo.controls.guardiansName.setValue(this.studentDetails.guardiansFirstName + " " + this.studentDetails.guardiansMiddleName + " " + this.studentDetails.guardiansLastName)
      for (let key in returnData.data) {
        let value = returnData.data[key];
        if (returnData.data[key] === true) {
          value = "Yes"
        }
        else if (returnData.data[key] === false) {
          value = "No"
        }
        if (groupPersonalInfo.controls[key])
          groupPersonalInfo.controls[key].setValue(value)
        if (groupPermanentAddr.controls[key])
          groupPermanentAddr.controls[key].setValue(value)
        if (groupCommunicationAddr.controls[key])
          groupCommunicationAddr.controls[key].setValue(value)
      }
    }, error => {
      console.error(error);
    });

    // Get education details
    this.apiService.doGetRequest(endPoints.Get_studentEducations + this.studentId).subscribe((returnData: any) => {
      this.educationDetails = returnData.data

      // iterating through all added educations
      this.educationDetails.map((element, i) => {
        const group = this.formBuilder.group({
          accademicLevelId: [true],
          schoolName: [true],
          specialization: [true],
          yearOfStudy: [true],
          startDate: [true],
          endDate: [true],
          certificateFile: [true],
          qualificationStatus: [true],
          cgpa: [true],
          additionalFields: this.formBuilder.group({

          }),
        });

        // iterating inside a single education element
        for (let key in element) {
          if (group.controls[key]) {
            let value = element[key]
            if (key == 'accademicLevelId') {
              value = element.AccademicLevel.title
            }
            if (key == 'qualificationStatus') {
              switch (value) {
                case "0":
                  value = "Passed"
                  break;
                case "1":
                  value = "Failed"
                  break;
                case "2":
                  value = "Completed"
                  break;

                default:
                  value = ""
                  break;
              }
            }
            group.controls[key].setValue(value)


          }
        }

        // console.log("in the educations section", this.additionalField.education)
        this.additionalField.education.map(element => {
          // console.log(element)
          const groupEd = group.get("additionalFields") as FormGroup;
          const control = this.formBuilder.control("");
          groupEd.addControl(element.fieldName, control);
        })

        this.educations.push(group);

        // setting a timeout to let the form array load the newly added dom elements
        setTimeout(() => {
          this.eduAndEntrnceRemovedFields.education.map(removedItem => {
            if (document.querySelector('#' + removedItem + "-ed" + i)) {
              (document.querySelector('#' + removedItem + "-ed" + i) as HTMLInputElement).remove();
              group.removeControl(removedItem)
            }
          })
        }, 3000);
      })
    }, error => {
      console.error(error);
    });


    // Get entrance exam details
    this.apiService.doGetRequest(endPoints.Get_studentEntranceExams + this.studentId).subscribe((returnData: any) => {
      this.educationDetails = returnData.data

      this.educationDetails.map((element, i) => {
        const group = this.formBuilder.group({
          qualifiedEntrance: [true],
          rollNumber: [true],
          yearOfQualification: [true],
          validUpto: [true],
          cgpa: [true],
          rank: [true],
          additionalFields: this.formBuilder.group({

          }),
        });

        for (let key in element) {
          if (group.controls[key]) {
            let value = element[key]
            group.controls[key].setValue(value)
          }

        }

        this.additionalField.entrance.map(element => {
          console.log(element)
          const groupEd = group.get("additionalFields") as FormGroup;
          const control = this.formBuilder.control("");
          groupEd.addControl(element.fieldName, control);
        })
        this.entranceExams.push(group);

        // setting a timeout to let the form array load the newly added dom elements
        setTimeout(() => {
          // iterating through the removed entrance exam fields to remove from both html and formgroup
          this.eduAndEntrnceRemovedFields.entrance.map(removedItem => {
            if (document.querySelector('#' + removedItem + "-en" + i)) {
              (document.querySelector('#' + removedItem + "-en" + i) as HTMLInputElement).remove();
              group.removeControl(removedItem)
            }
          })
        }, 2000);
      })
    }, error => {
      console.error(error);
    });

    // Getting student certificates
    this.apiService.doGetRequest(endPoints.Get_studentCertificates + this.studentId).subscribe((returnData: any) => {
      const group = this.form.controls['certificates'] as FormGroup;
      this.certificateDetails = returnData.data[0]

      for (let key in this.certificateDetails) {
        let value = this.certificateDetails[key];
        if (group.controls[key]) {
          group.controls[key].setValue(value);
          if ((document.querySelector('#' + key + "-img")) && value != null)
            (document.querySelector('#' + key + "-img") as HTMLElement).setAttribute("src", environment.baseApiUrl + value);
        }

      }
    }, error => {
      console.error(error);
    });
  }

  loadCourseDetails() {
    // fetching user details
    return new Promise((resolve, reject) => {
      this.apiService.doGetRequest(endPoints.Get_course + this.courseId).subscribe((returnData: any) => {
        // console.log(returnData)
        this.courseDetails = returnData.data
        resolve(true);
      }, error => {
        console.error(error);
        reject();
      });
    });
  }

  /**
    * Submits the form if the form is valid
    */
  onSubmit(): void {
    this.touched = true;
    console.log(document.getElementsByClassName('ng-invalid'))
    if (this.form.invalid) {
      return;
    } else {
      (document.querySelector('#submit-btn') as HTMLInputElement).setAttribute('disabled', '');
    }
    const formData = this.form.value;
    this.apiService.doPostRequest(endPoints.Submit_applicationForm, formData).subscribe((returnData: any) => {
      if (returnData.status == true) {
        this.toastr.success('Application Submitted Successfully');
        console.log(returnData)
        this.router.navigate([`/student/profile`]);
      }
      else {
        this.toastr.error('Form submission failed.');
      }
    },
      error => {
        console.error(error);
        (document.querySelector('#submit-btn') as HTMLInputElement).removeAttribute('disabled');
        this.toastr.error(error.error[0].message);

      });

  }

  get f() { return this.form.controls; }
  get educations() {
    return this.form.get('education') as FormArray
  }
  get entranceExams() {
    return this.form.get('entrance') as FormArray
  }
}

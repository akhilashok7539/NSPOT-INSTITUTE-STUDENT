import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../../services/api.service';
import { endPoints } from '../../../config/endPoints';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

// import { ApplicationFormService } from '../../../services/application-form.service'
import { AuthService } from 'src/app/services/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-apply-course-certificates',
  templateUrl: './apply-course-certificates.component.html',
  styleUrls: ['./apply-course-certificates.component.css']
})
export class ApplyCourseCertificatesComponent implements OnInit {

  form: FormGroup;
  // additionalPersonal: FormGroup;
  // additionalEducation: FormGroup;
  // additionalExam: FormGroup;
  // additionalCertificate: FormGroup;
  multerForm = new FormData();
  certificateList = [
    {
      "adharCardFile":"a",
      "birthCertificateFile":"a",
      "communityCertificateFile":"a",
      "differentlyAbledCertificateFile":"a"
    },
    {
      "adharCardFile":"a",
      "birthCertificateFile":"a",
      "communityCertificateFile":"a",
      "differentlyAbledCertificateFile":"a"
    }
  ]
  studentDetails
  courseDetails
  educationDetails
  examDetails
  certificateDetails
  touched
  hiddenFiles;

  additionalField = {
    personalInfo: [],
    education: [],
    entrance: [],
    certificates: []
  }
  eduAndEntrnceRemovedFields = {
    personalInfo: [],
    education: [],
    entrance: [],
    certificates:[]
  }

  studentId = localStorage.getItem("USERID");;
  stuendtUserId = localStorage.getItem("USERID");
  courseId;
  educationListarray:any =[];
  entraceListArray:any=[];
  addclick = false;
  addEntranceClick= false;
  courseName;
  applicationId;
  constructor(
    // private applicationFormService: ApplicationFormService,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }
  async ngOnInit() {
    // this.courseId = parseInt(this.route.snapshot.paramMap.get('courseId'));
    this.activatedRoute.paramMap.subscribe(data =>{
      console.log(data['params']);
      console.log(data['params']['courseId']);
      console.log(data['params']['applicationId']);

      this.courseId = data['params']['courseId'];
      this.applicationId =  data['params']['applicationId'];
    })
    console.log(this.courseId);
    
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
      // certificates: this.formBuilder.array([

      // ]),
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

        // new key

        adharCardFileattested:[],
        addressProof:[],
        admissionApplciationLetterFile:[],
        sslcFileattested: [],
        sslcmarksheetfile:[],
        plusTwoCertificateFileattested: [],
        plusTwoCertificateFileprofessional: [],
        plusTwoCertificateFileprofessionalattested: [],
        degreeCertificateFile:[],
        degreeCertificateFileattested:[],
        professionaldegreeCertificateFile:[],
        professionaldegreeCertificateFileattested:[],
        diplomaCertificateFile:[],
        diplomaCertificateFileattested:[],
        pgMasterCertificateFile:[],
        pgMasterCertificateFileattested:[],
        phdCertificateFile:[],
        phdCertificateFileatteseted:[],
        courseCompletionCertificateFile:[],
        consolidateMarkListFile:[],

        originalGradecardFile:[],
        apptitudeTestFile:[],
        typingSkillTestFile:[],
        allotmentLetterFile:[],
        proofOfEnglishProficiencyFile:[],
        aadharcardParentatteseted:[],
        aadharcardParent:[],

        passportorvisa:[],
        hallticketFile:[],
        previousschoolCollageAttendedCertificateFile:[],
        sportsCertificateFile:[],
        nocCertificateFile:[],
        scCertificate:[],
        ewsCertificate:[],

        educationConsessionCertificate:[],
        relivingCertificate:[],
        offerletterCertificate:[],
        medicalCertificate:[],
        affidavitFile:[],
        gapCertificate:[],
        selfDeclarationCertificate:[],
        recommendationCertificate:[],
        dischargeCertificate:[],
        additionalCertificateFile:[],



        additionalFields: this.formBuilder.group({

        }),
      }),



    });
    await this.loadCourseDetails();
    await this.loadAdditionalField();
    await this.loadStudentDetails();
    // this.form.value['personalInfo'].courseName = "mtech";
    // console.log(this.form.value['personalInfo'].courseName);
    await this.loadRemovedFields();

    // this.form.controls['code'].setValue(this.instituteDetails['code']);
    // console.log( );
    
    // this.apiService.doGetRequest('institute/course/courseName/'+this.courseId).subscribe(
    //   data =>{
    //     this.courseName = data['CourseName']
    //     const group = this.form.controls["personalInfo"] as FormGroup;

    //     group.controls['courseName'].setValue( this.courseName)
    //   }
    // )
    
  }

  loadRemovedFields() {
    // fetching removed fields
    return new Promise(resolve => {
      this.apiService.doGetRequest(endPoints.Get_removedField + this.courseDetails.instituteId).subscribe((returnData: any) => {
       
        console.log("REMOVED FIELDS"+returnData.data);
        
        returnData.data.map(element => {
          console.log(element.formSection);
          
          if (element.formSection ==='personalInfo' ) {
           
            const group = this.form.controls[element.formSection] as FormGroup;
            // (document.getElementById(element.fieldName) as HTMLInputElement).remove;
            var obj = document.getElementById(element.fieldName);
            obj.remove();
            group.removeControl(element.fieldName);

          }

          if (element.formSection ==='permanentAddress' ) {
           
            const group = this.form.controls[element.formSection] as FormGroup;
            // (document.getElementById(element.fieldName) as HTMLInputElement).remove;
            var obj = document.getElementById(element.fieldName);
            obj.remove();
            group.removeControl(element.fieldName);

          }
          if(element.formSection === "communicationAddress" )
          {
            const group = this.form.controls[element.formSection] as FormGroup;
            // (document.getElementById(element.fieldName) as HTMLInputElement).remove;
            var obj = document.getElementById(element.fieldName);
            obj.remove();
            group.removeControl(element.fieldName);
          }
          if(element.formSection === "certificates")
          {
            const group = this.form.controls[element.formSection] as FormGroup;
            // (document.getElementById(element.fieldName) as HTMLInputElement).remove;
            var obj = document.getElementById(element.fieldName);
            obj.remove();
            group.removeControl(element.fieldName);
            
          }
          else {
            if (element.formSection == "education")
              this.eduAndEntrnceRemovedFields.education.push(element.fieldName)
            if (element.formSection == "entrance")
              this.eduAndEntrnceRemovedFields.entrance.push(element.fieldName)
              // if (element.formSection == "certificates")
              // this.eduAndEntrnceRemovedFields.certificate.push(element.fieldName)  
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

          if (element.formSection != "education" && element.formSection != "entrance" && element.formSection != "certificates") {
            const group = (this.form.controls[element.formSection] as FormGroup).get("additionalFields") as FormGroup;
            const control = this.formBuilder.control("");
            group.addControl(element.fieldName, control);
            console.log(element.fieldName);
            
          }

        })
        resolve(true);
      }, error => {
        console.error(error);
      });
    })

  }

  loadStudentDetails() {
  
    // this.apiService.doGetRequest(endPoints.student + this.studentId).subscribe((returnData: any) => {
      
    //   const groupPersonalInfo = this.form.controls['personalInfo'] as FormGroup;
    //   const groupPermanentAddr = this.form.controls['permanentAddress'] as FormGroup;
    //   const groupCommunicationAddr = this.form.controls['communicationAddress'] as FormGroup;
    //   this.studentDetails = returnData.data
    //   groupPersonalInfo.controls.fullName.setValue(this.studentDetails.firstName + " " + this.studentDetails.middleName + " " + this.studentDetails.lastName)
    //   groupPersonalInfo.controls.mothersName.setValue(this.studentDetails.mothersFirstName + " " + this.studentDetails.mothersMiddleName + " " + this.studentDetails.mothersLastName)
    //   groupPersonalInfo.controls.fathersName.setValue(this.studentDetails.fathersFirstName + " " + this.studentDetails.fathersMiddleName + " " + this.studentDetails.fathersLastName)
    //   groupPersonalInfo.controls.guardiansName.setValue(this.studentDetails.guardiansFirstName + " " + this.studentDetails.guardiansMiddleName + " " + this.studentDetails.guardiansLastName)
    //   for (let key in returnData.data) {
    //     let value = returnData.data[key];
    //     if (returnData.data[key] === true) {
    //       value = "Yes"
    //     }
    //     else if (returnData.data[key] === false) {
    //       value = "No"
    //     }
    //     if (groupPersonalInfo.controls[key])
    //       groupPersonalInfo.controls[key].setValue(value)
    //     if (groupPermanentAddr.controls[key])
    //       groupPermanentAddr.controls[key].setValue(value)
    //     if (groupCommunicationAddr.controls[key])
    //       groupCommunicationAddr.controls[key].setValue(value)
    //   }
    // }, error => {
    //   console.error(error);
    // });

    // Get education details
    this.apiService.doGetRequest(endPoints.Get_studentEducations + this.studentId).subscribe((returnData: any) => {
      this.educationDetails = returnData.data
      console.log("EDUCATION DETAILS FROM BACKEND",this.educationDetails);
      // this.educationDetails = [];
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

        // setTimeout(() =>{
        //   this.eduAndEntrnceRemovedFields.certificates.map(removedItem => {
        //     if (document.querySelector('#' + removedItem + "-cer" + i)) {
        //       (document.querySelector('#' + removedItem + "-cer" + i) as HTMLInputElement).remove();
        //       group.removeControl(removedItem)
        //     }
        //   })
        // }, 3000);

        

      })
    }, error => {
      console.error(error);
    });


    // Get entrance exam details
    this.apiService.doGetRequest(endPoints.Get_studentEntranceExams + this.studentId).subscribe((returnData: any) => {
      this.educationDetails = returnData.data
      // console.log("ENTRANCE DETIALS FROM BACKEDN:",this.educationDetails);
      
      this.educationDetails.map((element, i) => {
      console.log("ENTRANCE DETIALS FROM BACKEDN:",element,i);
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
          // console.log(element)
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
      // const group = this.form.controls['certificates'] as FormGroup;
      // this.certificateDetails = returnData.data[0]
      // console.log("CERTIFICATE LIST"+JSON.stringify(this.certificateList));
      
      
      // this.certificateDetails = [];
      // this.certificateDetails = JSON.stringify(this.certificateList[0]);
      // this.certificateDetails.map((element, i) => {
      //   const group = this.formBuilder.group({
      //   adharCardFile: [true],
      //   birthCertificateFile: [true],
      //   communityCertificateFile: [true],
      //   differentlyAbledCertificateFile: [true],
      //   characterCertificateFile: [true],
      //   conductCertificateFile: [true],
      //   entranceExamFile: [true],
      //   sslcFile: [true],
      //   plusTwoCertificateFile: [true],
      //   experienceCertificateFile: [true],
      //   incomeCertificateFile: [true],
      //   migrationCertificateFile: [true],
      //   nativityCertificateFile: [true],
      //   panCardFile: [true],
      //   passportSizePhotoFile: [true],
      //   scolarshipFile: [true],
      //   signatureFile: [true],
      //   tcFile: [true],
      //   thumbImpressionFile: [true],
      //   drivingLicenseFile: [true],
      //   fathersSignatureFile: [true],
      //   mothersSignatureFile: [true],
      //   guardiansSignatureFile: [true],

      //   });

      //   for (let key in element) {
      //     if (group.controls[key]) {
      //       console.log("element in cert"+key);
      //       group.controls[key].setValue("")
      //     }

      //   }

      //   console.log(this.getCertificates.value);
      //   this.getCertificates.push(group);
        
        
      //   setTimeout(() => {
      //     this.eduAndEntrnceRemovedFields.certificates.map(removedItem => {
      //       if (document.querySelector('#' + removedItem + "-cer" + i)) {
      //         (document.querySelector('#' + removedItem + "-cer" + i) as HTMLInputElement).remove();
      //         group.removeControl(removedItem)
      //       }
      //     })
      //   }, 2000);
      // })
      // for (let key in this.certificateDetails) {
      //   let value = this.certificateDetails[key];
      //   if (group.controls[key]) {
      //     group.controls[key].setValue(value);
      //     if ((document.querySelector('#' + key + "-img")) && value != null)
      //       (document.querySelector('#' + key + "-img") as HTMLElement).setAttribute("src", environment.baseApiUrl + value);
      //   }

      // }

      


      // const formData = this.form.value;
      // console.log("formgroup"+JSON.stringify(formData));
      
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
        // console.log("course details"+JSON.stringify(this.courseDetails));
        
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
  // onSubmit(): void {
  //   this.touched = true;
  //   delete this.form.value["certificates"]

  //   console.log(document.getElementsByClassName('ng-invalid'))
  //   if (this.form.invalid) {
  //     return;
  //   } else {
  //   }
  //   const formData = this.form.value;
  //   if(this.addclick === true)
  //   {
  //     formData.education = this.educationListarray;

  //   }
  //   if(this.addEntranceClick === true)
  //   {
  //     formData.entrance = this.entraceListArray;

  //   }
  //   console.log(formData);
  //   console.log(this.multerForm);
    
  //  console.log(this.form.get('certificates').value);
     
  //   console.log(formData);

  //   this.apiService.doPostRequest(endPoints.Submit_applicationForm, formData).subscribe((returnData: any) => {
  //     if (returnData.status == true) {
  //       let applciaitonId = returnData['data'].id;
  //       this.multerForm.append("formId",applciaitonId);
  //       if(applciaitonId)
  //       {
  //         this.getfilesUpdate();
  //       }
  //       else{
  //         this.toastr.error('Application already submited');
  //       }
     
  //     }
  //     else {
  //       this.toastr.error('Form submission failed.');
  //     }
  //   },
  //     error => {
  //       console.error(error);
  //       this.toastr.error(error.error[0].message);

  //     });

  // }
  addnewEducation()
  {
    this.addclick = true;
    console.log(this.form.get('education').value);
    
    this.educationListarray.push(this.form.get('education').value[0])
    console.log(this.educationListarray);
    this.form.get('education').reset();
  }
  addnewEntrance()
  {
    this.addEntranceClick = true;
    this.entraceListArray.push(this.form.get('entrance').value[0])
    console.log(this.entraceListArray);
    this.form.get('entrance').reset();

  }
  delete(i)
  {
    this.educationListarray.splice(i)
  }
  deleteentraceListArray(i)
  {
    this.entraceListArray.splice(i)

  }
  get f() { return this.form.controls; }
  get educations() {
    return this.form.get('education') as FormArray
  }
  get entranceExams() {
    return this.form.get('entrance') as FormArray
  }
  get getCertificates() {
    return this.form.get('certificates') as FormArray
  }
  updatefile(event,formcontrol)
  {
    console.log(event);
    
    const file=  event.target.files[0];
    // console.log(file.name);
    
    this.multerForm.append(formcontrol, file);
    
  
    
  }
  getfilesUpdate()
  {
    this.multerForm.append("formId",this.applicationId);

    this.apiService.doPostRequest_upload(`applicationForm/submit/formfiles`,this.multerForm).subscribe(
      data =>{
        this.toastr.success('Application Submitted Successfully');
        console.log(data)
        this.router.navigate([`/student/profile`]);
      }
      
    )
  }
  viewExperence(experienceCertificateFile)
  {
    return (
      this.hiddenFiles.find((el) => el.fieldName.toString() === (experienceCertificateFile || "").toString()) || {
        Hidename: 'true',
      }
    );
  }
}
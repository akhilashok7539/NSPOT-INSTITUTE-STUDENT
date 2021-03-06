import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { EmailVerificationComponent } from './Pages/email-verification/email-verification.component';
import { InnerLayoutComponent } from './Layout/inner-layout/inner-layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { OuterLayoutComponent } from './Layout/outer-layout/outer-layout.component';
import { OuterHeaderComponent } from './Layout/outer-layout/outer-header/outer-header.component';
import { OuterFooterComponent } from './Layout/outer-layout/outer-footer/outer-footer.component';
import { InnerHeaderComponent } from './Layout/inner-layout/inner-header/inner-header.component';
import { InnerFooterComponent } from './Layout/inner-layout/inner-footer/inner-footer.component';
import { InnerSidebarComponent } from './Layout/inner-layout/inner-sidebar/inner-sidebar.component';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { Signup3ThreeComponent } from './Pages/signup/signup3-three/signup3-three.component';
import { Signup4FourComponent } from './Pages/signup/signup4-four/signup4-four.component';
import { Signup2TwoComponent } from './Pages/signup/signup2-two/signup2-two.component';

import { Signup5FiveComponent } from './Pages/signup/signup5-five/signup5-five.component';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { BrowseCollegesComponent } from './Pages/college/browse-colleges/browse-colleges.component';
import { CollegeDetailsComponent } from './Pages/college/college-details/college-details.component';
import { CourseDetailsComponent } from './Pages/course/course-details/course-details.component';
import { ApplyCourseComponent } from './Pages/course/apply-course/apply-course.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseCheckoutComponent } from './Pages/course/course-checkout/course-checkout.component';
import { AttendTestComponent } from './Pages/attend-test/attend-test.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {LoaderInterceptor} from './services/loadingInterceptor';
import { PaymentHistoryComponent } from './Pages/payment-history/payment-history.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CoursesCompareComponent } from './Pages/courses-compare/courses-compare.component';
 import {ResponseService} from './services/response.service';
import { ViewReceiptComponent } from './Pages/view-receipt/view-receipt.component';
import {SafePipe} from './Pages/college/college-details/safe.pipe';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {DemoMaterialModule} from '../app/material-module';
import {FilterPipe} from './guards/filterpipe';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ModalComponent } from './components/modal/modal.component';
import { ViewCourseDetailsComponent } from './Pages/view-course-details/view-course-details.component';
import { ResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import { ApplyCourseCertificatesComponent } from './Pages/course/apply-course-certificates/apply-course-certificates.component';
import { FaqComponent } from './Pages/faq/faq.component';
import { ForgotPasswordComponent } from './Pages/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EmailVerificationComponent,
    InnerLayoutComponent,
    DashboardComponent,
    OuterLayoutComponent,
    OuterHeaderComponent,
    OuterFooterComponent,
    InnerHeaderComponent,
    InnerFooterComponent,
    InnerSidebarComponent,
    ContactUsComponent,
    Signup3ThreeComponent,
    Signup4FourComponent,
    Signup2TwoComponent,
    Signup5FiveComponent,
    ControlMessagesComponent,
    BrowseCollegesComponent,
    CollegeDetailsComponent,
    CourseDetailsComponent,
    ApplyCourseComponent,
    CourseCheckoutComponent,
    AttendTestComponent,
    PaymentHistoryComponent,
    CoursesCompareComponent,
    ViewReceiptComponent,
    SafePipe,
    FilterPipe,
    ModalComponent,
    ViewCourseDetailsComponent,
    ResetPasswordComponent,
    ApplyCourseCertificatesComponent,
    FaqComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ShareButtonsModule,
    ShareIconsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoMaterialModule,
    NgxSpinnerModule,
    NgxMatSelectSearchModule,
    NgbModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: ResponseService, multi :true},

    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'
import { UserTypeGuard } from './guards/user-type.guard'

import { LoginComponent } from './Pages/login/login.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { InnerLayoutComponent } from './Layout/inner-layout/inner-layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { OuterLayoutComponent } from './Layout/outer-layout/outer-layout.component';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { Signup2TwoComponent } from './Pages/signup/signup2-two/signup2-two.component';
import { Signup3ThreeComponent } from './Pages/signup/signup3-three/signup3-three.component';
import { Signup4FourComponent } from './Pages/signup/signup4-four/signup4-four.component';
import { Signup5FiveComponent } from './Pages/signup/signup5-five/signup5-five.component';
import { BrowseCollegesComponent } from './Pages/college/browse-colleges/browse-colleges.component';
import { CollegeDetailsComponent } from './Pages/college/college-details/college-details.component';
import { CourseDetailsComponent } from './Pages/course/course-details/course-details.component';
import { ApplyCourseComponent } from './Pages/course/apply-course/apply-course.component';
import { CourseCheckoutComponent } from './Pages/course/course-checkout/course-checkout.component';
import { AttendTestComponent } from './Pages/attend-test/attend-test.component';
import { PaymentHistoryComponent } from './Pages/payment-history/payment-history.component';
import { CoursesCompareComponent } from './Pages/courses-compare/courses-compare.component';
import { ViewReceiptComponent } from './Pages/view-receipt/view-receipt.component';
import { ViewCourseDetailsComponent } from './Pages/view-course-details/view-course-details.component';
import { ResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import { ApplyCourseCertificatesComponent } from './Pages/course/apply-course-certificates/apply-course-certificates.component';
import { FaqComponent } from './Pages/faq/faq.component';
import { ForgotPasswordComponent } from './Pages/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: OuterLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },

    ],
  },
  {
    path: 'signup',
    component: OuterLayoutComponent,
    children: [
      { path: '', component: SignupComponent },
      { path: 'step-2', component: Signup2TwoComponent },
      { path: 'step-3/:studentId', component: Signup3ThreeComponent },
      { path: 'step-4/:studentId', component: Signup4FourComponent },
      { path: 'step-5/:studentId', component: Signup5FiveComponent },
    ],
  },
  {
    path: 'student',
    canActivate: [AuthGuard],
    component: InnerLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'profile', component: DashboardComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'explore-courses', component: BrowseCollegesComponent },
      { path: 'institute-details/:instituteId', component: CollegeDetailsComponent },
      { path: 'course-details/:courseId', component: CourseDetailsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'attend-test/:id', component: AttendTestComponent },
      { path: 'payment-history', component: PaymentHistoryComponent },
      { path: 'compare-courses', component: CoursesCompareComponent },
      { path: 'view-courses', component: ViewCourseDetailsComponent },

      { path: 'view-receipt/:applicationId', component: ViewReceiptComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
     
      {
        path: 'course',
        children: [
          { path: '', pathMatch: 'full', redirectTo: '/student/profile' },
          { path: 'apply/:courseId', component: ApplyCourseComponent },
          { path: 'certificates/:courseId/:applicationId', component: ApplyCourseCertificatesComponent },
          { path: 'checkout/:applicationId', component: CourseCheckoutComponent },

        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

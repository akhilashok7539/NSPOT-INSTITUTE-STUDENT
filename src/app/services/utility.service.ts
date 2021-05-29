import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  /**
   * Returns the age , if 0 or less; returns 0
   * @param dob Date object of the date of birth
   */
  calculageAge = (dob: Date) => {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth()) {
      age -= 1;
    }
    if (age <= 0) {
      return 0;
    }
    else {
      return age;
    }
  }
}

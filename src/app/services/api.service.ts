/**
 * Service - API services
 * This service deals with the api calls and returns the API response
 * @author : deepu TG | deeputg1992@gmail.com
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
// import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpOptions: any;
  public accessToken: string;
  public userLogedIn;

  SERVER_URL = environment.apiUrl;
  constructor(
    private http: HttpClient,
    // private authService: AuthService
  ) {
    this.setHttpOptions();
  }


  /**
   * sets the http header
   * Authorization header setup in the case of loged in user
   * @param : nil
   * @returns : void
   */
  setHttpOptions(): void {
    this.userLogedIn = JSON.parse(sessionStorage.getItem('userLogin'));
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (this.userLogedIn != null) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.userLogedIn.token
      });
    }

    this.httpOptions = { headers };
  }

  // general get service
  public doGetRequest(url: any) {
    this.setHttpOptions()

    return this.http.get<any>(this.SERVER_URL + url, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // general post service
  public doPostRequest(url: any, data: any) {
    this.setHttpOptions()
    return this.http.post<any>(this.SERVER_URL + url, data, this.httpOptions).pipe(
      map((response) => {
        return response;
      }),
    );
  }

  public doPostRequest_upload(url: any, data: any) {
    // this.getAccessToken()
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        // Authorization: 'Bearer ' + this.accessToken,
      }),
    }
    return this.http.post<any>(this.SERVER_URL + url, data, httpOptions).pipe(
      map((response) => {
        return response
      }),
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was:`, error);
      if (error.status == 403) {
        sessionStorage.removeItem('userLogin');
        window.location.reload()
      }
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}

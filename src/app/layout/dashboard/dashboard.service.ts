import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// import { map } from 'rxjs/operators';

@Injectable()
export class DashboardService {
  onRefresh = new EventEmitter<any>();

  // private apiUrl = 'http://13.233.255.69:8080/';
  // private apiUrl = 'http://13.127.220.199:8080/';
  private apiUrl = 'http://3.7.67.82:8080/';


  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      console.log('print ********* error');
      console.log(error);
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  ipaddress() {
    return this.http.get('https://jsonip.com').pipe(map((res) => res), catchError(this.handleError));
  }

  
}
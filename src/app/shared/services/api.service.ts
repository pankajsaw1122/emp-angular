import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
  public apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      console.log('print ********* error');
      console.log(error);
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.log(error);
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error.message}`
      );
    }
    // return an observable with a user-facing error message
    return JSON.stringify(error.error);
  }


  getEmployeeList() {
    return this.http.get(this.apiUrl + 'employee/list-emp').pipe(map((res) => res), catchError(this.handleError));
  }

  getDepartmentList() {
    return this.http.get(this.apiUrl + 'employee/dept-list').pipe(map((res) => res), catchError(this.handleError));
  }

  getDesignationList(id) {
    return this.http.get(this.apiUrl + 'employee/design-list?id=' + id).pipe(map((res) => res), catchError(this.handleError));

  }

  addEmployee(data) {
    return this.http.post(this.apiUrl + 'employee/add-emp', data).pipe(map((res) => res), catchError(this.handleError));
  }

  updateEmployee(data) {
    return this.http.put(this.apiUrl + 'employee/edit-emp', data).pipe(map((res) => res), catchError(this.handleError));
  }

  employeebyId(id) {
    return this.http.get(this.apiUrl + 'employee/emp-byid?id=' + id).pipe(map((res) => res), catchError(this.handleError));
  }

  deleteEmployee(id) {
    return this.http.delete(this.apiUrl + 'employee/delete-emp?id=' + id).pipe(map((res) => res), catchError(this.handleError));
  }

}
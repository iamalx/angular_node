import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  api = 'http://localhost:8000/api';
  username: string;

  constructor(private http: HttpClient) {}

  setUsername(name: string): void {
    this.username = name;
  }

  // GET /members
  getMembers() {
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }

  // GET /teams
  getTeams() {
    return this.http
      .get(`${this.api}/teams`)
      .pipe(catchError(this.handleError));
  }
  
  // POST /addMember
  addMember(memberForm: any) {
    console.log('addMember')
    return this.http
      .post(`${this.api}/addMember`, memberForm )
      .pipe(catchError(this.handleError));
  }
  
  // PUT /editMember
  editMember(memberForm: any, id: number) {
    return this.http
      .put(`${this.api}/editMember/${id}`, memberForm)
      .pipe(catchError(this.handleError));
  }
  
  // DELETE /deleteMember
  deleteMember(memberId: number) {
    return this.http
      .delete(`${this.api}/deleteMember/${memberId}`)
      .pipe(catchError(this.handleError));
  }

  // ERROR
  private handleError(error: HttpErrorResponse) {
    console.log(JSON.stringify(error))
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}

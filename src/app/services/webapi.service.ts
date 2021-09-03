import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebapiService {

  constructor(private httpClient: HttpClient) { }

  public post(url: string, body: any, options: any = {}) {
    if (!body)
      body = {};

      url = environment.baseUrl + url;

      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

    return this.httpClient.post(url, body, options)
      .pipe(
        map(res => {
          return res as any;
        }),
        catchError(err => {
          return this.handleError(err);
        })
      );
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `حدث خطأ: ${err.error.message}`;
    }

    //this.modalService.alertError(errorMessage);
    return throwError(errorMessage);
  }
}

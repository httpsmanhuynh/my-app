import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Fashion } from '../classes/Fashion';

@Injectable({
  providedIn: 'root',
})
export class FashionAPIService {
  headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
  requestOptions: Object = {
    headers: this.headers,
    responseType: 'text',
  };

  constructor(private _http: HttpClient) {}

  private normalizeFashion(item: any, index = 0): Fashion {
    const fashion = Object.assign(new Fashion(), item);
    fashion.fashion_subject = fashion.fashion_subject || item?.title || 'No title';
    fashion.fashion_detail =
      fashion.fashion_detail || item?.details || item?.fashion_detail || 'No description';
    fashion.style = fashion.style || item?.style || 'Uncategorized';
    fashion.idF = fashion.idF ?? item?.idF ?? index + 1;
    fashion.fashion_image = fashion.fashion_image || item?.fashion_image || '';
    return fashion;
  }

  getFashions(): Observable<any> {
    return this._http.get<any>('/fashions', this.requestOptions).pipe(
      map((res) => {
        const data = JSON.parse(res) as any[];
        return data.map((item, index) => this.normalizeFashion(item, index));
      }),
      retry(3),
      catchError(this.handleError),
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  getFashion(id: string): Observable<any> {
    return this._http.get<any>('/fashions/' + id, this.requestOptions).pipe(
      map((res) => this.normalizeFashion(JSON.parse(res))),
      retry(3),
      catchError(this.handleError),
    );
  }

  postFashion(aFashion: any): Observable<any> {
    let jsonString = JSON.stringify(aFashion);
    return this._http.post<any>('/fashions', jsonString, this.requestOptions).pipe(
      map((res) => this.normalizeFashion(JSON.parse(res))),
      retry(3),
      catchError(this.handleError),
    );
  }

  putFashion(aFashion: any): Observable<any> {
    let jsonString = JSON.stringify(aFashion);
    return this._http.put<any>('/fashions', jsonString, this.requestOptions).pipe(
      map((res) => this.normalizeFashion(JSON.parse(res))),
      retry(3),
      catchError(this.handleError),
    );
  }

  deleteFashion(fashionId: string): Observable<any> {
    return this._http.delete<any>('/fashions/' + fashionId, this.requestOptions).pipe(
      map((res) => this.normalizeFashion(JSON.parse(res))),
      retry(3),
      catchError(this.handleError),
    );
  }
}

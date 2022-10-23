import { Injectable } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestClientService {
  url: any;
  constructor(public http: HttpClient) {
    this.url = environment.apiUrl;
  }

  get(endpoint: string, params?: any) {
    return this.http.get(this.url + '/' + endpoint);
  }

  post(endpoint: string, body: any, options?: any) {
    return this.http.post(this.url + '/' + endpoint, body, options).pipe(timeout(180000));
  }


}

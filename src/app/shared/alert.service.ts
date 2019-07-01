import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(@Inject('API_URL') private apiUrl: string, private httpClient: HttpClient) { }

  async info() {
    console.log('xxxx');
    const _url = `${this.apiUrl}/info`;
    return this.httpClient.get(_url).toPromise();
  }

  async alertStart() {
    const _url = `${this.apiUrl}/alertStart`;
    return this.httpClient.get(_url).toPromise();
  }

  async alertStop() {
    const _url = `${this.apiUrl}/alertStop`;
    return this.httpClient.get(_url).toPromise();
  }

  async insert(info: object) {
    const _url = `${this.apiUrl}/insert`;
    return this.httpClient.post(_url, info).toPromise();
  }

  async update(alertId: any, info: object) {
    const _url = `${this.apiUrl}/update/${alertId}`;
    return this.httpClient.put(_url, info).toPromise();
  }

  async remove(alertId: any) {
    const _url = `${this.apiUrl}/remove/${alertId}`;
    return this.httpClient.delete(_url).toPromise();
  }

}

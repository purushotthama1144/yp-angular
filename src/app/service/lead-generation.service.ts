import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadGenerationService {

  baseurl = 'http://20.244.106.232/'

  constructor(private httpClient: HttpClient) { }

  sendFormData(formData): Observable<any> {
    return this.httpClient.post(`${this.baseurl}users`, formData);
  }
}

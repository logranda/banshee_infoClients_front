import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private urlEndPoint = environment.apiUrl + 'country/';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  public getAllCountry(): any {
    return this.http.get<any>(this.urlEndPoint + 'all');
  }
}

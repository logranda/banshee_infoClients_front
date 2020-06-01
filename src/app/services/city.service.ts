import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private urlEndPoint = environment.apiUrl + 'city/';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  public getAllCity(name: string): any {
    return this.http.get<any>(this.urlEndPoint + 'find/' + name);
  }

  public getVisitByCity(): any {
    return this.http.get<any>(this.urlEndPoint + 'visit');
  }
}

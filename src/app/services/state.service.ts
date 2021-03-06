import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private urlEndPoint = environment.apiUrl + 'state/';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  public getAllState(name: string): any {
    return this.http.get<any>(this.urlEndPoint + 'find/' + name);
  }
}

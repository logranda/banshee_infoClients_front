import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Visit} from "../model/visit";

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private urlEndPoint = environment.apiUrl + 'visit/';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  public save(object: Visit): any {
    return this.http.post<any>(this.urlEndPoint, object);
  }
}

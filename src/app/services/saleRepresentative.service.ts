import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class  SaleRepresentativeService {
  private urlEndPoint = environment.apiUrl + 'salerepresentative/';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  public getAllSaleRepresentative(): any {
    return this.http.get<any>(this.urlEndPoint + 'all');
  }
}

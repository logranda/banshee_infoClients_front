import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {MatPaginator} from "@angular/material/paginator";

@Injectable({
  providedIn: 'root'
})
export class CostumerService {
  private urlEndPoint = environment.apiUrl + 'customer/';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  public getColumns(): any {
    // tslint:disable-next-line:only-arrow-functions
    return Observable.create(function (observer) {
      observer.next({
        pageIndex: 0,
        pageSize: 10,
        displayedColumns: [
          {name: 'id', type: 'number', description: 'Id'},
          {name: 'fullName', type: 'string', description: 'Nombre'},
          {name: 'address', type: 'string', description: 'Direccion'},
          {name: 'phone', type: 'number', description: 'Telefono'},

        ]
      });
    });
  }

  getResponse(object: any, matPaginator: MatPaginator): any {
    console.log('objeto de entrada en consulta dinamica', object, matPaginator);
    const a = JSON.stringify(object);
    let b = JSON.parse(a);
    console.log(matPaginator.pageSize, matPaginator.pageIndex);
    b.pageNumber = matPaginator.pageIndex;
    b.numberElements = matPaginator.pageSize;
    b = JSON.stringify(b);
    return this.http.post(this.urlEndPoint + 'all', b, {headers: this.headers});
  }

  public save(object: any): any {
    return this.http.post<any>(this.urlEndPoint, object);
  }
}

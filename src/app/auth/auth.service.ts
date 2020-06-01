import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  // tslint:disable-next-line:variable-name
  private _user: User;

  public get user(): User {
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    return new User();
  }

  // tslint:disable-next-line:variable-name
  private _token: string;

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._user == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(user: User): Observable<any> {
    console.log('va al servicio de autenticar', user);
    const urlEndpoint = this.apiUrl + 'oauth/token';
    // @ts-ignore
    user.secret = btoa('infoclients' + ':' + '12345');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + user.secret
    });
    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
    return this.httpClient.post(urlEndpoint, params.toString(), {headers: httpHeaders});
  }

  saveUser(accessToken: string): void {
    const payload = this.getTokenData(accessToken);
    this._user = new User();
    // @ts-ignore
    this._user.name = payload.nombre;
    // @ts-ignore
    this._user.email = payload.email;
    this._user.username = payload.user_name;
    // @ts-ignore
    this._user.roles = payload.authorities;
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', this._token);
  }

  getTokenData(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    const payload = this.getTokenData(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  logout() {
    this._token = null;
    this._user = null;
    sessionStorage.clear();
  }

  hasRole(role: string): boolean {
    // @ts-ignore
    if (this.user.roles.includes(role)) {
      return true;
    }
    return false;
  }
}

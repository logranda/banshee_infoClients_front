import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import swal from 'sweetalert2';
import {catchError} from 'rxjs/operators';

import {Observable, throwError} from 'rxjs';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        // tslint:disable-next-line:triple-equals
        if (err.status == 401) {
          if (this.authService.isAuthenticated()) {
            this.authService.logout();
          }
          swal.fire('Acceso denegado', `Usuario o contraseña errados`, 'warning');
          this.router.navigate(['/login']);
          // tslint:disable-next-line:triple-equals
        } else if (err.status == 403) {
          swal.fire('Acceso denegado', `${this.authService.user.fullName} no tienes acceso a este recurso`, 'warning');
          this.router.navigate(['/home']);
        }
        return throwError(err);
      })
    );
  }
}

import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import Swal from 'sweetalert2';
import {ValidatorService} from '../commons/utility/validator.service';
import {NgModel} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'angular-loader';
  user: User;
  hide = true;

  response: string;

  constructor(private authService: AuthService,
              private router: Router,
              public validatorService: ValidatorService,
              private cookieService: CookieService,
  ) {
    this.user = new User();
  }


  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      Swal.fire('Login', `Hola ${this.authService.user.username}, ya estas autenticado!`, 'info');
      this.router.navigate(['/home']);
    }
  }

  login() {
    console.log('logranda login', this.user);
    if (this.user.username == null || this.user.password == null) {
      Swal.fire('Error Login', 'Username o password vacío', 'error');
      return;
    }
    this.authService.login(this.user).subscribe(response => {
      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      const usuario = this.authService.user;
      Swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito`, 'success');
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
      // tslint:disable-next-line:triple-equals
      if (error.status == 400) {
        Swal.fire('Error Login', 'Inicio de sesión fallido!<br/>Por favor verifica tu usuario y contraseña e intenta nuevamente.', 'error');
      }
    });
  }


  getErrorMessageEmail(usernameLogin: NgModel): string {
    return this.validatorService.getErrorMessageEmail(usernameLogin);
  }

  getErrorMessagePassword(passwordLogin: NgModel) {
    return this.validatorService.getErrorMessagePassword(passwordLogin);
  }
}

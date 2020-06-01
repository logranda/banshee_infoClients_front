import {Injectable} from '@angular/core';
import {NgModel} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  // email = new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.mailRegex)]);

  constructor() {
  }

  _mailRegex = '^(("[\\w-\\s]+")|([\\w-]+(?:\\.[\\w-]+)*)|("[\\w-\\s]+")([\\w-]+(?:\\.[\\w-]+)*))(@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$)|(@\\[?((25[0-5]\\.|2[0-4][0-9]\\.|1[0-9]{2}\\.|[0-9]{1,2}\\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\]?$)';

  public get mailRegex(): string {
    return this._mailRegex;
  }

  getErrorMessageEmail(usernameLogin: NgModel): string {
    if (usernameLogin.errors.required) {
      return 'Debes ingresar tu usuario';
    } else if (usernameLogin.errors.pattern) {
      return 'no es un correo valido';
    }
    return '';
  }

  getErrorMessagePassword(passwordLogin: NgModel) {
    console.log(passwordLogin.errors);
    if (passwordLogin.errors.required) {
      return 'la contraseña es requerida';
    } else if (passwordLogin.errors.minlength) {
      return 'la contraseña debe tener una longitud mínima de ' + passwordLogin.errors.minlength.requiredLength;
    }
    return '';
  }
}

import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public  authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    Swal.fire('Logout', `Hola ${this.authService.user.username}, has cerrado Sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }
}

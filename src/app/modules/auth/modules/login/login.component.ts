import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent {

  constructor(private router: Router) { }


  logIn() {
    console.log('Iniciar sesión');
    localStorage.setItem('token', '2947819045');
    this.router.navigate(['dashboard']);
  }
}
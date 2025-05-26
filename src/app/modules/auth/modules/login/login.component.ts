import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent {

  loginForm: FormGroup;


  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder, private httpclient: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }


  logIn() {
    if (this.loginForm.invalid) {
      alert('Formulario incompleto')
      return
    } else {
      const { email, password } = this.loginForm.value;
      const user = this.authService.login(email, password);

      /* if (user) {
        this.router.navigate(['/dashboard']);
      } else {
        alert('Email o contraseña incorrecto');
      } */
    }
  }
}
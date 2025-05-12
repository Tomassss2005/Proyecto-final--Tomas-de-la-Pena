import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {

  constructor(private router: Router) { }


  logOut() {
    console.log('Cerrar sesión')
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  logged: boolean = false;
  constructor() {}

  ngOnInit(): void {
    console.log(
      'userId: ',
      localStorage.getItem('userId'),
      '\ntoken: ',
      localStorage.getItem('token'),
      '\nexpiryDate: ',
      localStorage.getItem('expiryDate')
    );

    const expiryDate = localStorage.getItem('expiryDate');

    if (expiryDate) {
      if (new Date() > new Date(expiryDate)) {
        console.log('Token expirado');
        this.logout();
      } else if (
        localStorage.getItem('userId') != null &&
        localStorage.getItem('token') != null
      ) {
        this.logged = true;
      }
    }
  }

  logout() {
    // Eliminar los datos del localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    // Actualizar el valor de logged
    this.logged = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CountryApiService } from 'src/app/services/country-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit{
  usuario: Usuario;
  newPassword: string;
  countries: any = [];
  selectedCountry = '';

  constructor(private authService: AuthService, private router: Router, private countryService: CountryApiService) {
    this.usuario = new Usuario();
    this.newPassword = '';
  }
  ngOnInit(): void {
    this.getCountries();
  }

  signup() {
  
    const values = this.selectedCountry.split('-');
    this.usuario.country = {
      iso2: values[0],
      name: values[1]
    };
  
    this.authService
      .postSignup(this.usuario)
      .pipe(
        catchError((error) => {
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
          }
          return [];
        })
      )
      .subscribe((result) => {
        try {
          console.log(result);
  
          if (result) {
            this.router.navigate(['login']);
          }
        } catch (err) {
          console.log(err);
        }
      });
  }

  getCountries() {
    this.countryService.getCountries().subscribe(res => {
      try {
        console.log(res.data);
        this.countries = res.data;
      } catch (err) {
        console.log(err);
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
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
  }
}

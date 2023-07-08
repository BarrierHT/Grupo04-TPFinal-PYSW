import { Component, OnInit } from '@angular/core';
import { catchError, delay } from 'rxjs';
import { NotificationApiService } from 'src/app/services/notification-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  logged: boolean = false;
  myNotifications: any = [];
  constructor(private notificationService: NotificationApiService) {}

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

        this.notificationService
          .getNotifications()
          .pipe(
            catchError((error) => {
              //console.log('Error en el observable: ', error);
              if (error.status !== 200 && error.status !== 201) {
                console.log('Error en el observable: ', error.error.message);
                // throw new Error('');
              }
              return [];
            }),
            delay(500) // Agrega un retraso de 1 segundo
          )
          .subscribe((result) => {
            try {
              console.log(result);
              this.myNotifications = result.notifications;
              for (const notification of this.myNotifications) {
                const message = notification.content;

                const linkIndex = message.lastIndexOf('link: ');
                const link = message.substring(linkIndex + 6);

                notification.content = message.substring(0, linkIndex);
                notification.linkUrl = link;

                // console.log("Antes del enlace:", beforeLink);
                // console.log('Enlace:', link);
              }
            } catch (err) {
              console.log(err);
            }
          });
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

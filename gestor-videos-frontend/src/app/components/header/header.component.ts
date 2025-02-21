import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, delay } from 'rxjs';
import { NotificationApiService } from 'src/app/services/notification-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  logged: boolean = false;
  isGestor: boolean = false;
  isAdmin: boolean = false;
  myNotifications: any[] = [];
  newNotifications: any[] = [];
  oldNotifications: any[] = [];
  badgeNotification: string = '0';

  constructor(
    private notificationService: NotificationApiService,
    private toastrService: ToastrService
    ) {}

  ngOnInit(): void {
    console.log(
      'userId: ',
      localStorage.getItem('userId'),
      '\ntoken: ',
      localStorage.getItem('token'),
      '\nexpiryDate: ',
      localStorage.getItem('expiryDate'),
      '\nuserRole: ',
      localStorage.getItem('userRole')
    );

    const expiryDate = localStorage.getItem('expiryDate');

    if (expiryDate) {
      if (new Date() > new Date(expiryDate)) {
        console.log('Token expirado');
        this.logout();
      } else if (
        localStorage.getItem('userId') != null &&
        localStorage.getItem('token') != null &&
        localStorage.getItem('userRole') != null
      ) {
        this.logged = true;
        if (localStorage.getItem('userRole') == 'gestor') 
          this.isGestor = true;
        else if (localStorage.getItem('userRole') == 'admin')
          this.isAdmin = true;
        this.getNotifications();
        //this.toastrService.success('¡Bienvenido!');
      }
    }
  }

  getNotifications() {
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
          }

          this.newNotifications = this.myNotifications.filter(
            (notification) => !notification.viewed
          );

          this.badgeNotification = this.newNotifications.length.toString();

          this.oldNotifications = this.myNotifications.filter(
            (notification) => notification.viewed
          );
        } catch (err) {
          console.log(err);
        }
      });
  }

  viewNotifications() {
    this.notificationService
      .putNewNotifications(this.newNotifications)
      .pipe(
        catchError((error) => {
          //console.log('Error en el observable: ', error);
          if (error.status !== 200 && error.status !== 201) {
            console.log('Error en el observable: ', error.error.message);
            // throw new Error('');
          }
          return [];
        })
      )
      .subscribe((result) => {
        try {
          console.log(result);
        } catch (err) {
          console.log(err);
        }
      });
  }

  onNotificationModalHidden() {
    this.newNotifications = [];
    this.badgeNotification = '0';

    this.oldNotifications = this.myNotifications;
  }

  logout() {
    // Eliminar los datos del localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userRole');
    // Actualizar el valor de logged
    this.logged = false;
    this.toastrService.error('¡La sesión ha expirado!');
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, delay } from 'rxjs';
import { PlaylistApiService } from 'src/app/services/playlist-api.service';

@Component({
  selector: 'app-list-video',
  templateUrl: './list-video.component.html',
  styleUrls: ['./list-video.component.css'],
})
export class ListVideoComponent implements OnInit {
  newPlaylist: any = {
    name: '',
    description: '',
    videos: [],
    owner: '',
  };

  playlists: any[] = [];

  constructor(
    private router: Router,
    private playlistApiService: PlaylistApiService,
    private toastrService: ToastrService
  ) { }

  async ngOnInit(): Promise<void> {
    this.searchPlaylists();
  }

  searchPlaylists() {
    this.playlistApiService
      .getPlaylistsByUser()
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
          this.playlists = result.playlists;
        } catch (err) {
          console.log(err);
        }
      });
  }

  // showPlaylistVideos() {
  //   this.router.navigate(['watch/a'], {
  //     queryParams: { playlist: 'aa', index: 1 },
  //   });
  // }

  getPlaylist(playlistId: string) {
    this.playlistApiService.getPlaylist(playlistId).subscribe((res) => {
      try {
        console.log("GET PLAYLIST LIST-VIDEO")
        console.log(res);
        if (res.videos.length < 1) 
          this.toastrService.warning('La playlist no tiene videos aún!', 'Información Playlist');
          //alert('La playlist no tiene videos aún!');
        else 
          this.router.navigate(['watch', res.videos[0].videoId._id, 'playlist', res._id]);
        //this.router.navigate(['watch', res.videos[0].videoId], { queryParams: { playlist: res._id } });
      } catch (err) {
        console.log(err);
      }
    });
  }

  addPlaylist() {
    this.newPlaylist.owner = localStorage.getItem('userId');
    console.log(this.newPlaylist);
    this.playlistApiService.postPlaylist(this.newPlaylist).subscribe((res) => {
      try {
        console.log(res);
        this.toastrService.success('Se ha creado la playlist exitosamente', 'Creación Correcta');
        this.searchPlaylists();
      } catch (err) {
        console.log(err);
        this.toastrService.error('No se ha podido crear la playlist correctamente', 'Creación Incorrecta');
      }
    });
  }

  resetModal(playlistForm: NgForm) {
    playlistForm.resetForm();
    playlistForm.reset();
  }
}

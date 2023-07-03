import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private playlistApiService: PlaylistApiService) {
  }

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

  showPlaylistVideos() {
    this.router.navigate(['watch/a'], {
      queryParams: { playlist: 'aa', index: 1 },
    });
  }

  addPlaylist() {
    this.newPlaylist.owner = localStorage.getItem('userId');
    console.log(this.newPlaylist);
    this.playlistApiService.postPlaylist(this.newPlaylist).subscribe((res) => {
      try {
        console.log(res);
        this.searchPlaylists();
      } catch (err) {
        console.log(err);
      }
    });
  }

  resetModal(playlistForm: NgForm) {
    playlistForm.resetForm();
    playlistForm.reset();
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-video',
  templateUrl: './list-video.component.html',
  styleUrls: ['./list-video.component.css'],
})
export class ListVideoComponent {
  newPlaylist: any;
  playlists: Array<any>;
  constructor(private router: Router) {
    this.newPlaylist = { nombre: '', descripcion: '' };
    this.playlists = [
      { nombre: 'Tutorials', descripcion: 'Generic playlist description' },
      { nombre: 'Rock music', descripcion: 'Generic playlist description' },
      { nombre: 'Gameplays', descripcion: 'Generic playlist description' },
      { nombre: 'Trap music', descripcion: 'Generic playlist description' },
      { nombre: 'Walktroughts', descripcion: 'Generic playlist description' },
    ];
  }
  resetModal() {
    // reset modal
  }

  showPlaylistVideos() {
    this.router.navigate(['watch/a'], {
      queryParams: { playlist: 'aa', index: 1 },
    });
  }
}

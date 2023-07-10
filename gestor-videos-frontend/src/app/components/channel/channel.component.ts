import { Component, OnInit } from '@angular/core';
import { ChannelApiService } from 'src/app/services/channel-api.service';
import { GroupApiService } from 'src/app/services/group-api.service';
import { VideoApiService } from 'src/app/services/video-api.service';
import { PlaylistApiService } from 'src/app/services/playlist-api.service';
import { Router } from '@angular/router';
import { CountryApiService } from 'src/app/services/country-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent implements OnInit {
  myGroups: Array<any> = [];
  showMyGroups: boolean = false;
  myChannel: any;
  myVideos: any = [];
  myPlaylists: any = [];
  country = {
    iso2: '',
    name: '',
    flag: '',
  };

  constructor(
    private groupService: GroupApiService,
    private channelService: ChannelApiService,
    private videoService: VideoApiService,
    private playlistService: PlaylistApiService,
    private countryService: CountryApiService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getMyChannel();
    await this.getMyVideos();
    await this.getMyPlaylists();
  }

  async getMyChannel(): Promise<void> {
    this.channelService.getChannel().subscribe((res) => {
      try {
        console.log(res);
        this.myChannel = res;
        this.country.name = res.owner.country.name;
        this.country.iso2 = res.owner.country.iso2;
        this.countryService.getFlag(this.country.iso2).subscribe((res) => {
          try {
            this.country.flag = res.data.flag;
          } catch (err) {
            console.log(err);
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  async getMyVideos(): Promise<void> {
    this.videoService.getVideosByUser().subscribe((res) => {
      try {
        this.myVideos = res.videos;
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    });
  }
  async getMyPlaylists(): Promise<void> {
    this.playlistService.getPlaylistsByUser().subscribe((res) => {
      try {
        this.myPlaylists = res.playlists;
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    });
  }

  redirectVideo(redirectSource: any, type: string) {
    if (type == 'playlist') {
      console.log('playlist: ', redirectSource);
      if (redirectSource.videos.length != 0) {
        const videoId = redirectSource.videos[0].videoId._id;
        this.router.navigate(['watch', videoId, 'playlist', redirectSource._id]);
        // this.router.navigate(['watch/' + videoId], {
        //   queryParams: {
        //     playlist: redirectSource.name,
        //     index: redirectSource.index,
        //   },
        // });
      } else {
        //alert('playlists sin videos');
        this.toastrService.warning('La playlist no tiene videos aún!', 'Información Playlist');
      }
    } else if (type == 'video') {
      this.router.navigate(['watch/' + redirectSource]);
    }
  }
}

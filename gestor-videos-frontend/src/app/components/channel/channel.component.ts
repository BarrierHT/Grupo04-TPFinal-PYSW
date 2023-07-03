import { Component, OnInit } from '@angular/core';
import { ChannelApiService } from 'src/app/services/channel-api.service';
import { GroupApiService } from 'src/app/services/group-api.service';
import { VideoApiService } from 'src/app/services/video-api.service';
import { PlaylistApiService } from 'src/app/services/playlist-api.service';

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

  constructor(
    private groupService: GroupApiService,
    private channelService: ChannelApiService,
    private videoService: VideoApiService,
    private playlistService: PlaylistApiService
  ) {}

  ngOnInit(): void {
    this.getMyChannel();
    this.getMyVideos();
    this.getMyPlaylists();
  }

  getMyChannel() {
    this.channelService.getChannel().subscribe((res) => {
      try {
        this.myChannel = res;
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    });
  }

  getMyPlaylists() {
    this.playlistService.getPlaylistsByUser().subscribe((res) => {
      try {
        res.playlists.forEach((p: any) => {
          this.myPlaylists.push(p);
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    });
  }

  getMyVideos() {
    this.videoService.getVideosByUser().subscribe((res) => {
      try {
        res.videos.forEach((v: any) => {
          this.myVideos.push(v);
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    });
  }

  someAction() {
    console.log(this.myGroups);
  }
}

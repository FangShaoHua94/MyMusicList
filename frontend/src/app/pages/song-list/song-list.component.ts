import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlayList } from 'src/app/models/playList.model';
import { Song } from 'src/app/models/song.model';
import { PlayListService } from 'src/app/playList.service';
import { SongService } from 'src/app/Song.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  songs;
  playList;
  selectedSong = null;

  constructor(private songService: SongService,
    private playListService: PlayListService,
    private route: ActivatedRoute,
    private router: Router,
    private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.playListId) {
        this.songService.getSongs(params.playListId).subscribe((songs: Song[]) => {
          this.songs = songs;
        })
        this.playListService.getPlayList(params.playListId).subscribe((playList: PlayList) => {
          this.playList = playList;
        })
      } else {
        this.songService.getAllSongs().subscribe((songs: Song[]) => {
          this.songs = songs;
        })
      }
    });
  }

  selectedSongClick(song) {
    if (this.selectedSong === song) {
      this.selectedSong = null;
    } else {
      this.selectedSong = null;
      this.selectedSong = song;
    }
  }
  // playSong(videoURL: string) {
  //   this.youtubeLink = videoURL;
  // }


  getVideoId(videoURL: string) {
    return videoURL.slice(videoURL.indexOf('watch?v=') + 8, 19 + videoURL.indexOf('watch?v='));
  }

  // convertUrl(videoURL: string) {
  //   let videoId = videoURL.slice(videoURL.indexOf('watch?v=') + 8, 19 + videoURL.indexOf('watch?v='))
  //   let modifiedUrl = "https://www.youtube.com/embed/" + videoId + "?autoplay=1"; 
  //   return this._sanitizer.bypassSecurityTrustResourceUrl(modifiedUrl);;
  // }

  onClickDeleteSong(song: any) {
    // need open alert for confirmation
    this.playList.songList = this.playList.songList.filter(songId => songId !== song._id);
    this.playListService.updatePlayList(this.playList._id, this.playList).subscribe((playList: PlayList) => {
      this.playList = playList;
      this.songService.getSongs(this.playList._id).subscribe((songs: Song[]) => {
        this.songs = songs;
      })
    });
  }
}

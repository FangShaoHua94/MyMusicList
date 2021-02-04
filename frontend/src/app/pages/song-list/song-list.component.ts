import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlayList } from 'src/app/models/playList.model';
import { Song } from 'src/app/models/song.model';
import { PlayListService } from 'src/app/playList.service';
import { SongService } from 'src/app/Song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  songs;
  playList;

  constructor(private songService: SongService, private playListService: PlayListService, private route: ActivatedRoute, private router: Router) { }

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
    }
    );
  }

  onEditSongClick() {
    //open modal with filled field

  }

  onDeleteSongClick(song: any) {
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

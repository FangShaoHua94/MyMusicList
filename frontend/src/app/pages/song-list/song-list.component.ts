import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Song } from 'src/app/models/song.model';
import { SongService } from 'src/app/Song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  songs: Song[];

  toDisplay: boolean = false;

  constructor(private songService: SongService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      if (params.playListId) {
        this.songService.getSongs(params.playListId).subscribe((songs: Song[]) => {
          this.songs = songs;
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

  onDelelteSongClick() {
    //open modal for confirmation

  }

  openModal() {
    this.toDisplay = !this.toDisplay;
  }


}

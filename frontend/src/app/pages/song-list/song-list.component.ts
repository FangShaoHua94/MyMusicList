import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song.model';
import { SongService } from 'src/app/Song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  songs: Song[];

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe((songs:Song[]) => {
      this.songs= songs;
    })
  }

}

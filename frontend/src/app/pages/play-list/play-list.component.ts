import { Component, OnInit } from '@angular/core';
import { PlayList } from 'src/app/models/playList.model';
import { playListService } from 'src/app/playList.service';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {

  playLists: PlayList[];

  constructor(private playListService: playListService) { }

  ngOnInit(): void {
    this.playListService.getAllPlayLists().subscribe((playLists: PlayList[]) => {
      this.playLists = playLists;
    })
  }

}

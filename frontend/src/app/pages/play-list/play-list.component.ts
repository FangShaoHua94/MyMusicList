import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PlayList } from 'src/app/models/playList.model';
import { PlayListService } from 'src/app/playList.service';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {

  playLists: any[];

  constructor(private playListService: PlayListService) { }

  ngOnInit(): void {
    this.playListService.getAllPlayLists().subscribe((playLists: PlayList[]) => {
      this.playLists = playLists;
    })
  }

}

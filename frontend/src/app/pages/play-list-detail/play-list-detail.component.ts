import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlayList } from 'src/app/models/playList.model';
import { PlayListService } from 'src/app/playList.service';

@Component({
  selector: 'app-play-list-detail',
  templateUrl: './play-list-detail.component.html',
  styleUrls: ['./play-list-detail.component.scss']
})
export class PlayListDetailComponent implements OnInit {

  title = "Add Play List";
  playList;
  editPlayList = false;

  constructor(private route: ActivatedRoute, private router: Router, private playListService: PlayListService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.playListId) {
          this.playListService.getPlayList(params.playListId).subscribe((playList: PlayList) => {
            this.playList = playList;
            this.editPlayList = true;
            this.title = "Edit Play List";
          })
        }
      })
  }

  onSubmit(form: NgForm) {
    const playList: PlayList = {
      title: form.value.title,
      genre: form.value.genre,
      remark: form.value.remark,
    }
    if (this.editPlayList) {
      // this.songService.updateSong(this.songId, song).subscribe((updatedSong: Song) => {
      //   this.song = updatedSong;
      //   this.router.navigate(['../'], { relativeTo: this.route });
      // });
    } else {
      this.playListService.createPlayList(playList).subscribe((playLists: PlayList[]) => {
        this.router.navigate(['/playLists']);
      });
    }
  }
}

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
  cancelRouterLink = '/playLists';

  constructor(private route: ActivatedRoute, private router: Router, private playListService: PlayListService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.playListId) {
          this.playListService.getPlayList(params.playListId).subscribe((playList: PlayList) => {
            this.playList = playList;
            this.editPlayList = true;
            this.title = "Edit Play List";
            this.cancelRouterLink = `/playLists/${params.playListId}`;
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
      this.playListService.updatePlayList(this.playList._id, playList).subscribe((playList: any) => {
        this.router.navigate([`/playLists/${playList._id}`]);
      });
    } else {
      this.playListService.createPlayList(playList).subscribe((playList: any) => {
        this.router.navigate([`/playLists/${playList._id}`]);
      });
    }
  }
}

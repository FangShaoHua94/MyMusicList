import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Song } from 'src/app/models/song.model';
import { PlayListService } from 'src/app/playList.service';
import { SongService } from 'src/app/Song.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlayList } from 'src/app/models/playList.model';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss']
})
export class SongDetailComponent implements OnInit {

  playListId;
  playList;
  song;

  constructor(private songService: SongService, private route: ActivatedRoute, private router: Router, private playListService: PlayListService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.playListId = params.playListId;
      }
    );
    this.playListService.getPlayList(this.playListId).subscribe((playList: PlayList) => {
      this.playList = playList;
      console.log(playList)
      console.log(playList.songList);
    })
  }

  onSubmit(form: NgForm) {
    const minute = form.value.minute ? form.value.minute : '0';
    const second = form.value.second ? form.value.second : '00';
    const song: Song = {
      title: form.value.title,
      artist: form.value.artist,
      genre: form.value.genre,
      releaseDate: form.value.releaseDate,
      youtubeLink: form.value.youtubeLink,
      remark: form.value.remark,
      duration: minute + ':' + second,
      tags: form.value.tags.split(','),
      album: form.value.album,
      numPlayed: form.value.numPlayed,
    }
    console.log(song);
    this.songService.createSong(song).subscribe((song: Song) => {
      this.playList.songList.push(song._id);
      this.song = song;
      this.playListService.updatePlayList(this.playListId, this.playList).subscribe((playList: PlayList) => {
        this.playList = playList;
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    });
  }
}

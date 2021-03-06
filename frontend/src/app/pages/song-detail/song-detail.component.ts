import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Duration, Song } from 'src/app/models/song.model';
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
  songId;
  editSong = false;
  title = "Add New Song";

  constructor(private songService: SongService, private route: ActivatedRoute, private router: Router, private playListService: PlayListService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.playListId) {
          this.playListId = params.playListId;
          this.playListService.getPlayList(this.playListId).subscribe((playList: PlayList) => {
            this.playList = playList;
          })
        }
        if (params.songId) {
          this.songId = params.songId;
          this.editSong = true;
          this.title = "Edit Song";
          this.songService.getSong(this.songId).subscribe((song: Song) => {
            this.song = song;
          })
        }
      }
    );
  }

  onSubmit(form: NgForm) {
    const minutes:Number = form.value.minute ? form.value.minute : 0;
    const seconds:Number = form.value.second ? form.value.second : 0;
    const tags = form.value.tags ? form.value.tags.toString().split(',') : [];
    const duration: Duration = {
      minutes: minutes,
      seconds: seconds,
    }
    const song: Song = {
      title: form.value.title,
      artist: form.value.artist,
      genre: form.value.genre,
      releaseDate: form.value.releaseDate,
      youtubeLink: form.value.youtubeLink,
      remark: form.value.remark,
      duration: duration,
      tags: tags,
      album: form.value.album,
      numPlayed: form.value.numPlayed,
    }
    if (this.editSong) {
      this.songService.updateSong(this.songId, song).subscribe((updatedSong: Song) => {
        this.song = updatedSong;
        this.router.navigate(['../..'], { relativeTo: this.route });
      });
    } else {
      this.songService.createSong(song).subscribe((song: any) => {
        this.playList.songList.push(song._id);
        this.playListService.updatePlayList(this.playListId, this.playList).subscribe((playList: PlayList) => {
          this.playList = playList;
          this.router.navigate(['../'], { relativeTo: this.route });
        });
      });
    }
  }
}

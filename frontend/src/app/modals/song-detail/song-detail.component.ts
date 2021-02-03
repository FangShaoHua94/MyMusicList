import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Song } from 'src/app/models/song.model';
import { playListService } from 'src/app/playList.service';
import { SongService } from 'src/app/Song.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss']
})
export class SongDetailComponent implements OnInit {

  @Input() toDisplay: boolean;
  @Output() toDisplayChange = new EventEmitter<boolean>();

  constructor(private songService: SongService, private playListService: playListService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.toDisplay = !(this.toDisplay);
    this.toDisplayChange.emit(this.toDisplay);
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
    this.songService.createSong(song);
    // this.notesService.update(this.noteId, form.value.title, form.value.body);
    this.closeModal();
  }


}

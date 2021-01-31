import { Injectable } from '@angular/core';
import { Song } from './models/song.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  readonly API_SUB_ROOT_URL;

  constructor(private webRequestService: WebRequestService) {
    this.API_SUB_ROOT_URL = 'mySongs';
   }

  getAllSongs() {
    return this.webRequestService.get(this.API_SUB_ROOT_URL);
  }

  createSong(Song: Song) {
    return this.webRequestService.post(this.API_SUB_ROOT_URL, { Song });
  }

  updateSong(songId: Number, updatedSong: Song) {
    return this.webRequestService.patch(`${this.API_SUB_ROOT_URL}/${songId}`, { updatedSong });
  }

  deleteSong(songId: Number) {
    return this.webRequestService.delete(`${this.API_SUB_ROOT_URL}/${songId}`);
  }

}

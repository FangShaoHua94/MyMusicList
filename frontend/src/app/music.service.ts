import { Injectable } from '@angular/core';
import { Music } from './models/music.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  readonly API_SUB_ROOT_URL;

  constructor(private webRequestService: WebRequestService) {
    this.API_SUB_ROOT_URL = 'myMusic';
   }

  getAllMusic() {
    return this.webRequestService.get(this.API_SUB_ROOT_URL);
  }

  createMusic(music: Music) {
    return this.webRequestService.post(this.API_SUB_ROOT_URL, { music });
  }

  updateMusic(musicId: Number, updatedMusic: Music) {
    return this.webRequestService.patch(`${this.API_SUB_ROOT_URL}/${musicId}`, { updatedMusic });
  }

  deleteMusic(musicId: Number) {
    return this.webRequestService.delete(`${this.API_SUB_ROOT_URL}/${musicId}`);
  }

}

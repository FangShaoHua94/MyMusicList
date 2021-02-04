import { Injectable } from '@angular/core';
import { PlayList } from './models/playList.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class PlayListService {

  readonly API_SUB_ROOT_URL;

  constructor(private webRequestService: WebRequestService) {
    this.API_SUB_ROOT_URL = "myPlayLists";
  }

  getAllPlayLists() {
    return this.webRequestService.get(this.API_SUB_ROOT_URL);
  }

  getPlayList(playListId: Number) {
    return this.webRequestService.get(`${this.API_SUB_ROOT_URL}/${playListId}`);
  }

  createPlayList(playList: PlayList) {
    return this.webRequestService.post(this.API_SUB_ROOT_URL, playList);
  }

  updatePlayList(playListId: Number, updatedPlayList: PlayList) {
    return this.webRequestService.patch(`${this.API_SUB_ROOT_URL}/${playListId}`, updatedPlayList);
  }

  deletePlayList(playListId: Number) {
    return this.webRequestService.delete(`${this.API_SUB_ROOT_URL}/${playListId}`);
  }
}

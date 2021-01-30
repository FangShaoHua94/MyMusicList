import { Injectable } from '@angular/core';
import { MusicFolder } from './models/musicFolder.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class MusicFolderService {

  readonly API_SUB_ROOT_URL;

  constructor(private webRequestService: WebRequestService) {
    this.API_SUB_ROOT_URL="myMusicFolder";
   }

  getAllMusicFolders() {
    return this.webRequestService.get(this.API_SUB_ROOT_URL);
  }

  createMusicFolder(musicFolder: MusicFolder) {
    return this.webRequestService.post(this.API_SUB_ROOT_URL, { musicFolder });
  }

  updateMusicFolder(musicFolderId: Number, updatedMusicFolder: MusicFolder) {
    return this.webRequestService.patch(`${this.API_SUB_ROOT_URL}/${musicFolderId}`, { updatedMusicFolder });
  }

  deleteMusicFolder(musicFolderId: Number) {
    return this.webRequestService.delete(`${this.API_SUB_ROOT_URL}/${musicFolderId}`);
  }
}

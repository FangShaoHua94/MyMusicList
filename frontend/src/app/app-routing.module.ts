import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';
import { SongDetailComponent } from './pages/song-detail/song-detail.component';

const routes: Routes = [
  {
    path: '', component: MainPageComponent, children: [
      { path: '', component: MusicPageComponent },
      { path: 'playLists', component: MusicPageComponent },
      { path: 'playLists/:playListId', component: MusicPageComponent },
      { path: 'playLists/:playListId/new-song', component: SongDetailComponent },
      { path: 'playLists/:playListId/:songId', component: SongDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

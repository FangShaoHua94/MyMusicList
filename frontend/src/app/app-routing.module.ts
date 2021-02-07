import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';
import { PlayListDetailComponent } from './pages/play-list-detail/play-list-detail.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { SongDetailComponent } from './pages/song-detail/song-detail.component';

const routes: Routes = [
  {
    path: '', component: MainPageComponent, children: [
      { path: '', component: MusicPageComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'sign-up', component: SignUpPageComponent },
      { path: 'playLists', component: MusicPageComponent },
      { path: 'playLists/:playListId', component: MusicPageComponent },
      { path: 'new-playList', component: PlayListDetailComponent},
      { path: 'edit-playList/:playListId', component: PlayListDetailComponent},
      { path: 'playLists/:playListId/new-song', component: SongDetailComponent },
      { path: 'playLists/:playListId/edit-song/:songId', component: SongDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

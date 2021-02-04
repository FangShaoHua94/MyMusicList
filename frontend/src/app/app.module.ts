import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';
import { PlayListComponent } from './pages/play-list/play-list.component';
import { SongListComponent } from './pages/song-list/song-list.component';
import { SongDetailComponent} from './pages/song-detail/song-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MusicPageComponent,
    PlayListComponent,
    SongListComponent,
    SongDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

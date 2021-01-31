import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';
import { PlayListComponent } from './pages/play-list/play-list.component';
import { SongListComponent } from './pages/song-list/song-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MusicPageComponent,
    PlayListComponent,
    SongListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

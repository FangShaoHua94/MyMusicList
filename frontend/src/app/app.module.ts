import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';
import { PlayListComponent } from './pages/play-list/play-list.component';
import { SongListComponent } from './pages/song-list/song-list.component';
import { SongDetailComponent } from './pages/song-detail/song-detail.component';
import { PlayListDetailComponent } from './pages/play-list-detail/play-list-detail.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { WebRequestInterceptor } from './web-request.interceptor.service';
import { YouTubePlayerModule } from '@angular/youtube-player';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MusicPageComponent,
    PlayListComponent,
    SongListComponent,
    SongDetailComponent,
    PlayListDetailComponent,
    LoginPageComponent,
    SignUpPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    YouTubePlayerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

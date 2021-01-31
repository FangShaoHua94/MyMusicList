import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';

const routes: Routes = [
  {path: '', component:MainPageComponent, children:[
    {path: '', component: MusicPageComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

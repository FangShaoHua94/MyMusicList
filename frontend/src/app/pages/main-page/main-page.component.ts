import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  isLogin = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }
}

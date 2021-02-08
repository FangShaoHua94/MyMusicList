import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  revealPassword = false;
  validLogin = true;

  constructor(private authSerivce: AuthService) { }

  ngOnInit(): void {
  }

  togglePasswordReveal() {
    this.revealPassword = !this.revealPassword;
  }

  onSubmit(form: NgForm) {
    this.validLogin = false;
    this.authSerivce.login(form.value.email, form.value.password).subscribe((res: HttpResponse<any>) => {
      if(res.status !== 400) {
        this.validLogin = true;
      }
    })
  }

}

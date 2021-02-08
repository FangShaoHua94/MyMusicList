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

  constructor(private authSerivce: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.authSerivce.login(form.value.email, form.value.password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
    })
  }

}

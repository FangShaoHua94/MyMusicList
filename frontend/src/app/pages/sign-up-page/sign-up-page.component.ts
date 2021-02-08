import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  passwordMatch = true;
  revealPassword = false;

  constructor(private authSerivce: AuthService) { }

  ngOnInit(): void {
  }

  togglePasswordReveal() {
    this.revealPassword = !this.revealPassword;
  }

  onSubmit(form: NgForm) {
    if (form.value.password === form.value.reconfirmPassword) {
      this.passwordMatch = true;
      this.authSerivce.signup(form.value.email, form.value.password).subscribe((res: HttpResponse<any>) => {
        console.log(res);
      })
    }else {
      this.passwordMatch = false;
    }
  }
}

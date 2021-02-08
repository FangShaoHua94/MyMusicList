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

  constructor(private authSerivce: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.authSerivce.signup(form.value.email, form.value.password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
    })
  }
}

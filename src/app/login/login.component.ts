import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private location: Location,private loginService: LoginService,private router: Router,private cookieService: CookieService) { }

  ngOnInit() {
    const token = this.cookieService.get('token');
    console.log("aaa")
    if(token){
      this.loginService.getUserDataByToken(token)
      .subscribe((res) => {
      if(res){
          this.router.navigate(['hello']);
      }
      });
    }
  }

  onSubmit() {
    console.warn(this.loginForm.value);
    this.loginService.sendUserData(this.loginForm.value)
    .subscribe((res) => {
    if(res){
        if(res.accessToken){
          var token = res.accessToken;
          console.log(token);
          this.router.navigate(['hello']);
          this.cookieService.set( 'token', token );
        }
    }
    });

  }

}

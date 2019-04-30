import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  constructor(private router: Router,private cookieService: CookieService,private loginService: LoginService) { }

  ngOnInit() {
    console.log("aaahao")
    const token = this.cookieService.get('token');
    if(token){
      this.loginService.getUserDataByToken(token)
      .subscribe((res) => {
      if(!res){
          this.router.navigate(['login']);
      }
      });
    } else {
      this.router.navigate(['login']);
    }
  }

  logout() {
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }

}

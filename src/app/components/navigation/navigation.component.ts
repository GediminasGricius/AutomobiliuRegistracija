import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponseData } from 'src/app/models/authResponseData';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public isLoggedin=false;
  public user?:AuthResponseData;

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.isLoggedin=this.auth.isLoggedIn;
    this.user=this.auth.user;
    this.auth.userUpdated.subscribe(()=>{
      this.isLoggedin=this.auth.isLoggedIn;
      this.user=this.auth.user;
    });
  }

  public onLogout(){
    this.auth.logout();
    this.router.navigate(['/login']);

  }


}

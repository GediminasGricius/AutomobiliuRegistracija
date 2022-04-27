import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponseData } from 'src/app/models/authResponseData';
import { Registration } from 'src/app/models/registration';
import { AuthService } from 'src/app/services/auth.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public registrations:Registration[]=[];
  public isLoggedin=false;
  public user?:AuthResponseData;

  constructor(private registrationService:RegistrationService, private auth:AuthService, private router:Router) { }

  private loadData(){
    this.registrationService.getRegistrations().subscribe((response)=>{
      this.registrations=response;
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.isLoggedin=this.auth.isLoggedIn;
    this.user=this.auth.user;
  }

  deleteRegistration(id:String){
    this.registrationService.deleteRegistration(id).subscribe((response)=>{
      this.loadData();
    });
  }

  onLogout(){
    this.auth.logout();
    this.router.navigate(['/login']);


  }



}

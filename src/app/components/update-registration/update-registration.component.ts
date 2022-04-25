import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Registration } from 'src/app/models/registration';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-update-registration',
  templateUrl: './update-registration.component.html',
  styleUrls: ['./update-registration.component.css']
})
export class UpdateRegistrationComponent implements OnInit {

  public id:String;
  public registration:Registration=new Registration("","","","",0);
  public isData=false;

  constructor(private registrationService:RegistrationService, private router:Router, private route:ActivatedRoute) { 
    this.id=this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
   
    this.registrationService.getRegistration(this.id).subscribe((response)=>{
      this.registration=response;
      this.isData=true;
      console.log(this.registration);
    })
  }

  public onSubmit(){
   
    
    console.log(this.registration);
    this.registrationService.updateRegistration(this.registration).subscribe(()=>{
      this.router.navigate(["/"]);
    });
  }

}

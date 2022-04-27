import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData } from 'src/app/models/authResponseData';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  public isLoginMode=true;
  public errorMessage="";

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {}

  public onSubmit(form:NgForm){
    const email:String=form.value.email;
    const password:String=form.value.password;
    let respObs:Observable<AuthResponseData>;
    if (this.isLoginMode){
      respObs=this.auth.login(email,password);
    }else{
      respObs=this.auth.register(email,password);
    }
    
    respObs.subscribe({
      next:()=>{
        this.router.navigate(['/']);
      },
      error:(er)=>{
        if (er.error && er.error.error){ 
            switch (er.error.error.message){
              case 'EMAIL_NOT_FOUND': this.errorMessage="Toks vartotojas neegzistuoja"; break;
              case 'INVALID_PASSWORD': this.errorMessage="Neteisingas slaptažodis"; break;
              case 'USER_DISABLED': this.errorMessage="Vartotojas išjungtas"; break;
              case 'EMAIL_EXISTS': this.errorMessage="Toks vartotojas jau egzistuoja"; break;
              case 'OPERATION_NOT_ALLOWED': this.errorMessage="Vartotojų registracija užblokuota"; break;
              case 'TOO_MANY_ATTEMPTS_TRY_LATER': this.errorMessage="Bandykite vėliau"; break;
            }
        }
      }
    });
    

  }

}

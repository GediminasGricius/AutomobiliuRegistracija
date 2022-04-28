import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthResponseData } from '../models/authResponseData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn=false;
  public user?:AuthResponseData;
  private key="AIzaSyCt63eSHlVde6Jqubnf7IIkv-zwVdzD9xQ";
  public userUpdated=new EventEmitter();

  constructor(private http:HttpClient) { }

  private authAPICall(url:string, email:String, password:String){

    return this.http.post<AuthResponseData>(url,{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(  tap(  (response)=>{
      this.isLoggedIn=true;
      this.user=response;
      this.userUpdated.emit();
    }));

  }

  public register(email:String,password:String){
    return this.authAPICall("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+this.key,email,password);
  }

  public login(email:String,password:String){

    return this.authAPICall("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+this.key,email,password);

  }



  public logout(){
    this.isLoggedIn=false;
    this.user=undefined;
    this.userUpdated.emit();
  }

}

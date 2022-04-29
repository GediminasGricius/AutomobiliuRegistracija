import { getLocaleTimeFormat } from '@angular/common';
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
      this.user.expires=new Date().getTime()+ +response.expiresIn*1000;
      this.userUpdated.emit();
      localStorage.setItem('user', JSON.stringify(this.user));
    }));
  }

  public autoLogin(){
    const data=localStorage.getItem('user');
    if (data!=null){
      
      const user:AuthResponseData=JSON.parse(data);
      if (user.expires!=null && user.expires>new Date().getTime()){
        this.user=new AuthResponseData(user.kind,user.idToken,user.email,user.refreshToken,user.expiresIn,user.localId);
        this.isLoggedIn=true;
      }
    }
  }

  public register(email:String,password:String){
    return this.authAPICall("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+this.key,email,password);
  }

  public login(email:String,password:String){

    return this.authAPICall("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+this.key,email,password);

  }
/*
  public changPassword(){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:update?key="+this.key,{
      ...slapažodis....
      ...idToken... 
      returnSecureToken:true
    }).pipe(  tap(  (response)=>{
      this.isLoggedIn=true;
      this.user=response;
      this.userUpdated.emit();
    }));
  }
*/
  public logout(){
    this.isLoggedIn=false;
    this.user=undefined;
    localStorage.removeItem('user');
    this.userUpdated.emit();
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthResponseData } from '../models/authResponseData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn=false;
  public user?:AuthResponseData;

  constructor(private http:HttpClient) { }

  public register(email:String,password:String){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCt63eSHlVde6Jqubnf7IIkv-zwVdzD9xQ',{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(  tap(  (response)=>{
      this.isLoggedIn=true;
      this.user=response;
    }));
  }

  public login(email:String,password:String){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCt63eSHlVde6Jqubnf7IIkv-zwVdzD9xQ',{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(  tap(  (response)=>{
      this.isLoggedIn=true;
      this.user=response;
    }));
  }

  public logout(){
    this.isLoggedIn=false;
    this.user=undefined;
  }

}

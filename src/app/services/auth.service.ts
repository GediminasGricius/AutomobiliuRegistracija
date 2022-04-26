import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  public register(email:String,password:String){
    this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCt63eSHlVde6Jqubnf7IIkv-zwVdzD9xQ',{
      email:email,
      password:password,
      returnSecureToken:true
    }).subscribe((response)=>{
      console.log(response);
    })
  }
}

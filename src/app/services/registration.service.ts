import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registration } from '../models/registration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private readonly url:String="https://autoreg-b143a-default-rtdb.europe-west1.firebasedatabase.app"; 

  constructor(private http:HttpClient) { 

  }


  public addRegistration(registration:Registration){
    return this.http.post(this.url+"/registrations.json",registration);
  }
}

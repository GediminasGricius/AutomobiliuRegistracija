import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Registration } from '../models/registration';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private readonly url:String="https://autoreg-b143a-default-rtdb.europe-west1.firebasedatabase.app"; 

  constructor(private http:HttpClient, private auth:AuthService) { 

  }


  public addRegistration(registration:Registration){
    return this.http.post<{name:string}>(this.url+"/registrations.json",registration);
  }

  public getRegistration(id:String){
    return this.http.get<Registration>(this.url+"/registrations/"+id+".json").pipe( map((response)=>{
      response.id=id;
      return response;
    }));
  }

  public getRegistrations(){
    return this.http.get<{[key:string]:Registration}>(this.url+"/registrations.json").pipe( map((response)=>{
      const regArray:Registration[]=[];
      for(let key in response){
        regArray.push({...response[key],id:key});
      }
      return regArray;
    }));
  }

  public updateRegistration(registration:Registration){
    return this.http.patch(this.url+"/registrations/"+registration.id+".json", registration);
  }

  public deleteRegistration(id:String){
    return this.http.delete(this.url+"/registrations/"+id+".json");
  }
}

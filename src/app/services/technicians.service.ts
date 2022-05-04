import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Technician } from '../models/technician';

@Injectable({
  providedIn: 'root'
})
export class TechniciansService {

  private readonly url:String="https://autoreg-b143a-default-rtdb.europe-west1.firebasedatabase.app"; 

  constructor(private http:HttpClient) { 

  }


  public addNewTechnician(tecnician:Technician){

    return this.http.post<{name:string}>(this.url+"/technician.json",tecnician);
  }

  public getTechnicians(){
    return this.http.get<{[key:string]:Technician}>(this.url+"/technician.json").pipe(map((respons)=>{
      const technicians:Technician[]=[];
      for(let key in respons){
        technicians.push({...respons[key],id:key})
      }
      return technicians;
    }))
  }

  public isCityAvailable(city:String){
    return this.http.get<number|null>(this.url+"/cities/"+city+".json").pipe(
      map((respons)=>{
        if (respons==null || respons==0){
          return false;
        }else{
        
          return true;
        }
      }));
  }

  public decreaseCityPlaces(city:string){
    return this.http.patch(this.url+"/cities.json", {[city]:0});
  }
}

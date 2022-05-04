import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';
import { TechniciansService } from 'src/app/services/technicians.service';

@Component({
  selector: 'app-new-technician',
  templateUrl: './new-technician.component.html',
  styleUrls: ['./new-technician.component.css']
})
export class NewTechnicianComponent implements OnInit {
  public technicianForm:FormGroup;
  
  constructor(private techService:TechniciansService) { 
    this.technicianForm=new FormGroup({
      'name':new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      'surname':new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      'level':new FormControl(null, [Validators.required, this.checkLevel]),
      'education':new FormArray([]),
      'address':new FormArray([])
    });
  }

  ngOnInit(): void {
   
  }

  onSubmit(){
    this.techService.addNewTechnician(this.technicianForm.value).subscribe(()=>{
      this.technicianForm.reset();
    })
   
  }

  checkLevel(control:FormControl): ValidationErrors|null {
    if (control.value=='1' || control.value=='3' || control.value=='5'){
      return null;
    }else{
      return {'levelIncorect':true}
    }
  }

  addEducation(){
    const input=new FormControl(null, Validators.required);
    (<FormArray>this.technicianForm.get('education')).push(input);
  }

  addAddress(){
    const address=new FormGroup({
      city:new FormControl(null, Validators.required, this.cityInDatabase()),
      street:new FormControl(null, Validators.required)
    });
    (<FormArray>this.technicianForm.get('address')).push(address);
  }

  get addresses(){
    return (<FormArray>this.technicianForm.get('address')).controls;
  }

  get educations(){
    return (<FormArray>this.technicianForm.get('education')).controls;
  }

  toFromGroup(el:AbstractControl):FormGroup{
    return <FormGroup>el;
  }

  cityInDatabase():AsyncValidatorFn{
    return (control:AbstractControl):Observable<ValidationErrors|null>=>{
      return this.techService.isCityAvailable(control.value).pipe( map((response)=>{
        if (response==true){
          return null;
        }else{
          return {"Miestas neegzistuoja DB":true};
        }
      }) );
    }
  }

/*
 checkIfCityAvailable(city:String):Observable<boolean>{
  return of(city=='Vilnius').pipe(delay(10000));
 }


  allowedCities():AsyncValidatorFn{
    return (cotrol:AbstractControl):Observable<ValidationErrors|null>=>{
      return this.checkIfCityAvailable(cotrol.value).pipe( map((result)=>{
        if (result==true){
          return null;
        }else{
          return {"klaida":true};
        }
      }));
    };
  

  }
  */

}

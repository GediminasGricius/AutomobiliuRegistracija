import { Directive } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[CarNumberValidator]',
  providers:[
    {
      provide:NG_VALIDATORS,
      useExisting:CarNumberValidatorDirective,
      multi:true
    }
  ]
})
export class CarNumberValidatorDirective implements Validator{

  constructor() { }
  validate(control: FormControl): ValidationErrors | null {
    let regNuber : string=control.value;
   


    let patern :RegExp= /^[a-z|A-Z]{3}[0-9]{3}$/;
   
    if ( ! patern.test(regNuber)){
      return {'error':'Klaida'};
    }

    
   
    return null;
  }

  

}

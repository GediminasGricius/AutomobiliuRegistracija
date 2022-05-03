import { Component, OnInit } from '@angular/core';
import { Technician } from 'src/app/models/technician';
import { TechniciansService } from 'src/app/services/technicians.service';

@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.css']
})
export class TechniciansComponent implements OnInit {

  public technicians:Technician[]=[];
  constructor( private techService:TechniciansService) {   }

  ngOnInit(): void {
    this.techService.getTechnicians().subscribe((response)=>{
      this.technicians=response;
    })

  }

}

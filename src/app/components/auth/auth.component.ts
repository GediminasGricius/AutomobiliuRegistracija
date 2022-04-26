import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.register("g.gricius1@bit.lt", "LabasLabas");
  }

}

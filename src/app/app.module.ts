import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { NewRegistrationComponent } from './components/new-registration/new-registration.component';
import { FormsModule } from '@angular/forms';
import { CarNumberValidatorDirective } from './directives/car-number-validator.directive';
import { HttpClientModule } from '@angular/common/http';
import { UpdateRegistrationComponent } from './components/update-registration/update-registration.component';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    NewRegistrationComponent,
    CarNumberValidatorDirective,
    UpdateRegistrationComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { NewRegistrationComponent } from './components/new-registration/new-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarNumberValidatorDirective } from './directives/car-number-validator.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UpdateRegistrationComponent } from './components/update-registration/update-registration.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NewTechnicianComponent } from './components/new-technician/new-technician.component';
import { TechniciansComponent } from './components/technicians/technicians.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    NewRegistrationComponent,
    CarNumberValidatorDirective,
    UpdateRegistrationComponent,
    AuthComponent,
    NewTechnicianComponent,
    TechniciansComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewRegistrationComponent } from './components/new-registration/new-registration.component';
import { UpdateRegistrationComponent } from './components/update-registration/update-registration.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'new', component:NewRegistrationComponent},
  {path: 'update/:id', component:UpdateRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

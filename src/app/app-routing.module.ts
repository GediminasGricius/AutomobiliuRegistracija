import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { NewRegistrationComponent } from './components/new-registration/new-registration.component';
import { UpdateRegistrationComponent } from './components/update-registration/update-registration.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'new', component:NewRegistrationComponent},
  {path: 'update/:id', component:UpdateRegistrationComponent},
  {path: 'login', component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

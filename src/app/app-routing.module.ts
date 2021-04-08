import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/menu/home/home.component';
import { AuthComponent } from './views/auth/auth.component';
import { PropertiesComponent } from './views/property/properties/properties.component';
import { PropertyComponent } from './views/property/property/property.component';
import { NewPropertyComponent } from './views/property/new-property/new-property.component';
import { EditPropertyComponent } from './views/property/edit-property/edit-property.component';
import { AuthGuardService } from './services/guards/auth/auth-guard.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'properties', canActivate: [AuthGuardService], component: PropertiesComponent},
  { path: 'properties/:id', canActivate: [AuthGuardService], component: PropertyComponent},
  { path: 'properties/:id/add', canActivate: [AuthGuardService], component: NewPropertyComponent},
  { path: 'properties/:id/edit', canActivate: [AuthGuardService], component: EditPropertyComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

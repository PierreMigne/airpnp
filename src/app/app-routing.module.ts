import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/menu/home/home.component';
import { AuthComponent } from './views/auth/auth.component';
import { PropertiesComponent } from './views/property/properties/properties.component';
import { PropertyComponent } from './views/property/property/property.component';
import { NewPropertyComponent } from './views/property/new-property/new-property.component';
import { EditPropertyComponent } from './views/property/edit-property/edit-property.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'properties', component: PropertiesComponent},
  { path: 'properties/:id', component: PropertyComponent},
  { path: 'properties/:id/add', component: NewPropertyComponent},
  { path: 'properties/:id/edit', component: EditPropertyComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

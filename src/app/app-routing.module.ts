import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/menu/home/home.component';
import { AuthComponent } from './views/auth/auth.component';
import { PropertiesComponent } from './views/property/properties/properties.component';
import { NewPropertyComponent } from './views/property/new-property/new-property.component';
import { EditPropertyComponent } from './views/property/edit-property/edit-property.component';
import { AuthGuardService } from './services/guards/auth/auth-guard.service';
import { ProfilComponent } from './views/profile/profil/profil.component';
import { AllPropertiesComponent } from './views/property/all-properties/all-properties.component';
import { SinglePropertyComponent } from './views/property/single-property/single-property.component';
import { EditProfilComponent } from './views/profile/edit-profil/edit-profil.component';
import { EditPasswordComponent } from './views/profile/edit-password/edit-password.component';
import { UploadComponent } from './views/upload/upload.component';
import { FavoritesComponent } from './views/favorites/favorites.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'signin', component: AuthComponent},
  { path: 'signup', component: AuthComponent},
  { path: 'properties', component: AllPropertiesComponent},
  { path: 'properties/:id', component: SinglePropertyComponent},
  { path: 'my-properties', canActivate: [AuthGuardService], component: PropertiesComponent},
  { path: 'my-properties/add', canActivate: [AuthGuardService], component: NewPropertyComponent},
  { path: 'my-properties/:id', canActivate: [AuthGuardService], component: SinglePropertyComponent},
  { path: 'my-properties/:id/edit', canActivate: [AuthGuardService], component: EditPropertyComponent},
  { path: 'my-properties/:id/upload', canActivate: [AuthGuardService], component: UploadComponent},
  { path: 'favorites', canActivate: [AuthGuardService], component: FavoritesComponent},
  { path: 'profile', canActivate: [AuthGuardService], component: ProfilComponent},
  { path: 'profile/edit', canActivate: [AuthGuardService], component: EditProfilComponent},
  { path: 'profile/edit/password', canActivate: [AuthGuardService], component: EditPasswordComponent},
  { path: 'profile/:id/upload', canActivate: [AuthGuardService], component: UploadComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { HomeComponent } from './views/menu/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './views/menu/header/header.component';
import { SidenavListComponent } from './views/menu/sidenav-list/sidenav-list.component';
import { AuthComponent } from './views/auth/auth.component';
import { ProfilComponent } from './views/profil/profil.component';
import { PropertiesComponent } from './views/property/properties/properties.component';
import { PropertyComponent } from './views/property/property/property.component';
import { NewPropertyComponent } from './views/property/new-property/new-property.component';
import { EditPropertyComponent } from './views/property/edit-property/edit-property.component';
import { UserService } from './services/user/user.service';
import { PropertyService } from './services/property/property.service';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { FooterComponent } from './views/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllPropertiesComponent } from './views/property/all-properties/all-properties.component';
import { SinglePropertyComponent } from './views/property/single-property/single-property.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    AuthComponent,
    ProfilComponent,
    PropertiesComponent,
    PropertyComponent,
    NewPropertyComponent,
    EditPropertyComponent,
    FooterComponent,
    SigninFormComponent,
    SignupFormComponent,
    AllPropertiesComponent,
    SinglePropertyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatChipsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatMenuModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter(): any {
          return localStorage.getItem('accessToken');
        },
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: ['http://localhost:3000/auth/signin']
      }
    })
  ],
  providers: [{provide: LOCALE_ID, useValue: 'fr-FR'}, UserService, PropertyService],
  bootstrap: [AppComponent]
})
export class AppModule { }

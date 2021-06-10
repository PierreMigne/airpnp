import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './views/menu/home/home.component';
import { HeaderComponent } from './views/menu/header/header.component';
import { SidenavListComponent } from './views/menu/sidenav-list/sidenav-list.component';
import { AuthComponent } from './views/auth/auth.component';
import { ProfilComponent } from './views/profile/profil/profil.component';
import { PropertiesComponent } from './views/property/properties/properties.component';
import { NewPropertyComponent } from './views/property/new-property/new-property.component';
import { EditPropertyComponent } from './views/property/edit-property/edit-property.component';
import { UserService } from './services/user/user.service';
import { PropertyService } from './services/property/property.service';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { FooterComponent } from './views/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllPropertiesComponent } from './views/property/all-properties/all-properties.component';
import { SinglePropertyComponent } from './views/property/single-property/single-property.component';
import { EditProfilComponent } from './views/profile/edit-profil/edit-profil.component';
import { EditPasswordComponent } from './views/profile/edit-password/edit-password.component';
import { CustomHttpInterceptorService } from './services/httpInterceptor/custom-http-interceptor.service';
import { UploadComponent } from './views/upload/upload.component';
import { FavoritesComponent } from './views/favorites/favorites.component';
import { BookingsComponent } from './views/bookings/bookings.component';
import { MaterialModule } from './material.module';
import { InlineRangeCalendarComponent } from './components/inline-range-calendar/inline-range-calendar.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginationPersonnalise } from './classes/paginationPersonnalise';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { GrowImgDialogComponent } from './components/dialog/grow-img-dialog/grow-img-dialog.component';
import { SwiperModule } from 'swiper/angular';
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
    NewPropertyComponent,
    EditPropertyComponent,
    FooterComponent,
    SigninFormComponent,
    SignupFormComponent,
    AllPropertiesComponent,
    SinglePropertyComponent,
    EditProfilComponent,
    EditPasswordComponent,
    UploadComponent,
    FavoritesComponent,
    BookingsComponent,
    InlineRangeCalendarComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    GrowImgDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    SwiperModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd.forRoot(),
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
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    {provide: MatPaginatorIntl, useClass: PaginationPersonnalise},
    // {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    // { provide: DateAdapter, useClass: CustomDateAdapter },
    UserService,
    PropertyService,
    {provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

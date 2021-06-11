import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Property } from 'src/app/models/property.model';
import { PropertyService } from 'src/app/services/property/property.service';
import { environment } from '../../../../environments/environment';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user.model';
import { Favorite } from '../../../models/favorite.model';
import { AuthService } from '../../../services/auth/auth.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-properties',
  templateUrl: './all-properties.component.html',
  styleUrls: ['./all-properties.component.scss']
})
export class AllPropertiesComponent implements OnInit, OnDestroy {

  properties: Array<Property>;
  propertiesSubscription: Subscription;
  loading: boolean;
  location: string;
  category: any;
  peoples: number;
  searchedOptions: any;

  isAuth: boolean;
  pageSlice: Array<Property>;

  propertyIdInFavorites = [];

  urlServer = environment.urlServer + 'properties/uploads/';

  constructor(
    private propertyService: PropertyService,
    private snackbarService: SnackbarService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.isAuth = this.authService.getIsAuth();

    this.location = this.propertyService.location;
    this.category = this.propertyService.category;
    this.peoples = this.propertyService.peoples;
    this.searchedOptions = this.propertyService.options;



    this.propertiesSubscription = this.propertyService.getPropertiesFromServer().subscribe(
      (properties: Array<Property>) => {
        this.properties = properties;
        this.pageSlice = this.properties.slice(0, 10);
        this.loading = false;
        if (this.isAuth) {
          this.userService.getUserFromServer().subscribe(
            (user: User) => {
              this.propertyIdInFavorites = user.favorites.map(fav => fav.propertyId);
              // user.favorites.forEach(propertyOfUser => {
              //   this.propertyIdInFavorites.push(propertyOfUser.propertyId);
              // });
              this.properties.forEach(property => {
                if (this.propertyIdInFavorites.includes(property.id)) {
                  property.isLiked = true;
                } else {
                  property.isLiked = false;
                }
              });
            }
          );
        }
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error.message));
        this.loading = false;
      }
    );
  }

  onSaveFavorite(propertyId: number): any {
    this.loading = true;
    this.propertyService.createFavorite(propertyId).subscribe(
      () => {
        this.loading = false;
        this.snackbarService.successSnackbar('Hébergement ajouté avec succès dans vos favoris.');
        const i = this.properties.findIndex(property => property.id === propertyId);
        this.properties[i].isLiked = true;
      },
      (error) => {
        this.loading = false;
        if (error.error.code === '23505') {
          this.snackbarService.alertSnackbar('Cet hébergement est déjà dans vos favoris.');
        } else {
          console.log('Erreur ! : ' + JSON.stringify(error.error.message));
          this.snackbarService.alertSnackbar('Une erreur est survenue.');
        }
      }
    );
  }

  onDeleteFavorite(propertyId: number): void {
    this.loading = true;
    this.propertyService.deleteFavoriteByPropertyIdAndUser(propertyId).subscribe(
      () => {
        this.loading = false;
        this.snackbarService.successSnackbar('Hébergement supprimé avec succès de vos favoris.');
        const i = this.properties.findIndex(property => property.id === propertyId);
        this.properties[i].isLiked = false;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.snackbarService.alertSnackbar('Une erreur est survenue.');
        this.loading = false;
      }
    );
  }

  OnPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.properties.length) {
      endIndex = this.properties.length;
    }
    this.pageSlice = this.properties.slice(startIndex, endIndex);
  }

  ngOnDestroy(): void {
    this.propertiesSubscription.unsubscribe();
  }

}

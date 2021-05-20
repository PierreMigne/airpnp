import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Favorite } from 'src/app/models/favorite.model';
import { Property } from 'src/app/models/property.model';
import { PropertyService } from 'src/app/services/property/property.service';
import { environment } from 'src/environments/environment';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  favorites: Array<Favorite>;
  favoritesSubscription: Subscription;

  loading: boolean;
  urlServer = environment.urlServer + 'properties/uploads/';

  constructor(private propertyService: PropertyService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.loading = true;
    this.favoritesSubscription = this.propertyService.getFavorites().subscribe(
      (favorites: Array<Favorite>) => {
        this.favorites = favorites;
        this.loading = false;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.loading = false;
      }
    );
  }

  onDeleteFavorite(favoriteId: number): void {
    this.loading = true;
    this.favoritesSubscription = this.propertyService.deleteFavorite(favoriteId).subscribe(
      (favorites: Array<Favorite>) => {
        this.favorites = favorites;
        this.snackbarService.successSnackbar('Hébergement supprimé avec succès de vos favoris.');
        this.loading = false;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.favoritesSubscription.unsubscribe();
  }

}

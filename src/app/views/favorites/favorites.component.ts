import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Favorite } from 'src/app/models/favorite.model';
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

  pageSlice: Array<Favorite>;
  loading: boolean;
  urlServer = environment.urlServer + 'properties/uploads/';

  constructor(private propertyService: PropertyService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.loading = true;
    this.favoritesSubscription = this.propertyService.getFavorites().subscribe(
      (favorites: Array<Favorite>) => {
        this.favorites = favorites;
        this.pageSlice = this.favorites.slice(0, 5);
        this.loading = false;
      },
      (error) => {
        console.log('Erreur ! : ' + JSON.stringify(error.error));
        this.loading = false;
      }
    );
  }

  onDeleteFavorite(favoriteId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet hébergement de vos favoris ?')) {
      this.loading = true;
      this.favoritesSubscription = this.propertyService.deleteFavorite(favoriteId).subscribe(
        (favorites: Array<Favorite>) => {
          this.favorites = favorites;
          this.pageSlice = this.favorites.slice(0, 5);
          this.snackbarService.successSnackbar('Hébergement supprimé avec succès de vos favoris.');
          this.loading = false;
        },
        (error) => {
          console.log('Erreur ! : ' + JSON.stringify(error.error));
          this.loading = false;
        }
      );
    }
  }

  OnPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.favorites.length) {
      endIndex = this.favorites.length;
    }
    this.pageSlice = this.favorites.slice(startIndex, endIndex);
  }

  ngOnDestroy(): void {
    this.favoritesSubscription.unsubscribe();
  }

}

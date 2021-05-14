import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  GetAllMovies,
  AddFavoriteMovie,
  GetUser,
  DeleteFavoriteMovie,
} from '../fetch-api-data.service';

import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMoviesIDs: any[] = [];

  constructor(
    public fetchApiData: GetAllMovies,
    public fetchApiDataFavorite: AddFavoriteMovie,
    public fetchApiDataUser: GetUser,
    public fetchApiDataDeleteFavorite: DeleteFavoriteMovie,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  addToFavorites(id: string, Title: string): void {
    this.fetchApiDataFavorite.addFavoriteMovie(id).subscribe((resp: any) => {
      // console.log(resp);
      this.snackBar.open(`${Title} has been added to your favourites.`, 'OK', {
        duration: 3000,
        verticalPosition: 'top',
      });
    });
  }


  openDetailsDialog(Description: string, Image: string, Title: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: { Description, Image, Title },
      width: '400px',
      height: '400px',
    });
  }

  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreComponent, {
      data: { Name, Description },
      width: '400px',
      height: '400px',
    });
  }

  openDirectorDialog(Name: string, Bio: string, Birth: string): void {
    this.dialog.open(DirectorComponent, {
      data: { Name, Bio, Birth },
      width: '400px',
      height: '400px',
    });
  }

  deleteFavoriteMovie(id: string): void {
    this.fetchApiDataDeleteFavorite
      .deleteFavoriteMovie(id)
      .subscribe((resp: any) => {
        // console.log(resp);
        window.location.reload();
      });
  }
}
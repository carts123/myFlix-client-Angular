import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


// API calls
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
    /**
     * Call functions on page load to retrieve all movies from database
     */
    this.getMovies();
  }

  /**
   * Function that retrieves list of all movies from database
   * @returns movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Function that adds movie to user's list of favorites
   * @param id type: number - Movie ID
   * @param Title type: string - Movie Title
   */
  addToFavorites(id: string, Title: string): void {
    this.fetchApiDataFavorite.addFavoriteMovie(id).subscribe((resp: any) => {
      // console.log(resp);
      this.snackBar.open(`${Title} has been added to your favourites.`, 'OK', {
        duration: 3000,
        verticalPosition: 'top',
      });
    });
  }

  /**
   * Function to open dialog showing movie details
   * @param Description type: string - Movie description
   * @param Image type: string - Path to movie image
   * @param Title type: string - Movie title
   */
  openDetailsDialog(Description: string, Image: string, Title: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: { Description, Image, Title },
      width: '400px',
      height: '400px',
    });
  }

  /**
 * Function to open dialog showing genre details
 * @param Name type: string - Name of genre
 * @param Description type: string - Description of genre
 */
  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreComponent, {
      data: { Name, Description },
      width: '400px',
      height: '400px',
    });
  }

  /**
 * Function to open dialog showing director details
 * @param Name type: string - Name of director
 * @param Bio type: string - Director bio
 * @param Birth type: string - Year director was born
 */
  openDirectorDialog(Name: string, Bio: string, Birth: string): void {
    this.dialog.open(DirectorComponent, {
      data: { Name, Bio, Birth },
      width: '400px',
      height: '400px',
    });
  }

  /**
 * Function to delete a movie from user's list of favourites
 * @param id type: string - ID of movie to be deleted from favourites
 * @param Title type: string - Title of movie to be deleted from favourites
 */
  deleteFavoriteMovie(id: string): void {
    this.fetchApiDataDeleteFavorite
      .deleteFavoriteMovie(id)
      .subscribe((resp: any) => {
        // console.log(resp);
        window.location.reload();
      });
  }
}
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import {
  EditUser,
  GetAllMovies,
  GetUser,
  DeleteUser,
  DeleteFavoriteMovie,
} from '../fetch-api-data.service';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  movies: any[] = [];
  favoriteMovies: any[] = [];
  favoriteMoviesIDs: any[] = [];

  constructor(
    public fetchApiData: EditUser,
    public fetchApiDataAllMovies: GetAllMovies,
    public fetchApiDataUser: GetUser,
    public fetchApiDataDeleteUser: DeleteUser,
    public fetchApiDataDeleteFavorite: DeleteFavoriteMovie,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    private router: Router
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  getMovies(): void {
    this.fetchApiDataAllMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie) => {
        if (this.favoriteMoviesIDs.includes(movie._id))
          this.favoriteMovies.push(movie);
      });
      // console.log(this.favoriteMovies);
      return this.favoriteMovies;
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

  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (result) => {
        // console.log(result);
        this.snackbar.open('Your profile has been updated.', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
      (result) => {
        // console.log(result);
        this.snackbar.open(result, 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    );
  }

  openDetailsDialog(Description: string, Image: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: { Description, Image },
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

  openDirectorDialog(Name: string, Bio: string, BirthYear: string): void {
    this.dialog.open(DirectorComponent, {
      data: { Name, Bio, BirthYear },
      width: '400px',
      height: '400px',
    });
  }
}
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Declaration of the API URL that will provide data for the client app
 */
const apiUrl = 'https://mycfdb.herokuapp.com/';


/**
 * API call to user registration endpoint
 * @param userDetails
 */
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

/**
 * API call to user login endpoint
 * @param userDetails
 */
@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  // Inject the HttpClient module to the constructor params, which will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the API call for the login endpoint
  /**
   *
   * @param userDetails
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}login?Username=${userDetails.Username}&Password=${userDetails.Password}`, '')
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened. Please try again.');
  }
}

/**
 * API call to get all movies endpoint
 */
@Injectable({
  providedIn: 'root',
})
export class GetAllMovies {
  // Inject the HttpClient module to the constructor params, which will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the API call for the all movies endpoint
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened. Please try again.');
  }
}

/**
 * API call to get one endpoint
 */
@Injectable({
  providedIn: 'root',
})
export class GetOneMovie {
  // Inject the HttpClient module to the constructor params, which will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the API call for the movie by title endpoint
  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened. Please try again.');
  }
}

/**
 * API call to get director endpoint
 */
@Injectable({
  providedIn: 'root',
})
export class GetDirector {
  // Inject the HttpClient module to the constructor params, which will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the API call for the director endpoint
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'director/:Director', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened. Please try again.');
  }
}

/**
 * API call to get genre endpoint
 */
@Injectable({
  providedIn: 'root',
})
export class GetGenre {
  // Inject the HttpClient module to the constructor params, which will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the API call for the genre endpoint
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genre/:Genre', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened. Please try again.');
  }
}

/**
 * API call to get user endpoint
 * @param username
 */
@Injectable({
  providedIn: 'root',
})
export class GetUser {
  // Inject the HttpClient module to the constructor params, which will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the API call for the user endpoint
  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened. Please try again.');
  }
}

/**
 * API call to add movie to list of favourites endpoint
 * @param id
 */
@Injectable({
  providedIn: 'root',
})
export class AddFavoriteMovie {
  // Inject the HttpClient module to the constructor params, which will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the API call for the user favourites endpoint
  addFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    console.log(id, username, token);

    return this.http
      .post(`${apiUrl}users/${username}/Movies/${id}`, id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened. Please try again.');
  }
}

/**
 * API call to edit user endpoint
 * @param userData
 */
@Injectable({
  providedIn: 'root',
})
export class EditUser {
  // Inject the HttpClient module to the constructor params, which will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the API call for the edit user endpoint
  editUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/:Username', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened. Please try again.');
  }
}

/**
 * API call to delete user endpoint
 */
@Injectable({
  providedIn: 'root',
})
export class DeleteUser {
  // Inject the HttpClient module to the constructor params, which will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the API call for the delete user endpoint
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/:Username', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened. Please try again.');
  }
}

/**
 * API call to delete movie from favourites endpoint
 * @param id
 */
@Injectable({
  providedIn: 'root',
})
export class DeleteFavoriteMovie {
  // Inject the HttpClient module to the constructor params, which will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the API call for the delete favourite movie endpoint
  deleteFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened. Please try again.');
  }
}

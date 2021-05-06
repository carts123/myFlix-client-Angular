import { Component, OnInit, Input } from '@angular/core';

// Used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Brings in API calls
import { UserLoginService } from '../fetch-api-data.service';

// Used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { }

  /**
   * Function that
   * * checks user login credientials against the server
   * * sends back a token if credentials are valid
   * * stores user and token in localStorage for later use
   */
  userLogin(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        this.dialogRef.close(); // closes modal on success
        localStorage.setItem('user', response.user.Username);
        localStorage.setItem('token', response.token);
        this.snackBar.open('Logged in successfully', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
        this.router.navigate(['movies']);
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    );
  }
}

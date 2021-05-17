import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  /**
 * Function clears username and token from local storage to log out user
 */
  logoutUser(): void {
    localStorage.clear();
  }
}
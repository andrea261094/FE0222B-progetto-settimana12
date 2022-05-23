import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-collapse navbar-dark bg-success text-white fixed-top">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="navbar navbar-collapse"
          id="navbarTogglerDemo01"
        >
          <ul class="navbar-nav">
            <li class="nav-item" *ngIf="isLoggedIn">
              <a
                class="nav-link"
                [routerLink]="['/movies']"
                routerLinkActive="active"
                >Movies</a
              >
            </li>
            <li class="nav-item me-5" *ngIf="isLoggedIn">
              <a
                class="nav-link"
                [routerLink]="['/favourites']"
                routerLinkActive="active"
                >Preferiti</a
              >
            </li>
          </ul>
          <div *ngIf="isLoggedIn">
            <p class="d-inline username-welc-back">
              Bentornato
              <span class="fst-italic fw-bolder">{{ welcomeUser }}</span>
            </p>
            <br>
            <br>
            <button class="btn btn-danger" (click)="onLogout()">
              logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .username-welc-back {
        transform: translateY(30%);
      }
    `,
  ],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  welcomeUser!: string | undefined;

  constructor(private authSrv: AuthService) {}

  onLogout() {
    this.authSrv.logout();
  }

  ngOnInit(): void {
    this.authSrv.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authSrv.user$.subscribe((data) => {
      this.welcomeUser = data?.user.name;
    });
  }
}

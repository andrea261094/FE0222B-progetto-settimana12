import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { MovieService } from '../movies/movies.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  template: `
    <div class="container mt-4 justify-content-beetwen">
      <ul class="list-group">
        <p>Utente: {{ welcomeUser }}</p>
        <li *ngFor="let preferito of preferiti">
          Lista preferiti: {{ preferito.title }}
        </li>
      </ul>
      <hr />
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      * {
        color: white;
      }
      div {
        margin-top: 10rem !important;
      }
    `,
  ],
})
export class FavouritesPage implements OnInit {
  welcomeUser!: string | undefined;
  users!: User[];
  welcomePref!: string | undefined;
  preferiti = this.movieSrv.preferiti;
  constructor(private authSrv: AuthService, private movieSrv: MovieService) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((data) => {
      this.welcomeUser = data?.user.name;
    });
  }
}

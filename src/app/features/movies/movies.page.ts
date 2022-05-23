import { Component, OnInit } from '@angular/core';
import { MovieService } from './movies.service';
import { Movie } from 'src/app/models/movie';
import { HttpClient } from '@angular/common/http';

@Component({
  template: `
    <div class="container">
      <div class="row justify-content-between">
        <div
          *ngFor="let movie of movies"
          class="card text-center mb-5 p-3"
          style="width: 18rem; height: 32rem"
        >
          <img
            class="img-fluid"
            srcset="http://image.tmdb.org/t/p/w500{{movie.poster_path}}"
          />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>

            <button
              class="rounded bg-light"
              *ngIf="movie.like"
              (click)="unlike(movie)"
            >
              💚
            </button>
            <button
              class="rounded bg-light"
              *ngIf="!movie.like"
              (click)="like(movie)"
            >
              🖤
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        margin-top: 7rem;
      }
    `,
  ],
})
export class MoviesPage implements OnInit {
  constructor(private movieSrv: MovieService, private http: HttpClient) {}
  movies: Movie[] | undefined;

  ngOnInit(): void {
    setInterval(() => {
      this.movies = this.movieSrv.movies;
    }, 20);
    if (!this.movies) {
      this.movieSrv.getMovies();
    }
  }

  async like(movie: Movie) {
    await (await this.movieSrv.addFavorite(movie)).toPromise();
  }

  unlike(movie: Movie) {
    this.movieSrv.removeFavourite(movie);
  }
}

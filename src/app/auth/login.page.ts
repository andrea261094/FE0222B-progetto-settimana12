import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  template: `
    <div class="container bg-dark mt-5 p-4 rounded">
      <div class="row justify-content-center text-center">
        <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
        <form #form="ngForm" (ngSubmit)="onsubmit(form)">
          <div class="form-group">
            <label for="email" class="text-white mb-2">Email</label>
            <input
              ngModel
              name="email"
              class="form-control mb-2"
              type="email"
              id="email"
            />
          </div>
          <div class="form-group">
            <label for="pass" class="text-white mb-2">Password</label>
            <input
              ngModel
              name="password"
              class="form-control mb-2"
              type="password"
              id="pass"
            />
          </div>
          <button
            [routerLink]="['/movies']"
            class="btn btn-primary m-3"
            [disabled]="isLoading"
            type="submit"
          >
            Accedi
            <span
              *ngIf="isLoading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </button>
        </form>
        <p class="text-white">
          Oppure <a [routerLink]="['/signup']">Registrati</a>
        </p>
      </div>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .container {
        width: 30em;
        margin-top: 10rem !important;
      }
    `,
  ],
})
export class LoginPage implements OnInit {
  isLoading = false;
  errorMessage = undefined;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onsubmit(form: any) {
    console.log(form);

    try {
      await this.authSrv.login(form.value).toPromise();
      form.reset();
      this.errorMessage = undefined;
      this.router.navigate(['/movies']);
    } catch (error: any) {
      this.errorMessage = error;
      console.error(error);
    }
  }
}

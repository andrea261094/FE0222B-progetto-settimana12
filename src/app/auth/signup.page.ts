import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
            <label class="text-white mb-2" for="name">Nome</label>
            <input
              ngModel
              name="name"
              class="form-control mb-2"
              type="text"
              id="name"
            />
          </div>
          <div class="form-group">
            <label class="text-white mb-2" for="cognome">Cognome</label>
            <input
              ngModel
              name="surname"
              class="form-control mb-2"
              type="text"
              id="cognome"
            />
          </div>
          <div class="form-group">
            <label class="text-white mb-2" for="email">Email</label>
            <input
              ngModel
              name="email"
              class="form-control mb-2"
              type="email"
              id="email"
            />
          </div>
          <div class="form-group">
            <label class="text-white mb-2" for="pass">Password</label>
            <input
              ngModel
              name="password"
              class="form-control mb-2"
              type="password"
              id="pass"
            />
          </div>
          <button
            class="btn btn-primary m-3"
            [disabled]="isLoading"
            type="submit"
          >
            Registrati
            <span
              *ngIf="isLoading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </button>
        </form>
        <p class="text-white mb-2">Oppure <a [routerLink]="['']">Accedi</a></p>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        width: 30em;
      }
    `,
  ],
})
export class SignupPage implements OnInit {
  isLoading = false;
  errorMessage = undefined;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onsubmit(form: NgForm) {
    this.isLoading = true;
    console.log(form);
    try {
      await this.authSrv.signup(form.value).toPromise();
      form.reset();
      this.isLoading = false;
      this.errorMessage = undefined;
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.isLoading = false;
      this.errorMessage = error;
      console.error(error);
    }
    alert("Congratulazioni ti sei registrato! Ora accedi")
  }
}

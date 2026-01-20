import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.css'
})
export class AuthCallbackComponent implements OnInit {
  router = inject(Router);
  oauthService = inject(OAuthService);
  
  ngOnInit() {
    this.oauthService.tryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.router.navigateByUrl('/');
      }
    }).catch(err => {
      console.error('Login failed:', err);
      this.router.navigateByUrl('/');
    });
  }
}

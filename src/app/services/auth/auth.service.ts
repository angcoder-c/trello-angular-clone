// https://medium.com/@binurajtech/how-to-implement-oauth-in-angular-a-step-by-step-guide-0173c40ec0af

import { Injectable } from '@angular/core';
import { googleAuthConfig } from '../../google-auth.config';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private oauthService: OAuthService,
  ) { 
    this.oauthService.configure(googleAuthConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.setupAutomaticSilentRefresh()
  }

  login() {
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.oauthService.initLoginFlow();
      this.oauthService.setStorage(localStorage)
    }).catch(err => console.error('Error loading discovery document:', err));
  }

  logout () {
    this.oauthService.logOut();
  }

  isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  get getUserProfile() {
    return this.oauthService.getIdentityClaims();
  }
}

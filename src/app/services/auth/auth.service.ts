// https://medium.com/@binurajtech/how-to-implement-oauth-in-angular-a-step-by-step-guide-0173c40ec0af

import { Injectable, signal } from '@angular/core';
import { googleAuthConfig } from '../../google-auth.config';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = signal<null | Record<string, any>>(null);

constructor(
    private oauthService: OAuthService,
  ) { 
    this.oauthService.configure(googleAuthConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.setupAutomaticSilentRefresh();
    
    this.oauthService.events.subscribe(event => {
      if (event.type === 'token_received') {
        this.user.set(this.oauthService.getIdentityClaims() as Record<string, any>);
      }
    });
    
    if (this.oauthService.hasValidAccessToken()) {
      this.user.set(this.oauthService.getIdentityClaims() as Record<string, any>);
    }
  }

login() {
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.oauthService.initLoginFlow();
      this.oauthService.setStorage(localStorage)
    }).catch(err => console.error('Error loading discovery document:', err));
  }

  logout () {
    this.oauthService.logOut();
    this.user.set(null)
  }

  isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  get getUserProfile() {
    return this.oauthService.getIdentityClaims()
  }
}

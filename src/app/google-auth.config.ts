import { AuthConfig } from 'angular-oauth2-oidc'

export const googleAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  clientId: "166191554150-qmkvqthb3h2mbp30kdmmsfvdr076gs0v.apps.googleusercontent.com",
  redirectUri: window.location.origin + '/auth/callback',
  strictDiscoveryDocumentValidation: false,
  responseType: 'id_token token',
  scope: 'openid profile email',
  showDebugInformation: true,
  customQueryParams: {
    prompt: 'select_account'
  },
  // REFRESH AUTOMÁTICO
  useSilentRefresh: true,
}
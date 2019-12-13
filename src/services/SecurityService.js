/* eslint-disable */
import Oidc from 'oidc-client';

export default class SecurityService {
  constructor(config) {
    this.mgr = new Oidc.UserManager({
      userStore: new Oidc.WebStorageStateStore(),  
      authority: config.authority,
      client_id: config.client_id,
      client_secret: config.client_secret,
      redirect_uri: config.redirect_uri,
      response_type: 'code',
      scope: 'openid profile email offline_access',
      post_logout_redirect_uri: config.post_logout_redirect_uri,
      silent_redirect_uri: config.silent_redirect_uri,
      accessTokenExpiringNotificationTime: 10,
      automaticSilentRenew: true,
      filterProtocolClaims: true,
      loadUserInfo: true,
      monitorSession: false
    })
    
    Oidc.Log.logger = console;
    Oidc.Log.level = Oidc.Log.INFO;
    
    this.mgr.events.addUserLoaded(function (user) {  
      console.log('New User Loaded：', arguments);
      console.log('Acess_token: ', user.access_token)
    });
    
    this.mgr.events.addAccessTokenExpiring(function () {
      console.log('AccessToken Expiring：', arguments);
    });
    
    this.mgr.events.addAccessTokenExpired(function () {
      console.log('AccessToken Expired：', arguments);  
      alert('Session expired. Going out!');
      this.mgr.signoutRedirect().then(function (resp) {
        console.log('signed out', resp);
      }).catch(function (err) {
        console.log(err)
      })
    });
    
    this.mgr.events.addSilentRenewError(function () {
      console.error('Silent Renew Error：', arguments);
    });
    
    this.mgr.events.addUserSignedOut(function () {
      alert('Going out!');
      console.log('UserSignedOut：', arguments);  
      this.mgr.signoutRedirect().then(function (resp) {
        console.log('signed out', resp);
      }).catch(function (err) {
        console.log(err)
      })
    });
  }

  // Renew the token manually
  renewToken () {
    let self = this
    return new Promise((resolve, reject) => {
      this.mgr.signinSilent().then(function (user) {
        if (user == null) {
          return self.signIn(null)
        } else{
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Get the user who is logged in
  getUser () {
    let self = this
    return new Promise((resolve, reject) => {
      this.mgr.getUser().then(function (user) {
        if (user == null) {
          return self.signIn()
        } else{          
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Check if there is any user logged in
  getSignedIn () {
    let self = this
    return new Promise((resolve, reject) => {
      this.mgr.getUser().then(function (user) {
        if (user == null) {
          return self.signIn()
        } else{
          return resolve(true)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Redirect of the current window to the authorization endpoint.
  signIn () {
    return this.mgr.signinRedirect().catch(function (err) {
      console.log(err)
    })
  }
  
  // Redirect of the current window to the end session endpoint
  signOut () {    
    return this.mgr.signoutRedirect().then(function (resp) {
      console.log('signed out', resp);
    }).catch(function (err) {
      console.log(err)
    })
  }

  signinRedirectCallback () {
    return this.mgr.signinRedirectCallback()
  }

  signinSilentCallback () {
    return this.mgr.signinSilentCallback()
  }
}
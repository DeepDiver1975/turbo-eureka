<template>
    <div class="oc-login" uk-height-viewport>
        <div class="oc-login-card uk-position-center">
            <h1 class="oc-login-logo" v-translate>
                ownCloud
            </h1>
          <div v-show="error" class="oc-login-card-body">
            <h3 class="oc-login-card-title">
              <translate>Authentication failed</translate>
            </h3>
            <p v-translate>
              Please contact the administrator if this error persists.
            </p>
          </div>
          <div v-show="!error" class="oc-login-card-body">
            <h3 class="oc-login-card-title">
              <translate>Redirecting</translate>
            </h3>
            <p v-translate>
              Please wait a while. You are being redirected.
            </p>
          </div>
            <div class="oc-login-card-footer">
                <p>
                    {{ slogan }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import Mgr from '../services/SecurityService';

export default {
  name: 'OidcCallbackPage',
  props: {
    slogan: String
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$route.query.error) {
        this.error = true
          // eslint-disable-next-line no-console
        console.warn('OAuth error: ' + this.$route.query.error + ' - ' + this.$route.query.error_description)
        return
      }
      const mgr = new Mgr();

      if (this.$route.path === '/oidc-silent-redirect') {
        mgr.signinSilentCallback()
      } else {
        mgr.callback()
      }
    })
  },
  data () {
    return {
      error: false
    }
  },
}
</script>

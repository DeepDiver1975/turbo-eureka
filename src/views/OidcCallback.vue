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
export default {
  name: 'OidcCallbackPage',
  props: {
    slogan: String
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.query.error) {
        this.error = true
          // eslint-disable-next-line no-console
        console.warn('OAuth error: ' + this.$route.query.error + ' - ' + this.$route.query.error_description)
        return
      }
      this.$router.getManager().then(mgr => {
        if (this.$route.path === '/oidc-silent-redirect') {
          mgr.signinSilentCallback().then(user => {
            // TODO: store user
            // eslint-disable-next-line no-console
            console.log(user)
            this.$router.push('/')
          })
        } else {
          mgr.signinRedirectCallback().then(user => {
            // TODO: store user
            // eslint-disable-next-line no-console
            console.log(user)
            this.$router.push('/')
          })
        }
      })
    })
  },
  data () {
    return {
      error: false
    }
  },
}
</script>

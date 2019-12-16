<template>
  <div>
    <div id="Phoenix" class="uk-height-1-1">
        <oc-navbar id="oc-topbar" tag="header" class="oc-topbar">
          <oc-navbar-item position="left">
            <oc-button icon="menu" variation="primary" class="oc-topbar-menu-burger uk-height-1-1" aria-label="Menu" ref="menubutton">
              <span class="oc-topbar-menu-burger-label" v-translate>Menu</span>
            </oc-button>
          </oc-navbar-item>
          <oc-navbar-item position="center">
            <router-link to="/" class="oc-topbar-icon">ownCloud X</router-link>
          </oc-navbar-item>
          <oc-navbar-item position="right">
            <div class="oc-topbar-personal">
            <oc-button
              id="_apps"
              icon="apps"
              variation="primary"
              class="oc-cursor-pointer uk-padding-small uk-height-1-1"
              aria-label="Application Switcher"
            />
            <avatar
              class="oc-topbar-personal-avatar oc-cursor-pointer"
              :username="user.displayname"
              id="_account"
            />
            </div>
          </oc-navbar-item>
        </oc-navbar>
        <oc-drop toggle="#_apps" mode="click" :options="{pos:'bottom-right'}" class="uk-width-large">
          <div class="uk-grid-small uk-text-center" uk-grid>
            <div class="uk-width-1-3">
              <oc-icon name="folder" size="large"/>
              <div>Files</div>
            </div>
            <div class="uk-width-1-3">
              <oc-icon name="movie_filter" size="large"/>
              <div>Video</div>
            </div>
            <div class="uk-width-1-3">
              <oc-icon name="group" size="large"/>
              <div>Contacts</div>
            </div>
          </div>
          <div class="uk-grid-small uk-text-center" uk-grid>
            <div class="uk-width-1-3">
              <oc-icon name="linked_camera" size="large"/>
              <div>Album</div>
            </div>
            <div class="uk-width-1-3">
              <oc-icon name="lock" size="large"/>
              <div>Passwords</div>
            </div>
            <div class="uk-width-1-3">
              <oc-icon name="timer" size="large"/>
              <div>Run Tracker</div>
            </div>
          </div>
        </oc-drop>

        <oc-drop toggle="#_account" mode="click" :options="{pos:'bottom-right'}" class="uk-width-large">
          <div class="uk-card-body uk-flex uk-flex-middle uk-flex-column">
            <avatar
             :username="user.displayname"
              :width="128"
            />
            <h3 class="uk-card-title">{{ user.displayname}}</h3>
            <span>alice@wonder.land</span>
            <br />
            <oc-button>Manage your account</oc-button>
            <br/>
            <oc-button>Sign out</oc-button>
          </div>
          <div class="uk-card-footer uk-flex uk-flex-middle uk-flex-column">
            <span>version: 0.2.6</span>
          </div>
        </oc-drop>

        <main id="main">
          <router-view id="oc-app-container" class="uk-height-1-1"></router-view>
        </main>
    </div>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
  name: 'app',
  components: {
    Avatar
  },
  data() {
    return {
      user: {
        id: '',
        displayname: ''
      }
    }
  }, mounted() {
    this.$router.getManager().then(mgr => {
      mgr.getUser().then(user => {
        this.user.id = user.profile.preferred_username
        this.user.displayname = `${user.profile.given_name} ${user.profile.family_name}`
      })
    })
  }
}
</script>

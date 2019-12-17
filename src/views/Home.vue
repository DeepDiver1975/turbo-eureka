<template>
<div>
  <h1>ocis-web-baseline - no file loaded - go away</h1>
  <div>{{this.error}}</div>
</div>
</template>
<script>
import Api from '../services/ApiService'

export default {
  name: 'home',
  data() {
    return {
      files: [],
      error: ''
    }
  },
  mounted() {
    window.user_manager.getUser().then(user => {
      const api = new Api(window.config, user.access_token)
      api.getFiles().then(files => {
        this.files = files
      }).catch(error => {
        this.error = error
      })
    })
  }
}
</script>

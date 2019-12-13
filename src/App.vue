<template>
  <div>
    <div id="Phoenix" class="uk-height-1-1">
      <router-view id="oc-app-container" class="uk-height-1-1"></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      config: {},
      mgr: null,
      user: null
    }
  }
}
</script>

<template>
  <div>
    <oc-spinner :v-if="loadingConfig" />
    <router-view></router-view>
   </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      loadingConfig: true
    }
  },
  mounted () {
    fetch('config.json').then(config => {
      this.loadingConfig = false
      // eslint-disable-next-line no-console
      console.log(config);
    })
  }
}
</script>

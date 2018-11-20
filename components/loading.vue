<template>
  <div>
    <loading :active.sync="isLoading"></loading>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    }
  },
  components: {
    Loading
  }
}
</script>
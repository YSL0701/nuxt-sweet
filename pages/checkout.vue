<template>
  <div class="main">
    <nuxt-child />
    <order />
  </div>
</template>

<script>
import order from '~/components/order.vue'
export default {
  components: {
    order
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 30px;
  @include flex(row, center);
  @include media($tablet) {
    flex-wrap: wrap;
    margin-top: 0;
  }
  @include media($mobile) {
    width: 100%;
    margin-bottom: -30px;
  }
}
</style>



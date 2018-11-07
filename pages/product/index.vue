<template>
  <div class="product">
    <productCard v-for="item in products" :product="item" :key="item.id" />
  </div>
</template>

<script>
import axios from 'axios'
import productCard from '~/components/productCard.vue'

export default {
  asyncData({ store }) {
    return store.dispatch('getProductsByPage').then(() => {
      return { products: store.state.product.productsByPage }
    })
  },
  components: {
    productCard
  },
  head() {
    return {
      title: '所有甜點'
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  width: 620px;
  margin-top: -20px;
  @include flex(row, space-between);
  flex-wrap: wrap;
  @include media($tablet) {
    width: 100%;
    @include flex(row, center);
  }
}
</style>

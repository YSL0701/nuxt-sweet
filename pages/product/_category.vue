<template>
  <div class="product">
    <productCard v-for="item in products" :product="item" :key="item.id" />
  </div>
</template>

<script>
import axios from 'axios'
import productCard from '~/components/productCard.vue'

export default {
  asyncData({ store, params }) {
    var currentCategory = () => {
      if (params.category === 'today') {
        return '本日精選'
      } else if (params.category === 'popular') {
        return '人氣推薦'
      } else {
        return '新品上市'
      }
    }
    if (store.state.product.allProducts.length < 1) {
      return store.dispatch('getAllProducts').then(() => {
        console.log('aaa')
        return { products: store.state.product.allProducts.filter(item => item.category === currentCategory()) }
      })
    } else {
      console.log('bbb')
      return { products: store.state.product.allProducts.filter(item => item.category === currentCategory()) }
    }
  },
  components: {
    productCard
  },
  head() {
    var param = this.$route.params.category
    var pageTitle = ''
    if (param === 'today') {
      pageTitle = '本日精選'
    } else if (param === 'popular') {
      pageTitle = '人氣推薦'
    } else {
      pageTitle = '新品上市'
    }
    return {
      title: pageTitle
    }
  },
  middleware: 'productParamsCheck'
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

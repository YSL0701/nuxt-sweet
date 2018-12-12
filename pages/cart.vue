<template>
  <div class="main">
    <div class="cart">
      <div class="title">您的購物車</div>
      <div class="content">
        <cartProductCard
          v-for="(item,index) in cartContent"
          :cart-product="item"
          :index="index"
          :key="item.id"
        />
      </div>
    </div>
    <div class="order">
      <div class="title">訂單摘要</div>
      <div class="content">
        <div class="subtotal">
          <div>小計</div>
          <div>NT$ {{ cartSubtotal }}</div>
        </div>
        <div class="freight">
          <div>運費</div>
          <div>NT$ 300</div>
        </div>
        <div class="total-price">
          <div>總計</div>
          <div>NT$ {{ total }}</div>
        </div>
      </div>
      <div
        class="checkout"
        @click="checkout"
      >結帳</div>
    </div>
  </div>
</template>

<script>
import cartProductCard from '~/components/cartProductCard.vue'

export default {
  methods: {
    checkout() {
      if (this.cartContent.length > 0 && this.isLogin) {
        this.$router.push('/checkout/recipientInfo')
      } else if (this.cartContent.length > 0 && !this.isLogin) {
        this.$router.push('/login')
      }
    }
  },
  computed: {
    cartContent() {
      return this.$store.state.cart.cart
    },
    cartSubtotal() {
      var subtotal = 0
      if (this.$store.state.cart.cart.length > 0) {
        this.$store.state.cart.cart.forEach(cartProduct => {
          subtotal = subtotal + cartProduct.qty * cartProduct.price
        })
      }
      return subtotal
    },
    total() {
      if (this.cartSubtotal > 0) {
        return this.cartSubtotal + 300
      } else {
        return 0
      }
    },
    isLogin() {
      return this.$store.state.auth.isLogin
    }
  },
  components: {
    cartProductCard
  },
  head() {
    return {
      title: '購物車'
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 30px;
  @include flex(row, center);
  @include media($tablet) {
    @include flex(column, flex-start, center);
    width: 100%;
  }
  @include media($mobile) {
    margin-top: 0;
  }
  > .cart {
    width: 620px;
    color: $primary;
    @include media($mobile) {
      width: 100%;
    }
    > .title {
      height: 65px;
      background-color: $secondary;
      font-size: 24px;
      font-weight: bold;
      @include flex(row, center, center);
    }
    // > .content {
    // }
  }
  > .order {
    width: 300px;
    height: 258px;
    margin-left: 20px;
    background-color: $primary;
    position: sticky;
    top: 100px;
    @include flex(column, flex-start, center);
    @include media($tablet) {
      width: 400px;
      margin-top: 31.5px;
    }
    @include media($mobile) {
      width: 100%;
      max-width: 450px;
      background-color: #ffffff;
      margin-left: 0;
      margin-bottom: -30px;
    }
    > .title {
      height: 33px;
      margin-top: 16px;
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
      @include flex(row, center, center);
      @include media($mobile) {
        width: calc(100% - 60px);
        height: 65px;
        color: $primary;
        background-color: $secondary;
        margin-top: 0;
        margin-left: 30px;
        margin-right: 30px;
      }
    }
    > .content {
      width: 260px;
      margin-top: 16px;
      color: #ffffff;
      border-top: 1px solid #ffffff;
      @include media($tablet) {
        width: 360px;
      }
      @include media($mobile) {
        width: calc(100% - 60px);
        margin-top: 0;
        color: $primary;
      }
      > .subtotal,
      .freight {
        margin-top: 16px;
        font-size: 16px;
        @include flex(row, space-between);
      }
      > .total-price {
        margin-top: 16px;
        font-size: 20px;
        font-weight: bold;
        @include flex(row, space-between);
      }
    }
    > .checkout {
      width: 100%;
      height: 65px;
      margin-top: auto;
      cursor: pointer;
      color: $primary;
      font-size: 24px;
      font-weight: bold;
      background-color: #ffe180;
      transition: background-color 0.3s;
      @include flex(row, center, center);
      @include media($desktop) {
        &:hover {
          background-color: darken(#ffe180, 10%);
        }
      }
    }
  }
}
</style>

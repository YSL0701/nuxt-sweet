<template>
  <div>
    <div class="product-image" :style="{backgroundImage: `url(${cartProduct.imageUrl})`}"></div>
    <div class="product-info">
      <div class="name">{{ cartProduct.title }}</div>
      <div class="price">NT$ {{ cartProduct.price }}</div>
    </div>
    <div class="counter">
      <div class="minus" @click="qtyModify(-1)">-</div>
      <div class="count">{{ cartProduct.qty }}</div>
      <div class="add" @click="qtyModify(1)">+</div>
    </div>
    <div class="subtotal">NT$ {{ subtotal }}</div>
    <div class="delete" @click="removeCartProduct"><i class="material-icons">delete_outline</i></div>
  </div>
</template>

<script>
export default {
  props: ['cartProduct', 'index'],
  methods: {
    qtyModify(modify) {
      if (this.cartProduct.qty + modify > 0) {
        this.$store.commit('qtyModify', { index: this.index, modify })
        if (this.isLogin) {
          this.$store.dispatch('updateCartToDb', { uid: this.user.uid, newCart: this.cart })
        } else {
          this.$store.commit('saveCartToLocal')
        }
      }
    },
    removeCartProduct() {
      this.$store.commit('removeCartProduct', this.cartProduct.id)
      if (this.isLogin) {
        this.$store.dispatch('updateCartToDb', { uid: this.user.uid, newCart: this.cart })
      } else {
        this.$store.commit('saveCartToLocal')
      }
    }
  },
  computed: {
    subtotal() {
      return this.cartProduct.price * this.cartProduct.qty
    },
    user() {
      return this.$store.state.auth.user
    },
    isLogin() {
      return this.$store.state.auth.isLogin
    },
    cart() {
      return this.$store.state.cart.cart
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  margin-top: 33px;
  @include flex(row, space-between, center);
  @include media($mobile) {
    @include flex(row, flex-start);
    flex-wrap: wrap;
    position: relative;
    height: 160px;
    padding-right: 30px;
    padding-left: 30px;
  }
  > .product-image {
    width: 110px;
    height: 110px;
    background-size: cover;
    background-position: center center;
    @include media($mobile) {
      width: 50%;
      height: 106px;
    }
  }
  > .product-info {
    margin-left: 40px;
    height: 53px;
    @include flex(column, space-around);
    @include media($mobile) {
      margin-left: 16px;
      height: 50px;
    }
    > .name {
      font-size: 20px;
    }
    > .price {
      font-size: 16px;
    }
  }
  > .counter {
    font-size: 16px;
    margin-left: 40px;
    @include flex(row, flex-start, center);
    @include media($mobile) {
      position: absolute;
      margin-left: 16px;
      left: 50%;
      bottom: 53.5px;
    }
    > div {
      width: 48px;
      height: 48px;
      @include flex(row, center, center);
    }
    > .minus {
      border: 1px solid $secondary;
    }
    > .count,
    .add {
      border: {
        top: 1px solid $secondary;
        right: 1px solid $secondary;
        bottom: 1px solid $secondary;
      }
    }
    > .minus,
    .add {
      cursor: pointer;
    }
  }
  > .subtotal {
    margin-left: 40px;
    font-weight: bold;
    font-size: 20px;
    @include media($mobile) {
      width: 100%;
      height: 49px;
      margin-left: 0;
      margin-top: 5px;
      border: {
        top: 1px solid $secondary;
        bottom: 1px solid $secondary;
      }
      @include flex(row, flex-end, center);
    }
  }
  > .delete {
    margin-left: 40px;
    color: #8da291;
    height: 24px;
    width: 24px;
    cursor: pointer;
    @include media($mobile) {
      position: absolute;
      bottom: 12.5px;
      margin-left: 20px;
    }
  }
}
</style>

<template>
  <div class="product-card">
    <div class="product-image" :style="{backgroundImage: `url(${product.imageUrl})`}">
      <div class="product-tag">
        <div class="tag-text">{{product.category}}</div>
      </div>
      <div class="heart">
        <i class="far fa-heart"></i>
      </div>
    </div>
    <div class="product-info">
      <div class="product-name">{{product.title}}</div>
      <div class="price">NT$ {{product.price}}</div>
    </div>
    <div class="add-to-cart" @click="addToCart">加入購物車</div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {}
  },
  methods: {
    addToCart() {
      if (this.cartContent.every(item => item.id !== this.product.id)) {
        if (!this.$store.state.auth.isLogin) {
          this.$store.commit('pushToCart', this.product)
          this.$store.commit('saveCartToLocal')
          this.addMessage()
        } else {
          this.$store
            .dispatch('addToDbCart', {
              qty: 1,
              id: this.product.id,
              uid: this.$store.state.auth.user.uid,
              price: this.product.price,
              title: this.product.title,
              imageUrl: this.product.imageUrl
            })
            .then(() => {
              this.$store.commit('pushToCart', this.product)
              this.addMessage()
            })
        }
      }
    },
    addMessage() {
      this.$store.commit('addMessage', {
        content: `${this.product.title} 已加入購物車`,
        id: this.product.id
      })
    }
  },
  computed: {
    cartContent() {
      return this.$store.state.cart.cart
    }
  }
}
</script>

<style lang="scss" scoped>
.product-card {
  margin-top: 20px;
  @include flex(column, center, center);
  @include media($tablet) {
    width: 320px;
  }
  .product-image {
    width: $card-image-width;
    height: $card-image-height;
    background-size: cover;
    background-position: center center;
    @include flex(row, space-between);
    // @include media($mobile) {
    //   width: 315px;
    // }
    .product-tag {
      width: $tag-width;
      height: $tag-height;
      margin-left: 20px;
      background-color: $primary;
      @include flex(row, center, center);
      .tag-text {
        width: 16px;
        font-size: 16px;
        color: #ffffff;
        line-height: 20px;
      }
    }
    .heart {
      margin-top: 20px;
      margin-right: 20px;
      font-size: 20px;
      color: $primary;
    }
  }
  .product-info {
    height: 54px;
    color: $primary;
    font-size: 20px;
    @include flex(row, space-between, center);
    .product-name {
      width: 173px;
      height: 54px;
      @include flex(row, flex-start, center);
      padding-left: 32px;
      border-left: 1px solid $secondary;
      border-right: 1px solid $secondary;
      // @include media($mobile) {
      //   width: 183px;
      //   padding-left: 37px;
      // }
    }
    .price {
      width: 127px;
      height: 54px;
      font-weight: bold;
      @include flex(row, flex-end, center);
      padding-right: 19px;
      border-right: 1px solid $secondary;
      // @include media($mobile) {
      //   width: 132px;
      //   padding-right: 24.4px;
      // }
    }
  }
  .add-to-cart {
    width: $card-image-width;
    height: 65px;
    font-size: 24px;
    font-weight: bold;
    color: $primary;
    background-color: $secondary;
    cursor: pointer;
    @include flex(row, center, center);
    @include media($desktop) {
      transition-property: color, background-color;
      transition-duration: 0.3s;
      &:hover {
        color: $secondary;
        background-color: $primary;
      }
    }
    // @include media($mobile) {
    //   width: 315px;
    // }
  }
}
</style>

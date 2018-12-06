<template>
  <div class="order">
    <div class="summary">
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
    </div>
    <div class="list">
      <div class="title">購物清單</div>
      <div class="productList">
        <orderProductCard
          v-for="product in cartContent"
          :product="product"
          :key="product.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import orderProductCard from "~/components/orderProductCard.vue";
export default {
  computed: {
    cartContent() {
      return this.$store.state.cart.cart;
    },
    cartSubtotal() {
      var subtotal = 0;
      this.$store.state.cart.cart.forEach(cartProduct => {
        subtotal = subtotal + cartProduct.qty * cartProduct.price;
      });
      return subtotal;
    },
    total() {
      if (this.cartSubtotal > 0) {
        return this.cartSubtotal + 300;
      } else {
        return 0;
      }
    }
  },
  components: {
    orderProductCard
  }
};
</script>

<style lang="scss" scoped>
.order {
  width: 300px;
  margin-left: 20px;
  @include media($tablet) {
    margin-top: 30px;
    width: 460px;
    margin-left: 0;
  }
  @include media($mobile) {
    display: none;
  }
  > .summary {
    border: {
      right: 1px solid $secondary;
      left: 1px solid $secondary;
      bottom: 1px solid $secondary;
    }
    > .title {
      height: 65px;
      font-size: 24px;
      font-weight: bold;
      color: #8da291;
      background-color: $secondary;
      @include flex(row, center, center);
    }
    > .content {
      margin-left: 20px;
      margin-right: 20px;
      margin-top: 16px;
      margin-bottom: 15px;
      color: #8da291;
      @include media($tablet) {
        width: 280px;
        margin-left: auto;
        margin-right: auto;
      }
      > .subtotal {
        width: 100%;
        height: 22px;
        font-size: 16px;
        @include flex(row, space-between, center);
      }
      > .freight {
        margin-top: 8px;
        width: 100%;
        height: 22px;
        font-size: 16px;
        @include flex(row, space-between, center);
      }
      > .total-price {
        margin-top: 16px;
        width: 100%;
        height: 28px;
        font-size: 20px;
        font-weight: bold;
        @include flex(row, space-between, center);
      }
    }
  }
  > .list {
    margin-top: 20px;
    border: {
      right: 1px solid $secondary;
      left: 1px solid $secondary;
      bottom: 1px solid $secondary;
    }
    > .title {
      height: 65px;
      font-size: 24px;
      font-weight: bold;
      color: #8da291;
      background-color: $secondary;
      @include flex(row, center, center);
    }
    > .productList {
      max-height: 300px;
      overflow-y: auto;
    }
  }
}
</style>


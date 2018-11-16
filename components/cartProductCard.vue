<template>
  <div>
    <div class="product-image image-1"></div>
    <div class="product-info">
      <div class="name">{{ cartProduct.title }}</div>
      <div class="price">NT$ {{ cartProduct.price }}</div>
    </div>
    <div class="counter">
      <div class="minus">-</div>
      <div class="count">{{ cartProduct.qty }}</div>
      <div class="add">+</div>
    </div>
    <div class="subtotal">NT$ {{ subtotal }}</div>
    <div class="delete"><i class="material-icons">delete_outline</i></div>
  </div>
</template>

<script>
export default {
  props: ['cartProduct'],
  computed: {
    subtotal() {
      return this.cartProduct.price * this.cartProduct.qty
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
  > .image {
    &-1 {
      background-image: url(https://images.unsplash.com/photo-1504855328839-2f4baf9e0fd7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=db0c8e5539456faeca0e49c79e2ccb16&auto=format&fit=crop&w=800&q=60);
    }
    &-2 {
      background-image: url(https://images.unsplash.com/photo-1525203135335-74d272fc8d9c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=61b27d2cefd0dd094b5439f897b43bb7&auto=format&fit=crop&w=700&q=60);
    }
    &-3 {
      background-image: url(https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5d2452cace2ee90c9781c7a39c9a30cf&auto=format&fit=crop&w=800&q=60);
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

<template>
  <div class="product-info">
    <div
      class="product-image"
      :style="{backgroundImage:`url(${product.imageUrl})`}"
    ></div>
    <div class="info">
      <div class="name">{{ product.title }} ({{ product.qty }})</div>
      <div class="subtotal">NT$ {{ product.price }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['product']
}
</script>

<style lang="scss" scoped>
.product-info {
  margin-left: 20px;
  margin-top: 16px;
  margin-bottom: 15px;
  @include flex();
  @include media($mobile) {
    margin-left: auto;
    margin-right: auto;
    max-width: 280px;
    justify-content: space-between;
  }
  > .product-image {
    width: 120px;
    height: 80px;
    background-size: cover;
    background-position: center center;
  }
  > .info {
    color: #8da291;
    margin-left: 20px;
    @include flex(column);
    > .name {
      font-size: 16px;
      height: 22px;
      margin-top: 16px;
      @include flex(row, center, center);
    }
    > .subtotal {
      font-size: 20px;
      font-weight: bold;
      height: 28px;
      margin-top: 2px;
      @include media($mobile) {
        align-self: flex-end;
      }
      @include flex(row, center, center);
    }
  }
}
</style>


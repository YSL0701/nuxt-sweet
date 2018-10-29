<template>
  <div class="product-menu">
    <div @click="correctCategory = 1" class="edge" :class="{correct:correctCategory===1}">
      <div class="today-featured">
        <div class="transparent"></div>
      </div>
      <div class="text">本日精選</div>
    </div>
    <div @click="correctCategory = 2" class="edge" :class="{correct:correctCategory===2}">
      <div class="most-popular">
        <div class="transparent"></div>
      </div>
      <div class="text">人氣推薦</div>
    </div>
    <div @click="correctCategory = 3" class="edge" :class="{correct:correctCategory===3}">
      <div class="new-product">
        <div class="transparent"></div>
      </div>
      <div class="text">新品上市</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      correctCategory: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.product-menu {
  @include flex(row, center);
  margin-top: $product-menu-mt;
  @include media($mobile) {
    justify-content: space-between;
    margin-top: 0;
  }
  > .edge {
    overflow: hidden;
    margin-left: 2px;
    position: relative;
    cursor: pointer;
    @include media($desktop) {
      &:hover .today-featured,
      &:hover .most-popular {
        transform: scale(1.5) rotate(10deg);
        filter: blur(0);
      }
      &:hover .new-product {
        transform: scale(1.5) rotate(190deg);
        filter: blur(0);
      }
    }
    @include media($mobile) {
      margin-left: 0;
      width: 33%;
    }
    .today-featured,
    .most-popular,
    .new-product {
      width: 259.67px;
      height: 256px;
      background-size: cover;
      background-position: center center;
      filter: blur(5px);
      transform: scale(1.1);
      transition-property: transform, filter;
      transition-duration: 0.5s;
      @include media($mobile) {
        width: 100%;
        height: 180px;
      }
      .transparent {
        height: 256px;
        background-color: $primary;
        opacity: 0.8;
        @include media($mobile) {
          height: 180px;
        }
      }
    }
    .today-featured {
      background-image: url(https://images.unsplash.com/photo-1490914327627-9fe8d52f4d90?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=73ed228f25bdefd2291c242f6d390fca&auto=format&fit=crop&w=1534&q=80);
    }
    .most-popular {
      background-image: url(https://images.unsplash.com/photo-1504114133367-631ecd3db3ca?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b75e93d90cd88467ae5715becb431a26&auto=format&fit=crop&w=1572&q=80);
    }
    .new-product {
      background-image: url(https://images.unsplash.com/photo-1499638472904-ea5c6178a300?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c27da96f7150c96a92ba8a53c8644761&auto=format&fit=crop&w=1400&q=80);
      transform: scale(1.1) rotate(180deg);
    }
    .text {
      position: absolute;
      width: 24px;
      bottom: 70px;
      left: 117.835px;
      line-height: 30px;
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
      @include media($mobile) {
        width: 20px;
        bottom: 40px;
        left: 50%;
        margin-left: -10px;
        line-height: 24px;
        font-size: 20px;
      }
    }
  }
  .correct {
    .today-featured,
    .most-popular,
    .new-product {
      > .transparent {
        background-color: #ffe180;
        opacity: 0.8;
      }
    }
    > .text {
      color: $primary;
    }
  }
}
</style>

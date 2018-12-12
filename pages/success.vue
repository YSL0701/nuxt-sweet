<template>
  <div class="main">
    <div class="lg-image">
      <div class="check-area">
        <div class="check"><i class="material-icons">check_circle</i></div>
        <span></span>
        <div class="check"><i class="material-icons">check_circle</i></div>
        <span></span>
        <div class="check"><i class="material-icons">check_circle</i></div>
      </div>
      <div class="pay-success"><img
          src="~/static/image/lg-付款成功.svg"
          alt=""
        ></div>
      <router-link
        class="link"
        to="/product"
      >
        <div class="look-product">繼續逛逛</div>
      </router-link>
    </div>
    <router-link
      class="mobileLink"
      to="/product"
    >
      <div class="look-product-mobile">繼續逛逛</div>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  max-width: 1024px;
  margin-bottom: -30px;
  > .lg-image {
    background-image: url(https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2c5a2cf31c693f5c15fb08135bf1adf2&auto=format&fit=crop&w=800&q=60);
    background-position: center center;
    background-size: cover;
    margin-left: $page-gap;
    margin-right: $page-gap;
    height: 460px;
    @include flex(column, flex-start, center);
    @include media($mobile) {
      height: 518px;
      margin-left: 0;
      margin-right: 0;
    }
    > .check-area {
      height: 24px;
      color: $primary;
      margin-top: 128px;
      line-height: 0;
      @include flex(row, center, center);
      @include media($mobile) {
        margin-top: 210px;
      }
      > span {
        height: 2px;
        width: 65px;
        margin-left: -3px;
        margin-right: -3px;
        background-color: $primary;
      }
    }
    > .pay-success {
      width: 190px;
      margin-top: 32px;
      @include media($mobile) {
        margin-top: 33px;
      }
    }
    > .link {
      text-decoration: none;
      > .look-product {
        width: 300px;
        height: 65px;
        background-color: #ffe180;
        font-size: 24px;
        font-weight: bold;
        color: $primary;
        margin-top: 51.3px;
        cursor: pointer;
        transition: background-color 0.3s;
        @include flex(row, center, center);
        @include media($desktop) {
          &:hover {
            background-color: darken(#ffe180, 10%);
          }
        }
        @include media($mobile) {
          display: none;
        }
      }
    }
  }
  > .mobileLink {
    text-decoration: none;
    > .look-product-mobile {
      display: none;
      @include media($mobile) {
        width: 100%;
        height: 65px;
        background-color: #ffe180;
        font-size: 24px;
        font-weight: bold;
        color: $primary;
        cursor: pointer;
        @include flex(row, center, center);
      }
    }
  }
}
</style>



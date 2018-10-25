<template>
  <header>
    <div class="header-container">
      <div class="ham-menu">
        <div class="menu-line"></div>
        <div class="menu-line"></div>
        <div class="menu-line"></div>
      </div>
      <img src="~static/image/logo-all-dark.svg" alt="" class="desktop-logo">
      <img src="~static/image/logotype-sm-dark.svg" alt="" class="mobile-logo">
      <ul>
        <li><a href="./index.html">首頁</a></li>
        <li><a href="./product.html">甜點</a></li>
        <li><a href="./login.html">登入</a></li>
        <li class="cart"><a href="./cart.html"><i class="material-icons">shopping_cart</i></a></li>
      </ul>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  background: #ffffff;
  > .header-container {
    width: 100%;
    max-width: 1024px;
    height: $header-height;
    margin: 0 auto;
    @include flex(row, space-between, center);
    padding-left: $page-gap;
    padding-right: $page-gap;
    @include media($mobile) {
      height: $mobile-header-height;
      padding-left: 0;
      padding-right: 0;
    }
    > .ham-menu {
      display: none;
      @include media($mobile) {
        width: 18px;
        height: 12px;
        margin-left: 33px;
        @include flex(column, space-between);
      }
      > .menu-line {
        width: 100%;
        height: 2px;
        background-color: $primary;
      }
    }
    > .desktop-logo {
      width: 220px;
      height: 40px;
      @include media($mobile) {
        display: none;
      }
    }
    > .mobile-logo {
      display: none;
      @include media($mobile) {
        display: block;
        width: 115px;
        height: 18px;
      }
    }
    > ul {
      list-style: none;
      padding: 0;
      @include flex(row, space-between, center);
      > li {
        display: inline-block;
        margin-left: 60px;
        @include media($mobile) {
          display: none;
        }
        > a {
          text-decoration: none;
          font-size: 16px;
          font-weight: bold;
          color: $primary;
          &:hover {
            color: lighten($primary, 10%);
          }
        }
      }
      > .cart {
        margin-left: 79px;
        @include media($mobile) {
          display: inline-block;
          margin-left: 0;
          margin-right: 30px;
        }
      }
    }
  }
}
</style>

<template>
  <header>
    <div class="header-container">
      <div class="ham-menu">
        <div class="menu-line"></div>
        <div class="menu-line"></div>
        <div class="menu-line"></div>
      </div>
      <img src="~/static/image/logo-all-dark.svg" alt="" class="desktop-logo">
      <img src="~/static/image/logotype-sm-dark.svg" alt="" class="mobile-logo">
      <ul>
        <li>
          <nuxt-link to="/" class="nuxtLink">首頁</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/product" class="nuxtLink">甜點</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/login" class="nuxtLink" v-if="!isLogin">登入</nuxt-link>
          <div class="nuxtLink logout" v-else @click="logout">登出</div>
        </li>
        <li class="cart">
          <nuxt-link to="/cart" class="nuxtLink"><i class="material-icons">shopping_cart</i></nuxt-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      reflashEnd: false
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(cookie => {
        this.$cookies.remove(cookie)
        this.$store.commit('removeCartAll')
      })
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    isLogin() {
      return this.$store.state.auth.isLogin
    }
  },
  created() {
    if (this.$cookies.get('uid')) {
      this.$store.commit('loginStatus', true)
      this.$store.dispatch('checkUser')
    } else {
      this.$store.commit('loginStatus', false)
    }
  },
  beforeMount() {
    if (this.isLogin) {
      this.$store.dispatch('getDbCartData', this.user.uid)
    } else {
      this.$store.commit('localDataToCart')
    }
  },
  watch: {
    isLogin() {
      if (this.isLogin) {
        localStorage.removeItem('cart')
      }
    }
  }
}
</script>

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
        margin-left: 30px;
      }
    }
    > ul {
      list-style: none;
      padding: 0;
      margin: 0;
      @include flex(row, space-between, center);
      > li {
        display: block;
        @include media($mobile) {
          display: none;
        }
        > .nuxtLink {
          text-decoration: none;
          width: 92px;
          height: 100px;
          font-size: 16px;
          font-weight: bold;
          color: $primary;
          @include flex(row, center, center);
          @include media($desktop) {
            transition-property: background-color, color;
            transition-duration: 0.3s;
            &:hover {
              background-color: $primary;
              color: #ffffff;
            }
          }
        }
        > .logout {
          cursor: pointer;
        }
      }
      > .cart {
        @include media($mobile) {
          margin-left: 0;
          @include flex(row, center, center);
        }
        > .nuxtLink {
          width: 73px;
          @include media($mobile) {
            width: 84px;
            height: 84px;
          }
        }
      }
    }
  }
}
</style>

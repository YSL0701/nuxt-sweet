<template>
  <header>
    <div class="header-container">
      <div
        class="ham-menu"
        @click="dropDown = !dropDown"
      >
        <div class="line-box">
          <div
            class="menu-line"
            :class="{'line1-active':dropDown}"
          ></div>
          <div
            class="menu-line"
            :class="{'line2-active':dropDown}"
          ></div>
          <div
            class="menu-line"
            :class="{'line3-active':dropDown}"
          ></div>
        </div>
      </div>
      <img
        src="~/static/image/logo-all-dark.svg"
        alt=""
        class="desktop-logo"
        @click="goToHome"
      >
      <img
        src="~/static/image/logotype-sm-dark.svg"
        alt=""
        class="mobile-logo"
        @click="goToHome"
      >
      <ul>
        <li>
          <nuxt-link
            to="/"
            class="nuxtLink"
          >首頁</nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/product"
            class="nuxtLink"
          >甜點</nuxt-link>
        </li>
        <li v-if="isLogin">
          <nuxt-link
            to="/checkOrder"
            class="nuxtLink"
          >{{ checkOrderText }}</nuxt-link>
        </li>
        <li v-if="!isLogin">
          <nuxt-link
            to="/registered"
            class="nuxtLink"
          >{{ registeredText }}</nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/login"
            class="nuxtLink"
            v-if="!isLogin"
          >{{ loginText }}</nuxt-link>
          <div
            class="nuxtLink logout"
            v-else
            @click="logout"
          >{{ logoutText }}</div>
        </li>
        <li class="cart">
          <nuxt-link
            to="/cart"
            class="nuxtLink"
          ><i class="material-icons">shopping_cart</i>
            <div
              class="cartQtyCount"
              v-if="cartProductQty>0"
            >{{ cartProductQty }}</div>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <dropDownMenu
      class="dropDownMenu"
      :class="{dropDownMenuOpen:dropDown}"
      :drop-down.sync="dropDown"
    />
  </header>
</template>

<script>
import dropDownMenu from './dropDownMenu.vue'
export default {
  data() {
    return {
      dropDown: false
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(cookie => {
        this.$cookies.remove(cookie)
        this.$store.commit('removeCartAll')
        this.$store.commit('clearOrderInfo')
        this.$store.commit('removeCompleteOrderInfo')
        this.$store.commit('removeAllMessage')
        this.$store.commit('addMessage', {
          content: '已登出',
          id: 'logout',
          type: 'normal'
        })
      })
    },
    checkLoginStatus() {
      return new Promise((resolve, reject) => {
        if (this.$cookies.get('uid')) {
          this.$store.commit('loadingStatus', true)
          this.$store.dispatch('checkUser', this.$cookies.get('uid')).then(uid => {
            resolve(uid)
          })
        } else {
          this.$store.commit('loginStatus', false)
          resolve()
        }
      })
    },
    cartInit(uid) {
      if (this.isLogin) {
        this.$store.dispatch('getDbCartData', uid).then(() => {
          this.$store.commit('loadingStatus', false)
        })
      } else {
        this.$store.commit('localDataToCart')
      }
    },
    goToHome() {
      this.$router.push('/')
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    isLogin() {
      return this.$store.state.auth.isLogin
    },
    cartProductQty() {
      return this.$store.state.cart.cart.reduce((prev, next) => {
        return prev + next.qty
      }, 0)
    },
    isLoading() {
      return this.$store.state.loading.isLoading
    },
    loginText() {
      if (!this.isLoading) {
        return '登入'
      }
      return ''
    },
    logoutText() {
      if (!this.isLoading) {
        return '登出'
      }
      return ''
    },
    registeredText() {
      if (!this.isLoading) {
        return '註冊'
      }
      return ''
    },
    checkOrderText() {
      if (!this.isLoading) {
        return '查詢訂單'
      }
      return ''
    }
  },
  mounted() {
    this.checkLoginStatus().then(uid => {
      this.cartInit(uid)
    })
  },
  watch: {
    isLogin() {
      if (this.isLogin) {
        this.$store.dispatch('getDbCartData', this.user.uid).then(item => {
          this.$store.dispatch('updateCartToDb', { uid: item.uid, newCart: item.mixCart })
        })
      } else {
        this.$store.commit('localDataToCart')
      }
    }
  },
  components: {
    dropDownMenu
  }
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  > .header-container {
    background: #ffffff;
    position: relative;
    z-index: 10;
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
        width: 84px;
        height: 84px;
        cursor: pointer;
        @include flex(row, center, center);
      }
      > .line-box {
        width: 18px;
        height: 13px;
        @include flex(column, space-between);
        > .menu-line {
          width: 100%;
          height: 2px;
          background-color: $primary;
          transition-property: transform, opacity, top, width;
          transition-duration: 0.6s;
          position: relative;
          top: 0;
        }
        > .line1-active {
          transform: rotate(225deg);
          // transform: rotate(45deg);
          top: 5px;
          width: 20px;
        }
        > .line2-active {
          transform: rotate(-45deg);
          // transform: rotate(-225deg);
          width: 20px;
        }
        > .line3-active {
          opacity: 0;
          width: 20px;
        }
      }
    }
    > img {
      cursor: pointer;
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
          position: relative;
          @include media($mobile) {
            width: 84px;
            height: 84px;
          }
          > .cartQtyCount {
            position: absolute;
            width: 25px;
            height: 25px;
            top: 20px;
            left: 40px;
            color: $primary;
            background-color: #ffe180;
            font-size: 16px;
            border-radius: 50%;
            @include flex(row, center, center);
            @include media($mobile) {
              top: 10px;
              left: 45px;
            }
          }
        }
      }
    }
  }
  > .dropDownMenu {
    position: absolute;
    display: none;
    z-index: 8;
    @include media($mobile) {
      display: block;
      top: -200px;
      width: 100%;
      transition-property: top;
      transition-duration: 0.6s;
      background-color: rgba(255, 255, 255, 0.8);
    }
  }
  > .dropDownMenuOpen {
    @include media($mobile) {
      top: 84px;
    }
  }
}
</style>

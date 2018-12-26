<template>
  <div class="menu">
    <div
      @click="goTo('/')"
      class="index"
    >首頁</div>
    <div
      @click="goTo('/product')"
      class="product"
    >甜點</div>
    <div
      @click="goTo('/checkOrder')"
      class="checkOrder"
      v-if="isLogin"
    >查詢訂單</div>
    <div
      @click="goTo('/registered')"
      class="registered"
      v-if="!isLogin"
    >註冊</div>
    <div
      @click="goTo('/login')"
      class="login"
      v-if="!isLogin"
    >登入</div>
    <div
      class="logout"
      @click="logout"
      v-else
    >登出</div>
    <div
      @click="goTo('/cart')"
      class="cart"
    >購物車</div>
  </div>
</template>

<script>
export default {
  props: ['dropDown'],
  methods: {
    logout() {
      this.$store.dispatch('logout').then(cookie => {
        this.$cookies.remove(cookie)
        this.$store.commit('removeCartAll')
        this.$store.commit('clearOrderInfo')
        this.$store.commit('removeCompleteOrderInfo')
        this.$store.commit('removeAllMessage')
        this.closeMenu()
        this.$store.commit('addMessage', {
          content: '已登出',
          id: 'logout',
          type: 'normal'
        })
      })
    },
    goTo(path) {
      this.$router.push(path)
      this.closeMenu()
    },
    closeMenu() {
      this.$emit('update:dropDown', false)
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.auth.isLogin
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
  > div {
    height: 35px;
    padding-left: 45px;
    color: $primary;
    cursor: pointer;
    @include flex(row, flex-start, center);
  }
}
</style>

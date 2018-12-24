<template>
  <div class="main">
    <orderInfo
      v-for="item in orderInfo"
      :order-data="item"
      :key="item.orderId"
      class="orderInfo"
    />
    <div
      class="notHaveOrder"
      v-if="orderInfo.length<1 && !$store.state.loading.isLoading"
    >目前沒有訂單</div>
  </div>
</template>

 <script>
import orderInfo from '~/components/orderInfo'
export default {
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    orderInfo() {
      return this.$store.state.order.orderInfo.reverse()
    }
  },
  components: {
    orderInfo
  },
  created() {
    var uid = this.$cookies.get('uid')
    this.$store.commit('loadingStatus', true)
    this.$store.dispatch('getOrder', uid).then(() => {
      this.$store.commit('loadingStatus', false)
    })
  },
  watch: {
    '$store.state.auth.user'() {
      if (!this.$store.state.auth.user) {
        this.$router.push('/')
      }
    }
  },
  head() {
    return {
      title: '查詢訂單'
    }
  },
  middleware: 'loginCheck'
}
</script>
 
<style lang="scss" scoped>
.main {
  max-width: 940px;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  > .orderInfo {
    margin-bottom: 20px;
  }
  > .notHaveOrder {
    font-size: 28px;
    color: $primary;
    margin-top: 80px;
    margin-bottom: 50px;
    @include flex(row, center);
    @include media($tablet) {
      margin-top: 150px;
      margin-bottom: 160px;
    }
    @include media($mobile) {
      margin-top: 70px;
      margin-bottom: 90px;
    }
  }
}
</style>
 
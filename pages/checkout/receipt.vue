<template>
  <div class="checkout-info">
    <div class="info">
      <div class="title">
        <div class="text">發票</div>
        <div class="step">
          <div
            class="checked"
            title="運送"
            @click="$router.push('/checkout/recipientInfo')"
          >
            <i class="material-icons">check_circle</i>
          </div>
          <span class="passed"></span>
          <div
            class="checked"
            title="付款"
            @click="$router.push('/checkout/payment')"
          >
            <i class="material-icons">check_circle</i>
          </div>
          <span class="passed"></span>
          <div class="unchecked currently">
            <div class="inner"></div>
          </div>
        </div>
      </div>
      <div class="receipt">
        <div class="receipt-type">
          <div
            class="electronic"
            :class="{ active:receiptType==='email' }"
            @click="type = 'email'"
          >電子發票</div>
          <div
            class="mail"
            :class="{ active:receiptType==='mail' }"
            @click="type = 'mail'"
          >郵寄發票</div>
        </div>
        <div
          class="email"
          v-show="receiptType === 'email'"
        >
          <div class="text">電子郵件信箱</div>
          <input
            type="email"
            placeholder="example@email.com"
            v-model="email"
            @blur="focused.email = true"
          >
        </div>
        <validateText
          class="validate"
          text="請輸入正確的emial"
          v-show="!emailValidate && focused.email && receiptType === 'email'"
        />
        <div
          class="address"
          v-show="receiptType === 'mail'"
        >
          <div class="title">
            <div class="text">地址</div>
            <label for="same">
              <input
                type="checkbox"
                id="same"
                class="checkbox"
                v-model="isSameAddress"
                @click="sameAsRecipientAddress"
              >
              <div class="ischeck"><i class="material-icons">check_box</i></div>
              <div class="uncheck"><i class="material-icons">check_box_outline_blank</i></div>
              <div class="text">同運送地址</div>
            </label>
          </div>
          <div class="input-area">
            <input
              type="text"
              class="city"
              placeholder="高雄市"
              v-model="city"
              @blur="focused.city = true"
            >
            <input
              type="text"
              class="district"
              placeholder="新興區"
              v-model="district"
              @blur="focused.district = true"
            >
            <input
              type="text"
              class="detail"
              placeholder="幸福路 520 號"
              v-model="detail"
              @blur="focused.detail = true"
            >
          </div>
        </div>
        <validateText
          class="validate"
          text="請輸入完整地址"
          v-show="focused.city && focused.district && focused.detail && !addressValidate && type === 'mail'"
        />
        <div class="GUI-num">
          <div class="text">統一編號 (選填)</div>
          <input
            type="text"
            placeholder="12345678"
            v-model="GUI"
          >
        </div>
      </div>
    </div>
    <div
      class="next"
      @click="next"
    >下一步</div>
  </div>
</template>

<script>
import validateText from '~/components/validateText.vue'
export default {
  data() {
    return {
      type: 'email',
      email: '',
      GUI: '',
      city: '',
      district: '',
      detail: '',
      focused: {
        email: false,
        city: false,
        district: false,
        detail: false
      },
      isSameAddress: false
    }
  },
  methods: {
    next() {
      if (this.type === 'email') {
        if (this.emailValidate) {
          this.$store.commit('loadingStatus', true)
          this.$store.commit('addReceiptInfo', {
            email: this.email,
            GUI: this.GUI
          })
          this.createOrder().then(() => {
            this.$store.commit('clearCart')
            this.$store.commit('clearOrderInfo')
            this.$router.push('/success')
            this.$store.commit('loadingStatus', false)
            this.addMessage()
          })
        } else {
          this.focused.email = true
        }
      } else if (this.type === 'mail') {
        if (this.addressValidate) {
          this.$store.commit('loadingStatus', true)
          this.$store.commit('addReceiptInfo', {
            city: this.city,
            district: this.district,
            detail: this.detail,
            GUI: this.GUI
          })
          this.createOrder().then(() => {
            this.$store.commit('clearCart')
            this.$store.commit('clearOrderInfo')
            this.$router.push('/success')
            this.$store.commit('loadingStatus', false)
            this.addMessage()
          })
        } else {
          this.focused.city = true
          this.focused.district = true
          this.focused.detail = true
        }
      }
    },
    getStateData() {
      var { receiptType, email, GUI, city, district, detail } = this.$store.state.order.receiptInfo
      this.type = receiptType
      this.email = email
      this.GUI = GUI
      this.city = city
      this.district = district
      this.detail = detail
    },
    sameAsRecipientAddress() {
      this.isSameAddress = !this.isSameAddress
      if (this.isSameAddress) {
        var { city, district, detail } = this.$store.state.order.recipientInfo
        this.city = city
        this.district = district
        this.detail = detail
      } else {
        this.city = ''
        this.district = ''
        this.detail = ''
      }
    },
    createOrder() {
      var finalOrderData = this.orderData
      var timestamp = Math.floor(Date.now() / 1000)
      finalOrderData.date = new Date()
      finalOrderData.orderId = `${this.user.uid.slice(0, 3)}${timestamp}`
      finalOrderData.uid = this.user.uid
      finalOrderData.isPaid = false
      finalOrderData.product = this.cartContent
      finalOrderData.subtotal = this.cartSubtotal
      finalOrderData.freight = 300
      finalOrderData.total = this.total
      return this.$store
        .dispatch('createOrder', finalOrderData)
        .then(() => {
          return this.$store.dispatch('updateCartToDb', { uid: this.user.uid, newCart: {} })
        })
        .then(() => {
          return this.$store.dispatch('updateUnfinishedOrderToDb', { uid: this.user.uid, orderData: {} })
        })
    },
    addMessage() {
      this.$store.commit('addMessage', {
        content: `結帳成功！`,
        id: Date.now()
      })
    }
  },
  computed: {
    receiptType() {
      if (this.type === 'email' || this.type === '') {
        return 'email'
      } else if (this.type === 'mail') {
        return 'mail'
      }
    },
    emailValidate() {
      var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
      return emailRule.test(this.email)
    },
    addressValidate() {
      return this.city.length > 0 && this.district.length > 0 && this.detail.length > 0
    },
    user() {
      return this.$store.state.auth.user
    },
    orderData() {
      return this.$store.state.order
    },
    cartContent() {
      return this.$store.state.cart.cart
    },
    cartSubtotal() {
      var subtotal = 0
      this.$store.state.cart.cart.forEach(cartProduct => {
        subtotal = subtotal + cartProduct.qty * cartProduct.price
      })
      return subtotal
    },
    total() {
      if (this.cartSubtotal > 0) {
        return this.cartSubtotal + 300
      } else {
        return 0
      }
    }
  },
  components: {
    validateText
  },
  created() {
    if (this.$store.state.order.receiptInfo.receiptType) {
      this.getStateData()
    } else {
      var uid = this.$cookies.get('uid')
      this.$store.dispatch('getUnfinishedOrder', uid).then(() => {
        if (this.$store.state.order.receiptInfo.receiptType) {
          this.getStateData()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.checkout-info {
  width: 460px;
  background-color: $primary;
  @include media($mobile) {
    width: 100%;
  }
  > .info {
    padding-left: 40px;
    padding-right: 40px;
    @include flex(column, flex-start, center);
    @include media($mobile) {
      padding-left: 30px;
      padding-right: 30px;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }
    > .title {
      height: 50px;
      width: 100%;
      margin-top: 30px;
      @include flex(row, space-between, center);
      > .text {
        font-size: 36px;
        font-weight: bold;
        color: $secondary;
      }
      > .step {
        @include flex(row, flex-start, center);
        > .unchecked {
          width: 20px;
          height: 20px;
          background-color: $primary;
          border-radius: 50%;
          border: 1px solid #8da291;
        }
        > .checked {
          width: 24px;
          height: 24px;
          margin-right: -2px;
          margin-left: -2px;
          color: $secondary;
          cursor: pointer;
        }
        > span {
          width: 66px;
          height: 1px;
          background-color: #8da291;
          @include media($mobile) {
            width: 53.47px;
          }
        }
        .passed {
          background-color: $secondary;
        }
        > .currently {
          background-color: $secondary;
          @include flex(row, center, center);
          border: none;
          > .inner {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid $primary;
          }
        }
      }
    }
    > .receipt {
      width: 100%;
      > .receipt-type {
        margin-top: 30px;
        @include flex();
        @include media($mobile) {
          @include flex(row, center, center);
        }
        > div {
          width: 190px;
          height: 56px;
          background-color: $primary;
          color: $secondary;
          font-size: 20px;
          font-weight: bold;
          @include flex(row, center, center);
          border: 1px solid $secondary;
          cursor: pointer;
          @include media($desktop) {
            &:hover {
              border: 2px solid $secondary;
            }
          }
          @include media($mobile) {
            width: 50%;
          }
        }
        .active {
          background-color: $secondary;
          color: $primary;
        }
      }
      > .email {
        margin-top: 30px;
        > .text {
          width: 120px;
          height: 28px;
          font-size: 20px;
          color: $secondary;
          font-weight: bold;
          @include flex(row, flex-start, center);
        }
        > input {
          margin-top: 8px;
          padding-left: 20px;
          width: 380px;
          height: 56px;
          background-color: $secondary;
          border: none;
          font-size: 16px;
          color: $primary;
          @include media($mobile) {
            width: 100%;
          }
        }
      }
      > .address {
        margin-top: 30px;
        > .title {
          height: 100%;
          @include flex(row, space-between, center);
          > .text {
            width: 40px;
            height: 28px;
            font-size: 20px;
            font-weight: bold;
            color: $secondary;
            @include flex(row, flex-start, center);
          }
          > label {
            width: 104px;
            height: 22px;
            color: $secondary;
            position: relative;
            cursor: pointer;
            font-size: 16px;
            @include flex(row, space-between, center);
            > input {
              opacity: 0;
              position: absolute;
              right: -15px;
              &:checked ~ .ischeck {
                @include flex(row, center, center);
              }
              &:checked ~ .uncheck {
                display: none;
              }
            }
            > .ischeck,
            .uncheck {
              width: 22px;
              height: 22px;
            }
            > .ischeck {
              display: none;
            }
            > .uncheck {
              @include flex(row, center, center);
            }
            > .text {
              width: 80px;
              height: 22px;
              font-size: 16px;
              @include flex(row, flex-start, center);
            }
          }
        }
        .input-area {
          margin-top: 8px;
          @include flex(row, space-between);
          flex-wrap: wrap;
          > input {
            height: 56px;
            background-color: $secondary;
            border: none;
            padding-left: 20px;
            font-size: 16px;
            color: #8da291;
          }
          > .city {
            width: 186px;
          }
          > .district {
            width: 186px;
          }
          @include media($mobile) {
            > .city,
            .district {
              width: calc(50% - 4.5px);
            }
          }
          > .detail {
            width: 100%;
            margin-top: 8px;
          }
        }
      }
      > .GUI-num {
        margin-top: 16px;
        > .text {
          width: 160px;
          height: 28px;
          color: $secondary;
          font-size: 20px;
          font-weight: bold;
          @include flex(row, flex-start, center);
        }
        > input {
          margin-top: 8px;
          padding-left: 20px;
          width: 380px;
          height: 56px;
          background-color: $secondary;
          border: none;
          font-size: 16px;
          color: $primary;
          @include media($mobile) {
            width: 100%;
          }
        }
      }
      > .validate {
        margin-top: 10px;
        margin-bottom: -10px;
        align-self: flex-start;
      }
    }
  }
  > .next {
    width: 100%;
    height: 65px;
    margin-top: 30px;
    background-color: #ffe180;
    color: $primary;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    @include flex(row, center, center);
    @include media($desktop) {
      &:hover {
        background-color: darken(#ffe180, 10%);
      }
    }
  }
}
</style>


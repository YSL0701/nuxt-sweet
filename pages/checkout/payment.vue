<template>
  <div class="checkout-info">
    <div class="info">
      <div class="title">
        <div class="text">付款</div>
        <div class="step">
          <div class="checked">
            <i class="material-icons">check_circle</i>
          </div>
          <span class="passed"></span>
          <div class="unchecked currently">
            <div class="inner"></div>
          </div>
          <span></span>
          <div class="unchecked">
            <div class="inner"></div>
          </div>
        </div>
      </div>
      <div class="creditCard">
        <div class="text">信用卡卡號</div>
        <div class="card-number">
          <input
            type="text"
            placeholder="9012-3456-7890-1234"
            v-model="cardNumber"
            @blur="focused.cardNumber = true"
            @input="addHyphen"
            maxlength="19"
          >
          <div class="card-icon">
            <i class="material-icons">credit_card</i>
          </div>
        </div>
      </div>
      <validateText
        class="validate"
        text="請輸入正確格式的信用卡號"
        v-show="focused.cardNumber && !cardNumberValidate"
      />
      <div class="cardholder-name">
        <div class="text">持卡人姓名</div>
        <div class="input-area">
          <input
            type="text"
            placeholder="王"
            v-model="lastName"
            @blur="focused.lastName =true"
          >
          <input
            type="text"
            placeholder="小明"
            v-model="firstName"
            @blur="focused.firstName = true"
          ></div>
      </div>
      <validateText
        class="validate"
        text="請輸入持卡人姓名"
        v-show="focused.firstName && focused.lastName && !fullNameValidate"
      />
      <div class="expiration-date">
        <div class="text">有效期限</div>
        <div class="input-area">
          <input
            type="text"
            placeholder="月"
            v-model="expirationDate.month"
            @blur="focused.expirationDate.month = true"
            maxlength="2"
          >
          <input
            type="text"
            placeholder="年"
            v-model="expirationDate.year"
            @blur="focused.expirationDate.year = true"
            maxlength="2"
          ></div>
      </div>
      <validateText
        class="validate"
        text="請輸入正確的有效期限"
        v-show="focused.expirationDate.month && focused.expirationDate.year && !expirationDateValidate"
      />
      <div class="security-code">
        <div class="text">背面末三碼</div>
        <input
          type="text"
          placeholder="123"
          v-model="securityCode"
          @blur="focused.securityCode = true"
          maxlength="3"
        >
      </div>
      <validateText
        class="validate"
        text="請輸入背面末三碼"
        v-show="focused.securityCode && !securityCodeValidate"
      />
    </div>
    <div
      class="next"
      onclick="location.href='./checkout-3-1.html'"
    >下一步</div>
  </div>
</template>

<script>
import validateText from '~/components/validateText.vue'
export default {
  data(){
    return{
      cardNumber:'',
      lastName: '',
      firstName: '',
      expirationDate:{
        month:null,
        year:null
      },
      securityCode:'',
      focused:{
        cardNumber:false,
        lastName:false,
        firstName:false,
        expirationDate:{
          month:false,
          year:false
        },
        securityCode:false
      }
    }
  },
  methods:{
    addHyphen(){
      this.cardNumber = this.cardNumber.replace(/(\d{4})(?=\d)/g, "$1-")
    },
    next(){
      if(this.cardNumberValidate && this.fullNameValidate && this.expirationDateValidate && this.securityCodeValidate){
        this.$store.commit('addPaymentInfo',{
          cardNumber:this.cardNumber,
          lastName:this.lastName,
          firstName:this.firstName,
          expirationDate:this.expirationDate,
          securityCode:this.securityCode
        })
      }
    }
  },
  computed:{
    pureCardNumber(){
      return this.cardNumber.split('-').join('') * 1
    },
    cardNumberValidate(){
      var cardNumberRule = /^\d{4}-\d{4}-\d{4}-\d{4}$/
      return cardNumberRule.test(this.cardNumber)
    },
    fullNameValidate() {
      return this.lastName.length && this.firstName.length
    },
    expirationDateValidate(){
      return this.expirationDate.month > 0 && this.expirationDate.month<13 && this.expirationDate.year.length === 2
    },
    securityCodeValidate(){
      return this.securityCode.length === 3
    }
  },
  components:{
    validateText
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
    > .creditCard {
      width: 100%;
      margin-top: 30px;
      > .text {
        width: 100px;
        height: 28px;
        color: $secondary;
        font-size: 20px;
        font-weight: bold;
        @include flex(row, center, center);
      }
      > .card-number {
        width: 100%;
        margin-top: 8px;
        @include flex();
        > input {
          width: calc(100% - 64px);
          height: 56px;
          background-color: $secondary;
          color: $primary;
          border: none;
          padding-left: 20px;
          font-size: 16px;
        }
        > .card-icon {
          width: 64px;
          height: 56px;
          color: $primary;
          background-color: $secondary;
          @include flex(row, center, center);
        }
      }
    }
    > .cardholder-name {
      width: 100%;
      margin-top: 16px;
      > .text {
        width: 100px;
        height: 28px;
        color: $secondary;
        font-size: 20px;
        font-weight: bold;
        @include flex(row, center, center);
      }
      > .input-area {
        width: 100%;
        margin-top: 8px;
        @include flex(row, space-between);
        > input {
          width: 186px;
          height: 56px;
          background-color: $secondary;
          color: $primary;
          border: none;
          padding-left: 20px;
          font-size: 16px;
          @include media($mobile) {
            width: calc(50% - 4.5px);
          }
        }
      }
    }
    > .expiration-date {
      width: 100%;
      margin-top: 16px;
      > .text {
        width: 80px;
        height: 28px;
        color: $secondary;
        font-size: 20px;
        font-weight: bold;
        @include flex(row, center, center);
      }
      > .input-area {
        width: 100%;
        margin-top: 8px;
        @include flex(row, space-between);
        > input {
          width: 186px;
          height: 56px;
          background-color: $secondary;
          color: $primary;
          border: none;
          padding-left: 20px;
          font-size: 16px;
          @include media($mobile) {
            width: calc(50% - 4.5px);
          }
        }
      }
    }
    > .security-code {
      width: 100%;
      margin-top: 16px;
      > .text {
        width: 100px;
        height: 28px;
        color: $secondary;
        font-size: 20px;
        font-weight: bold;
        @include flex(row, flex-start, center);
      }
      > input {
        width: 186px;
        height: 56px;
        margin-top: 8px;
        background-color: $secondary;
        color: $primary;
        border: none;
        padding-left: 20px;
        font-size: 16px;
        @include media($mobile) {
          width: calc(50% - 4.5px);
        }
      }
    }
    > .validate {
      margin-top: 10px;
      margin-bottom: -10px;
      align-self: flex-start;
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



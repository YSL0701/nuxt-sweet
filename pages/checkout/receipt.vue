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
            @click="receiptType = 'email'"
          >電子發票</div>
          <div
            class="mail"
            :class="{ active:receiptType==='mail' }"
            @click="receiptType = 'mail'"
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
          >
        </div>
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
            >
            <input
              type="text"
              class="district"
              placeholder="新興區"
            >
            <input
              type="text"
              class="detail"
              placeholder="幸福路 520 號"
            >
          </div>
        </div>
        <div class="GUI-num">
          <div class="text">統一編號 (選填)</div>
          <input
            type="text"
            placeholder="12345678"
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
export default {
  data(){
    return {
      receiptType:'email',

    }
  },
  methods:{
    next(){

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


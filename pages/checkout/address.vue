<template>
  <div class="checkout-info">
    <div class="info">
      <div class="title">
        <div class="text">運送</div>
        <div class="step">
          <div class="unchecked currently">
            <div class="inner"></div>
          </div>
          <span></span>
          <div class="unchecked">
            <div class="inner"></div>
          </div>
          <span></span>
          <div class="unchecked">
            <div class="inner"></div>
          </div>
        </div>
      </div>
      <div class="name-area">
        <div class="last-name">
          <div class="text">姓氏</div>
          <input type="text" placeholder="王" v-model="lastName">
        </div>
        <div class="name">
          <div class="text">名字</div>
          <input type="text" placeholder="小明" v-model="firstName">
        </div>
      </div>
      <div class="tel">
        <div class="text">電話</div>
        <input type="tel" placeholder="0912-345-678" v-model="tel">
      </div>
      <div class="address">
        <div class="text">地址</div>
        <div class="input-area">
          <input type="text" class="city" placeholder="高雄市" v-model="city">
          <input type="text" class="district" placeholder="新興區" v-model="district">
          <input type="text" class="detail" placeholder="幸福路 520 號" v-model="detail">
        </div>
      </div>
    </div>
    <div class="next" @click="next">下一步</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastName: '',
      firstName: '',
      tel: null,
      city: '',
      district: '',
      detail: ''
    }
  },
  methods: {
    next() {
      this.$router.push('/checkout/payment')
    }
  },
  computed: {
    address() {
      return this.city + this.district + this.detail
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
    > .name-area {
      margin-top: 30px;
      width: 100%;
      height: 92px;
      @include flex(row, space-between);
      > .last-name {
        height: 100%;
        @include flex(column, space-between, flex-start);
        @include media($mobile) {
          width: calc(50% - 4.5px);
        }
        > .text {
          width: 40px;
          height: 28px;
          font-size: 20px;
          font-weight: bold;
          color: $secondary;
          @include flex(row, center, center);
        }
        > input {
          width: 186px;
          height: 56px;
          background-color: $secondary;
          border: none;
          padding-left: 20px;
          font-size: 16px;
          color: #8da291;
          @include media($mobile) {
            width: 100%;
          }
        }
      }
      > .name {
        height: 100%;
        @include flex(column, space-between, flex-start);
        @include media($mobile) {
          width: calc(50% - 4.5px);
        }
        > .text {
          width: 40px;
          height: 28px;
          font-size: 20px;
          font-weight: bold;
          color: $secondary;
          @include flex(row, center, center);
        }
        > input {
          width: 186px;
          height: 56px;
          background-color: $secondary;
          border: none;
          padding-left: 20px;
          font-size: 16px;
          color: #8da291;
          @include media($mobile) {
            width: 100%;
          }
        }
      }
    }
    > .tel {
      width: 100%;
      height: 92px;
      margin-top: 16px;
      @include flex(column, space-between);
      > .text {
        width: 40px;
        height: 28px;
        font-size: 20px;
        font-weight: bold;
        color: $secondary;
        @include flex(row, flex-start, center);
      }
      > input {
        width: 100%;
        height: 56px;
        background-color: $secondary;
        border: none;
        padding-left: 20px;
        font-size: 16px;
        color: #8da291;
      }
    }
    > .address {
      margin-top: 16px;
      > .text {
        width: 40px;
        height: 28px;
        font-size: 20px;
        font-weight: bold;
        color: $secondary;
        @include flex(row, flex-start, center);
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


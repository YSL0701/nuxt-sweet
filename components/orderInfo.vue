<template>
  <div class="infoCard">
    <div class="info">
      <div class="date">
        <div class="title">日期</div>
        <div class="data">
          <div class="date">{{year}}/{{month}}/{{date}}</div>
          <div class="date_mobile">
            <div class="year">{{year}}</div>
            <div class="month-data">{{month}}/{{date}}</div>
          </div>
          <div class="time">{{hours}}:{{minutes}}:{{seconds}}</div>
        </div>
      </div>
      <div class="total">
        <div class="title"><span class="desktop">消費金額</span>
          <span class="mobile">金額</span></div>
        <div class="data">${{ orderData.total }}</div>
      </div>
      <div class="orderId">
        <div class="title">訂單編號</div>
        <div class="data">{{ orderData.orderId }}</div>
      </div>
      <div
        class="detail"
        @click="showDetail"
      >
        <span class="desktop">
          訂單明細
          <i
            class="fas fa-sort-down"
            v-if="!detailOpen"
          ></i>
          <i
            class="fas fa-sort-up"
            v-else
          ></i>
        </span>
        <span class="mobile"><i
            class="fas fa-sort-down"
            v-if="!detailOpen"
          ></i>
          <i
            class="fas fa-sort-up"
            v-else
          ></i></span>
      </div>
    </div>
    <div
      class="product"
      v-if="detailOpen"
    >
      <div class="productCard">
        <orderInfoProductCard
          v-for="item in orderData.product"
          :product="item"
          :key="item.id"
        />
      </div>
      <div class="detail">
        <div class="subtotal">
          <div class="title">小計</div>
          <div class="value">NT$ {{ orderData.subtotal }}</div>
        </div>
        <div class="freight">
          <div class="title">運費</div>
          <div class="value">NT$ {{ orderData.freight }}</div>
        </div>
        <div class="total-price">
          <div class="title">總計</div>
          <div class="value">NT$ {{ orderData.total }}</div>
        </div>
        <div class="status">
          <div class="title">配送狀態</div>
          <div class="value">{{ orderData.status }}</div>
        </div>
        <div class="recipient">
          <div class="title">收件人</div>
          <div class="value">{{ orderData.recipientInfo.lastName + orderData.recipientInfo.firstName }}</div>
        </div>
        <div class="tel">
          <div class="title">手機</div>
          <div class="value">{{ orderData.recipientInfo.tel }}</div>
        </div>
        <div class="address">
          <div class="title">收件地址</div>
          <div class="value">{{ address }}</div>
        </div>
        <div class="isPaid">
          <div class="title">付款狀態</div>
          <div class="value">
            <span v-if="orderData.isPaid">已付款</span>
            <span v-else>尚未付款</span>
          </div>
        </div>
        <div
          class="GUI"
          v-if="orderData.receiptInfo.GUI"
        >
          <div class="title">統一編號</div>
          <div class="value">{{ this.orderData.receiptInfo.GUI }}</div>
        </div>
        <div
          class="receiptAddress"
          v-if="receiptAddress"
        >
          <div class="title">發票寄送地址</div>
          <div class="value">{{ receiptAddress }}</div>
        </div>
        <div
          class="receiptEmailAddress"
          v-if="orderData.receiptInfo.email"
        >
          <div class="title">電子發票寄送email</div>
          <div class="value">{{ this.orderData.receiptInfo.email }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderInfoProductCard from '~/components/orderInfoProductCard.vue'
export default {
  props: ['orderData'],
  data() {
    return {
      detailOpen: false
    }
  },
  methods: {
    showDetail() {
      this.detailOpen = !this.detailOpen
    }
  },
  computed: {
    fullDate() {
      return new Date(this.orderData.date.seconds * 1000)
    },
    year() {
      return this.fullDate.getFullYear()
    },
    month() {
      return this.fullDate.getMonth() + 1
    },
    date() {
      return this.fullDate.getDate()
    },
    hours() {
      var hours = this.fullDate.getHours()
      if (hours < 10) {
        hours = `0${this.fullDate.getHours()}`
      }
      return hours
    },
    minutes() {
      var minutes = this.fullDate.getMinutes()
      if (minutes < 10) {
        minutes = `0${this.fullDate.getMinutes()}`
      }
      return minutes
    },
    seconds() {
      var seconds = this.fullDate.getSeconds()
      if (seconds < 10) {
        seconds = `0${this.fullDate.getSeconds()}`
      }
      return seconds
    },
    address() {
      var recipientInfo = this.orderData.recipientInfo
      return `${recipientInfo.city}${recipientInfo.district}${recipientInfo.detail}`
    },
    receiptAddress() {
      var receiptInfo = this.orderData.receiptInfo
      if (receiptInfo.city && receiptInfo.district && receiptInfo.detail) {
        return `${receiptInfo.city}${receiptInfo.district}${receiptInfo.detail}`
      } else {
        return null
      }
    }
  },
  components: {
    orderInfoProductCard
  }
}
</script>

<style lang="scss" scoped>
.infoCard {
  width: 100%;
  color: $primary;
  > .info {
    background-color: $secondary;
    height: 80px;
    @include flex();
    > .date {
      min-width: 100px;
      width: calc((100% - 110px) / 3);
      @include media($mobile) {
        min-width: 70px;
        width: calc((100% - 50px) / 3);
      }
      > .data {
        > .date_mobile {
          display: none;
          @include media($mobile) {
            display: block;
          }
        }
        > .date,
        > .time {
          @include media($mobile) {
            display: none;
          }
        }
      }
      > div {
        max-width: 80px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        @include media($mobile) {
          max-width: 50px;
        }
      }
    }
    > .total {
      min-width: 100px;
      border-left: 2px solid $primary;
      border-right: 2px solid $primary;
      padding-left: 10px;
      padding-right: 10px;
      width: calc((100% - 110px) / 3);
      @include media($mobile) {
        min-width: 70px;
        width: calc((100% - 50px) / 3);
      }
      > .title {
        > .desktop {
          @include media($mobile) {
            display: none;
          }
        }
        > .mobile {
          display: none;
          @include media($mobile) {
            display: block;
          }
        }
      }
      > .data {
        margin-top: 5px;
      }
      > div {
        max-width: 100px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        @include media($mobile) {
          max-width: 80px;
        }
      }
    }
    > .orderId {
      min-width: 150px;
      padding-left: 5px;
      padding-right: 5px;
      border-right: 2px solid $primary;
      width: calc((100% - 110px) / 3);
      @include media($mobile) {
        min-width: 100px;
        width: calc((100% - 50px) / 3);
      }
      > .data {
        margin-top: 5px;
        word-break: break-all;
      }
      > div {
        max-width: 120px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
      }
    }
    > .detail {
      font-size: 18px;
      font-weight: bold;
      width: 110px;
      height: 80px;
      cursor: pointer;
      @include flex(row, center, center);
      @include media($mobile) {
        width: 50px;
      }
      > .desktop {
        > .fas {
          margin-left: 3px;
          position: relative;
        }
        > .fa-sort-down {
          bottom: 3px;
          // @include flex(row, center, center);
        }
        @include media($mobile) {
          display: none;
        }
      }
      > .mobile {
        display: none;
        @include media($mobile) {
          display: block;
          margin-top: -5px;
        }
      }
    }
    > .date,
    > .total,
    > .orderId {
      height: 100%;
      padding-top: 12px;
      > .title {
        font-size: 18px;
        font-weight: bold;
      }
      > .data {
        font-size: 16px;
      }
    }
  }
  > .product {
    @include flex();
    flex-wrap: wrap;
    > .productCard {
      width: 40%;
      @include media($mobile) {
        width: 100%;
      }
    }
    > .detail {
      width: 60%;
      background-color: $secondary;
      margin-top: 16px;
      padding-bottom: 10px;
      @include media($mobile) {
        width: 100%;
      }
      > div {
        margin-top: 10px;
        font-size: 18px;
        @include flex();
        @include media($mobile) {
          @include flex(column);
        }
        > .title {
          width: 170px;
          margin-left: 15px;
          font-weight: bold;
          @include media($mobile) {
            margin-left: 10px;
          }
        }
        > .value {
          width: calc(100% - 170px);
          padding-right: 10px;
          word-break: break-all;
          @include media($mobile) {
            width: 100%;
            padding-left: 10px;
          }
        }
      }
    }
  }
}
</style>

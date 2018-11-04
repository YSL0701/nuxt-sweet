<template>
  <div class="main">
    <div class="image"></div>
    <!-- 商品類別選單 -->
    <indexMmenu />
    <!-- 說明理由區域 -->
    <div class="why-make">
      <img src="~/static/image/sm-橫式-為什麼選擇了做甜點.svg" alt="為什麼選擇了做甜點" class="mobile-why-make">
      <div class="reason-img"></div>
      <div class="reason">
        <div class="title">
          <img src="~/static/image/lg-為什麼選擇了做甜點.svg" alt="為什麼選擇了做甜點" class="desktop-why-make">
        </div>
        <div class="article">
          <p class="p1">青山依舊在，幾度夕陽紅。慣看秋月春一壺濁酒喜相逢，浪花淘盡英雄。是非轉頭空，滾滾長江東逝水，白髮漁樵江古今多少事，都付笑談中。</p>
          <p class="p2">是非成敗轉頭空，滾滾長江東逝水，白樵江渚上，古今多少事，都付笑談中。</p>
        </div>
      </div>
    </div>
    <div class="why-eat">
      <img src="~/static/image/sm-橫式-為什麼一定要吃甜點.svg" alt="為什麼一定要吃甜點" class="mobile-why-eat">
      <div class="reason">
        <div class="title">
          <img src="~/static/image/lg-為什麼一定要吃甜點.svg" alt="為什麼一定要吃甜點" class="desktop-why-eat">
        </div>
        <div class="article">
          <p class="p1">青山依舊在，幾度夕陽紅。慣看秋月春一壺濁酒喜相逢，浪花淘盡英雄。是非轉頭空，滾滾長江東逝水，白髮漁樵江古今多少事，都付笑談中。</p>
          <p class="p2">是非成敗轉頭空，滾滾長江東逝水，白樵江渚上，古今多少事，都付笑談中。</p>
        </div>
      </div>
      <div class="reason-img"></div>
    </div>
    <div class="no-reason">
      <img src="~/static/image/lg-想吃甜點是不需要理由的.svg" alt="想吃甜點是不需要理由的" class="desktop-no-reason">
      <img src="~/static/image/sm-橫式-想吃甜點是不需要理由的.svg" alt="想吃甜點是不需要理由的" class="mobile-no-reason">
    </div>
    <!-- 選單類別商品預覽 -->
    <div class="product-preview">
      <productCard v-for="item in productUrl" :url="item.url" :key="item.id" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import indexMmenu from '~/components/indexMenu.vue'
import productCard from '~/components/productCard.vue'
export default {
  asyncData() {
    return axios.get(`${process.env.BASE_URL}/product.json`).then(res => {
      return { productUrl: res.data }
    })
  },
  components: {
    indexMmenu,
    productCard
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  max-width: 1024px;
  > .image {
    background-image: url(https://images.unsplash.com/photo-1473256599800-b48c7c88cd7e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ae0d68ab0db4ee79bdce92722b31112b&auto=format&fit=crop&w=1525&q=80);
    background-size: cover;
    background-position: center center;
    width: $content-width;
    height: $main-image-height;
    margin-left: auto;
    margin-right: auto;
    @include media($tablet) {
      width: 100%;
    }
    @include media($mobile) {
      height: 277px;
    }
  }
  > .why-make {
    height: 420px;
    margin-top: 80px;
    background-color: $secondary;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @include media($tablet) {
      justify-content: space-around;
    }
    @include media($mobile) {
      height: auto;
      margin-top: 30px;
      flex-direction: column;
      background-color: transparent;
    }
    .desktop-why-make {
      width: 89px;
      height: 308px;
      @include media($mobile) {
        display: none;
      }
    }
    .mobile-why-make {
      display: none;
      @include media($mobile) {
        display: block;
        align-self: center;
        width: 190px;
        height: 59px;
      }
    }
    .reason-img {
      width: $reason-img-wh;
      height: $reason-img-wh;
      background-image: url(https://images.unsplash.com/photo-1519730722595-a5ff788dea4d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2712a33fe9b13532f0682ac4e1e749b8&auto=format&fit=crop&w=1534&q=80);
      background-size: cover;
      background-position: center center;
      align-self: center;
      margin-left: $page-gap;
      @include media($tablet) {
        width: 40%;
        height: auto;
        padding-bottom: 40%;
      }
      @include media($mobile) {
        width: 100%;
        height: 250px;
        margin-left: 0;
        margin-top: 30px;
        padding-bottom: 0;
      }
    }
    .reason {
      writing-mode: vertical-rl;
      color: $primary;
      margin-right: $page-gap;
      @include media($mobile) {
        writing-mode: horizontal-tb;
        margin-right: 0;
      }
    }
    .title {
      margin-left: 80px;
      margin-top: -20px;
      @include media($tablet) {
        margin-left: 40px;
      }
      @include media($mobile) {
        display: none;
      }
    }
    .article {
      width: 256px;
      height: 280px;
      margin-top: 70px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      @include media($tablet) {
        width: 60%;
      }
      @include media($mobile) {
        width: 100%;
        height: auto;
        margin-top: 0;
        padding-top: 30px;
        padding-bottom: 30px;
        background-color: $secondary;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    p {
      font-size: 16px;
      color: $article-color;
      line-height: 40px;
      margin-right: $p-line-height-remove;
      margin-left: $p-line-height-remove;
      @include media($tablet) {
        line-height: 35px;
        margin-right: 0;
        margin-left: 0;
      }
      @include media($mobile) {
        line-height: 32px;
        margin-top: -8px;
        margin-bottom: -8px;
        margin-right: 30px;
        margin-left: 30px;
      }
    }
    .p2 {
      @include media($mobile) {
        margin-top: 28px;
      }
    }
  }
  > .why-eat {
    height: 420px;
    margin-top: 105px;
    background-color: $secondary;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @include media($tablet) {
      justify-content: space-around;
    }
    @include media($mobile) {
      height: auto;
      margin-top: 30px;
      flex-direction: column;
      background-color: transparent;
    }
    .desktop-why-eat {
      width: 89px;
      height: 304px;
      @include media($mobile) {
        display: none;
      }
    }
    .mobile-why-eat {
      display: none;
      @include media($mobile) {
        display: block;
        width: 190px;
        height: 59px;
        align-self: center;
        order: -2;
      }
    }
    .reason-img {
      width: $reason-img-wh;
      height: $reason-img-wh;
      background-image: url(https://images.unsplash.com/photo-1501432781167-c0ccfd492297?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=621c4e9986fba1c4514dfdc30e095bd2&auto=format&fit=crop&w=1539&q=80);
      background-size: cover;
      background-position: center center;
      align-self: center;
      margin-right: $page-gap;
      @include media($tablet) {
        width: 40%;
        height: auto;
        padding-bottom: 40%;
      }
      @include media($mobile) {
        width: 100%;
        height: 250px;
        margin-right: 0;
        margin-top: 30px;
        order: -1;
        padding-bottom: 0;
      }
    }
    .reason {
      writing-mode: vertical-rl;
      color: $primary;
      margin-left: 55.5px;
      @include media($tablet) {
        margin-right: 20px;
      }
      @include media($mobile) {
        writing-mode: horizontal-tb;
        margin-left: 0;
        margin-right: 0;
      }
    }
    .title {
      margin-left: 80px;
      margin-top: -20px;
      @include media($tablet) {
        margin-left: 40px;
      }
      @include media($mobile) {
        display: none;
      }
    }
    .article {
      width: 256px;
      height: 280px;
      margin-top: 70px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      @include media($tablet) {
        width: 60%;
      }
      @include media($mobile) {
        width: 100%;
        height: auto;
        margin-top: 0;
        padding-top: 30px;
        padding-bottom: 30px;
        background-color: $secondary;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    p {
      font-size: 16px;
      color: $article-color;
      line-height: 40px;
      margin-right: $p-line-height-remove;
      margin-left: $p-line-height-remove;
      @include media($tablet) {
        line-height: 35px;
        margin-right: 0;
        margin-left: 0;
      }
      @include media($mobile) {
        line-height: 32px;
        margin-top: -8px;
        margin-bottom: -8px;
        margin-right: 30px;
        margin-left: 30px;
      }
    }
    .p2 {
      @include media($mobile) {
        margin-top: 28px;
      }
    }
  }
  > .no-reason {
    margin-top: 95px;
    margin-left: 483px;
    height: 328px;
    @include media($tablet) {
      margin-left: 0;
      display: flex;
      justify-content: center;
    }
    @include media($mobile) {
      margin-top: 30px;
      height: auto;
    }
    .desktop-no-reason {
      width: 90px;
      height: 328px;
      @include media($mobile) {
        display: none;
      }
    }
    .mobile-no-reason {
      display: none;
      @include media($mobile) {
        display: block;
        width: 209px;
        height: 59px;
      }
    }
  }
  > .product-preview {
    @include flex(row, space-between);
    flex-wrap: wrap;
    padding-left: $page-gap;
    padding-right: $page-gap;
    margin-top: 80px;
    @include media($tablet) {
      margin-top: 60px;
      justify-content: center;
    }
    @include media($mobile) {
      margin-top: 10px;
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>


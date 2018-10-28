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
  }
  > .product-preview {
    height: 434px;
    @include flex(row, space-between);
    padding-left: $page-gap;
    padding-right: $page-gap;
    margin-top: 80px;
  }
  > .why-make {
    height: 420px;
    margin-top: 80px;
    background-color: $secondary;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .mobile-why-make {
      display: none;
    }
    .reason-img {
      width: $reason-img-wh;
      height: $reason-img-wh;
      background-image: url(https://images.unsplash.com/photo-1519730722595-a5ff788dea4d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2712a33fe9b13532f0682ac4e1e749b8&auto=format&fit=crop&w=1534&q=80);
      background-size: cover;
      background-position: center center;
      align-self: center;
      margin-left: $page-gap;
    }
    .reason {
      writing-mode: vertical-rl;
      color: $primary;
      margin-right: $page-gap;
    }
    .title {
      margin-left: 80px;
      margin-top: -20px;
    }
    .desktop-why-make {
      width: 89px;
      height: 308px;
    }
    .article {
      width: 256px;
      height: 280px;
      margin-top: 70px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    p {
      font-size: 16px;
      color: $article-color;
      line-height: 40px;
      margin-right: $p-line-height-remove;
      margin-left: $p-line-height-remove;
    }
  }
  > .why-eat {
    height: 420px;
    margin-top: 105px;
    background-color: $secondary;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .mobile-why-eat {
      display: none;
    }
    .reason-img {
      width: $reason-img-wh;
      height: $reason-img-wh;
      background-image: url(https://images.unsplash.com/photo-1501432781167-c0ccfd492297?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=621c4e9986fba1c4514dfdc30e095bd2&auto=format&fit=crop&w=1539&q=80);
      background-size: cover;
      background-position: center center;
      align-self: center;
      margin-right: $page-gap;
    }
    .reason {
      writing-mode: vertical-rl;
      color: $primary;
      margin-left: 55.5px;
    }
    .title {
      margin-left: 80px;
      margin-top: -20px;
    }
    .desktop-why-eat {
      width: 89px;
      height: 304px;
    }
    .article {
      width: 256px;
      height: 280px;
      margin-top: 70px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    p {
      font-size: 16px;
      color: $article-color;
      line-height: 40px;
      margin-right: $p-line-height-remove;
      margin-left: $p-line-height-remove;
    }
  }
  > .no-reason {
    margin-top: 95px;
    margin-left: 483px;
    height: 328px;
    .desktop-no-reason {
      width: 90px;
      height: 328px;
    }
    .mobile-no-reason {
      display: none;
    }
  }
}
</style>


<template>
  <div class="main">
    <div class="main-image-area">
      <div>
        <img src="~/static/image/lg-想吃甜點是不需要理由的.svg" alt="">
      </div>
    </div>
    <div class="product-list">
      <categoryList />
      <nuxt-child />
    </div>
    <pagination />
  </div>
</template>

<script>
import categoryList from '~/components/categoryList.vue'
import pagination from '~/components/pagination.vue'
export default {
  watch: {
    $route() {
      var width = window.innerWidth
      if (width < 768) {
        window.scrollTo({
          top: 600,
          behavior: 'smooth'
        })
      } else if (width > 991) {
        window.scrollTo({
          top: 500,
          behavior: 'smooth'
        })
      } else {
        window.scrollTo({
          top: 800,
          behavior: 'smooth'
        })
      }
    }
  },
  components: {
    categoryList,
    pagination
  }
}
</script>
</script>

<style lang="scss" scoped>
.main {
  @include media($tablet) {
    width: 100%;
  }
  .main-image-area {
    background-image: url(https://images.unsplash.com/photo-1512484457149-266d165a4eca?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=786581a33fd6c9343735655439ce2e5a&auto=format&fit=crop&w=800&q=60);
    background-size: cover;
    background-position: center center;
    width: $content-width;
    height: $main-image-height;
    @include media($tablet) {
      width: 100%;
    }
    @include media($mobile) {
      height: 277px;
      background-position: -58px center;
    }
    > div {
      margin-left: auto;
      margin-right: 40px;
      width: 90px;
      @include media($mobile) {
        width: 60px;
        margin-right: 30px;
      }
      > img {
        vertical-align: bottom;
        width: 90px;
        height: 328px;
        margin-top: 40px;
        @include media($mobile) {
          width: 60px;
          height: auto;
          margin-top: 30px;
        }
      }
    }
  }
  .product-list {
    margin-top: 60px;
    @include flex(row, space-between);
    @include media($tablet) {
      @include flex(row, center);
      flex-flow: wrap;
    }
    @include media($mobile) {
      margin-top: 0;
    }
  }
}
</style>

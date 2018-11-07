<template>
  <div class="category">
    <ul>
      <li>
        <div class="title">甜點類別</div>
      </li>
      <li>
        <nuxt-link to="/product" class="all nuxtlink" :class="{active:!params}">所有甜點（48）</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/product/today" class="today-selection nuxtlink" :class="{active:params === 'today'}">本日精選（10）</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/product/popular" class="popular nuxtlink" :class="{active:params === 'popular'}">人氣推薦（26）</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/product/new" class="new nuxtlink" :class="{active:params === 'new'}">新品上市（12）</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    params() {
      return this.$route.params.category
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  position: sticky;
  top: 100px;
  @include media($tablet) {
    position: static;
    width: 100%;
    margin-bottom: 20px;
  }
  @include media($mobile) {
    margin-bottom: 30px;
  }
  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    > li {
      display: block;
      > div,
      > .nuxtlink {
        width: $category-width;
        height: $category-height;
        font-size: 24px;
        font-weight: bold;
        @include flex(row, center, center);
        @include media($tablet) {
          width: 100%;
        }
      }
      > .title {
        background-color: $primary;
        color: $secondary;
      }
      .nuxtlink {
        text-decoration: none;
        color: $primary;
        border-left: 1px solid $secondary;
        border-right: 1px solid $secondary;
        border-bottom: 1px solid $secondary;
      }
      .active {
        background-color: $secondary;
      }
    }
  }
}
</style>

<template>
  <div class="category">
    <ul>
      <li>
        <div class="cat-title">甜點類別</div>
      </li>
      <li>
        <a href="javascript:">
          <div class="all active">所有甜點（48）</div>
        </a>
      </li>
      <li>
        <a href="javascript:">
          <div class="today-selection">本日精選（10）</div>
        </a>
      </li>
      <li>
        <a href="javascript:">
          <div class="popular">人氣推薦（26）</div>
        </a>
      </li>
      <li>
        <a href="javascript:">
          <div class="new">新品上市（12）</div>
        </a>
      </li>
    </ul>
  </div>
</template>

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
    > li:first-child {
      div {
        background-color: $primary;
        color: $secondary;
      }
    }
    > li {
      a {
        text-decoration: none;
        display: inline-block;
        @include media($tablet) {
          width: 100%;
        }
      }
      div {
        width: $category-width;
        height: $category-height;
        font-size: 24px;
        font-weight: bold;
        @include flex(row, center, center);
        @include media($tablet) {
          width: 100%;
        }
      }
      div:not(.cat-title) {
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

<template>
  <div class="pagination">
    <ul>
      <li>
        <a href="javascript:">
          <div class="prev"><i class="material-icons">arrow_left</i></div>
        </a>
      </li>
      <li>
        <a href="javascript:">
          <div class="page active">1</div>
        </a>
      </li>
      <li>
        <a href="javascript:">
          <div class="page">2</div>
        </a>
      </li>
      <li>
        <a href="javascript:">
          <div class="page">3</div>
        </a>
      </li>
      <li>
        <a href="javascript:">
          <div class="next"><i class="material-icons">arrow_right</i></div>
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  margin-top: 10px;
  @include flex(row, flex-end);
  @include media($tablet) {
    @include flex(row, center);
  }
  @include media($mobile) {
    margin-top: 0;
  }
  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 0;
    @include flex();
    > li {
      display: inline-block;
      > a {
        text-decoration: none;
        display: inline-block;
        > div {
          width: 60px;
          height: 60px;
          font-size: 20px;
          color: $primary;
          @include flex(row, center, center);
        }
        .prev {
          border: 1px solid $secondary;
        }
        .page,
        .next {
          border-top: 1px solid $secondary;
          border-right: 1px solid $secondary;
          border-bottom: 1px solid $secondary;
        }
        .active {
          background-color: $primary;
          color: $secondary;
        }
        .disabled {
          pointer-events: none;
        }
      }
    }
  }
}
</style>

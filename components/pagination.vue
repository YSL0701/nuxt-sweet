<template>
  <div class="pagination">
    <ul>
      <li>
        <div
          class="link"
          :class="{disabled:!pagination.has_pre}"
          @click.prevent="pageChange(pagination.current_page-1,pagination.has_pre)"
        >
          <div class="prev"><i class="material-icons">arrow_left</i></div>
        </div>
      </li>
      <li
        v-for="pageNum in pagination.total_pages"
        :key="pageNum"
      >
        <nuxt-link
          class="link"
          :to="{path:'/product',query:{page:pageNum}}"
        >
          <div
            class="page"
            :class="{active:pagination.current_page===pageNum}"
          >{{ pageNum }}</div>
        </nuxt-link>
      </li>
      <li>
        <div
          class="link"
          :class="{disabled:!pagination.has_next}"
          @click.prevent="pageChange(pagination.current_page+1,pagination.has_next)"
        >
          <div class="next"><i class="material-icons">arrow_right</i></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    pageChange(page, has) {
      if (has) {
        this.$router.push({ path: '/product', query: { page } })
      }
    }
  },
  computed: {
    pagination() {
      return this.$store.state.product.pagination
    }
  }
}
</script>


<style lang="scss" scoped>
.pagination {
  margin-top: 10px;
  @include flex(row, flex-end);
  @include media($tablet) {
    @include flex(row, center);
  }
  // @include media($mobile) {
  //   margin-top: 0;
  // }
  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 0;
    @include flex();
    > li {
      display: inline-block;
      > .link {
        text-decoration: none;
        display: inline-block;
        cursor: pointer;
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
      }
      > .disabled {
        cursor: default;
      }
    }
  }
}
</style>

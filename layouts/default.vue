<template>
  <div class="container">
    <myHeader></myHeader>
    <nuxt />
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from '~/components/header.vue'
import myFooter from '~/components/footer.vue'
export default {
  components: {
    myHeader,
    myFooter
  }
}
</script>

<style lang="scss">
.container {
  width: 100%;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include media($mobile) {
    padding-top: 84px;
  }
}
</style>

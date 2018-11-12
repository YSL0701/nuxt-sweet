<template>
  <div class="container">
    <myHeader></myHeader>
    <nuxt />
    <message />
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from '~/components/header.vue'
import myFooter from '~/components/footer.vue'
import message from '~/components/message.vue'
export default {
  components: {
    myHeader,
    myFooter,
    message
  }
}
</script>

<style lang="scss" scoped>
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

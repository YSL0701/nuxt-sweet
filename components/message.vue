<template>
  <div class="msg-container">
    <messageCard
      class="message"
      v-for="(item,index) in messages"
      :message="item.content"
      :index="index"
      :key="item.id"
    />
  </div>
</template>

<script>
import messageCard from './messageCard.vue'
export default {
  computed: {
    messages() {
      return this.$store.state.message.messages
    }
  },
  components: {
    messageCard
  }
}
</script>

<style lang="scss" scoped>
.msg-container {
  position: fixed;
  top: 100px;
  right: 30px;
  z-index: 5;
  @include flex(column, flex-start, flex-end);
  @include media($mobile) {
    top: 84px;
    right: 10px;
  }
}
</style>

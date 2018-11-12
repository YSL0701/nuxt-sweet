<template>
  <div class="msgCard" :class="{enter:isEnter}">{{ message }}<i class="fas fa-times" @click="userRemoveMessage"></i></div>
</template>

<script>
export default {
  props: ['message', 'index'],
  data() {
    return {
      intervalId: '',
      isEnter: false
    }
  },
  methods: {
    clearMessage() {
      if (this.message) {
        this.$store.commit('removeMessage')
      }
    },
    userRemoveMessage() {
      this.$store.commit('userRemoveMessage', this.index)
    }
  },
  mounted() {
    setTimeout(() => {
      this.isEnter = true
    }, 0.5)
    this.intervalId = setInterval(this.clearMessage, 5000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  }
}
</script>

<style lang="scss" scoped>
.msgCard {
  height: 40px;
  background-color: darken($secondary, 5%);
  font-size: 16px;
  color: $primary;
  margin-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.5s;
  @include flex(row, center, center);
  > i {
    cursor: pointer;
    margin-left: 5px;
  }
}
.enter {
  opacity: 0.9;
}
</style>

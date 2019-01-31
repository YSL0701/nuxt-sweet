<template>
  <transition name="card">
    <div
      class="msgCard"
      :class="{enter:isEnter,error:type==='error',warn:type==='warn'}"
    >{{ message }}<i
        class="fas fa-times"
        @click="userRemoveMessage"
      ></i>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['message', 'index', 'type'],
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
.error {
  background-color: rgb(253, 86, 86);
  color: rgb(255, 255, 255);
}
.warn {
  background-color: rgb(255, 197, 72);
  color: rgb(0, 0, 0);
}
.enter {
  opacity: 0.9;
}
.card-enter,
.card-leave-to {
  opacity: 0;
}
</style>

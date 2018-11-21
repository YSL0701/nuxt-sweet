export default {
  state: {
    messages: []
  },
  mutations: {
    addMessage(state, payload) {
      if (state.messages.every(msg => msg.id !== payload.id)) {
        state.messages.unshift(payload)
      }
    },
    removeMessage(state) {
      state.messages.pop()
    },
    userRemoveMessage(state, payload) {
      state.messages.splice(payload, 1)
    }
  }
}

export default {
  state: {
    messages: []
  },
  mutations: {
    addMessage(state, payload) {
      state.messages.unshift(payload)
    },
    removeMessage(state) {
      state.messages.pop()
    },
    userRemoveMessage(state, payload) {
      state.messages.splice(payload, 1)
    }
  }
}

export default {
  state: {
    isLoading: false
  },
  mutations: {
    loadingStatus(state, payload) {
      state.isLoading = payload
    }
  }
}

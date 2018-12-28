export default function({ store, redirect }) {
  if (store.state.cart.cart.length < 1) {
    redirect('/')
  }
}

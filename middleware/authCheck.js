export default function({ app, redirect }) {
  if (app.$cookies.get('uid')) {
    return redirect('/')
  }
}

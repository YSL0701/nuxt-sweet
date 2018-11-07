var categoryList = ['today', 'popular', 'new']

export default function({ params, redirect }) {
  var category = params.category
  if (!categoryList.some(param => param === category)) {
    return redirect('/product')
  }
}

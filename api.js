export async function allCategories () {
  const allcategories = 'https://dummyjson.com/products/categories'
  const fetchdata = await fetch(allcategories)
  const jasondata = await fetchdata.json()
  console.log(jasondata)

  return jasondata
}
// add functionality to category to display images on the landing page

export async function categorydisplay (category) {
  const eachcategory = `https://dummyjson.com/products/category/${category}`
  const fetchdata = await fetch(eachcategory)
  const jasondata = await fetchdata.json()
  console.log(jasondata)
  return jasondata
}

export async function displayallproducts () {
  const products = 'https://dummyjson.com/products?limit=0&skip=0'
  const productdata = await fetch(products)
  const data = await productdata.json()
  console.log(data)
  const targetdata = data.products
  console.log(targetdata)
  return targetdata
}

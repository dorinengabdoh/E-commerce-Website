export async function allCategories() {
  const allcategories = "http://localhost:3002/product/categorie";
  const fetchdata = await fetch(allcategories);
  const jasondata = await fetchdata.json();
  const simpleArray = jasondata.map(category => category.nameCat);
  console.log(simpleArray);
  return simpleArray;
}
// add functionality to category to display images on the landing page
export async function categorydisplay(nameCat) {
  const eachcategory = `http://localhost:3002/product/${nameCat}`;
  const fetchdata = await fetch(eachcategory);
  const jasondata = await fetchdata.json();
  console.log(jasondata);
  return jasondata;
}

export async function displayallproducts() {
  const products = "http://localhost:3002/product";
  const productdata = await fetch(products);
  const data = await productdata.json();
  console.log(data);
  return data;
}

// export async function removeProduct (){
//   const remove = `http://localhost:3002/product/${idPro}`
//   const rPorduct = await fetch(remove)
//   const removeData = await rPorduct.json()
//   console.log(removeData);
//   return removeData
// }

// export async function displayPageData(page = 0) {
//   const products = `https://dummyjson.com/products?limit=${MAX_ITEMS_PER_PAGE}&skip=${
//     page * MAX_ITEMS_PER_PAGE
//   }`;
//   const productdata = await fetch(products);
//   const data = await productdata.json();
//   console.log(data);
//   return data;
// }

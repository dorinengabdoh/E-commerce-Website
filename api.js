export async function allCategories() {
  const allcategories = "http://localhost:3000/product/categorie";
  const fetchdata = await fetch(allcategories);
  const jasondata = await fetchdata.json();
  const simpleArray = jasondata.map(category => category.nameCat);
  console.log(simpleArray);
  return simpleArray;
}
// add functionality to category to display images on the landing page
export async function categorydisplay(category) {
  const eachcategory = `http://localhost:3000/product/categorie/${category}`;
  const fetchdata = await fetch(eachcategory);
  const jasondata = await fetchdata.json();
  console.log(jasondata);
  return jasondata;
}

export async function displayallproducts() {
  const products = "http://localhost:3000/product";
  const productdata = await fetch(products);
  const data = await productdata.json();
  console.log(data);
  return data;
}

export async function displayPageData(page = 0) {
  const products = `https://dummyjson.com/products?limit=${MAX_ITEMS_PER_PAGE}&skip=${
    page * MAX_ITEMS_PER_PAGE
  }`;
  const productdata = await fetch(products);
  const data = await productdata.json();
  console.log(data);
  return data;
}

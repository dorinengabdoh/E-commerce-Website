import { navbar } from './main.js'
import { displayallproducts } from './api.js'
const data = window.location.search
const urlParam = new URLSearchParams(data)
const productId = urlParam.get('id')
const allAdToCArdBtns = document.querySelector('.addd')
let currentProduct = {}

const dataCategory = window.location.search
const category = new URLSearchParams(dataCategory)
const categoryId = category.get('category')

const container1 = document.querySelector('.all')

if (container1) container1.innerHTML = navbar()

const picture = await displayallproducts().then((Response) => {
  console.log({Response});
  displaydetailsPicture(Response)
  DisplaySimilarProduct(Response)
})

function displaydetailsPicture(pict) {
  const mealContainer = document.querySelector('.details-picture')
  pict?.forEach((product) => {
    if (productId == product.id) {
      currentProduct = product;
      const mealCard = document.createElement('div')
      mealCard.classList.add('.pict')
      mealCard.innerHTML = `
    <img id="pict_detail" src="${product.thumbnail}" />
    <div class="image">
    <i class="fa-solid fa-chevron-left" id="prev"></i>
    <img id="single_product" src="${product.images[0]}" />
    <img id="single_product" src="${product.images[1]}" />
    <img id="single_product" src="${product.images[2]}" />
    <img id="single_product" src="${product.images[3]}" />
    <i class="fa-solid fa-chevron-right" id="next"></i>   
     </div>
    <div class="item-price">
    <p class="prices"> Product Price: $${product.price}</p>
    <p class="price"> Product Price: $${product.price}</p>
    </div>
    <div class="description">
    <p id="desc">Product Description</p>
    <p class="deux">${product.description}</p>
    </div>
    `
      mealContainer.appendChild(mealCard)
    }
  })
}
// categoty
function DisplaySimilarProduct(prod) {
  const mealContaine = document.querySelector('.similar')
  prod?.forEach((produ) => {
    if (categoryId == produ.category) {
      const mealCar = document.createElement('div')
      mealCar.classList.add('.sim')
      console.log(produ.id)
      mealCar.innerHTML = `
      <div class="flex">
      <img class="single" id="single_product" src="${produ.thumbnail}" alt="">
      </div>
      `
      mealContaine.appendChild(mealCar)
    }
  })
}

// ToAdd Function
const getCurrentItems = () => {
  const prevItems = JSON.parse(localStorage.getItem('cardItems')) || [];
  console.log({prevItems, productId});
  return prevItems.find(prod => +prod?.item.id === +productId);
}


const updateCounter = () => {
  const counter = document.querySelector(".a5");

  const currentItem = getCurrentItems();

  if (!currentItem) return;
  counter.value = currentItem.total;
}

updateCounter();
console.log();


function incrementerNombre() {
  const prevItems = JSON.parse(localStorage.getItem('cardItems')) || [];
  const currentItem = getCurrentItems();

  console.log({currentItem})

  console.log('prevItems', prevItems, currentItem)

  const local_update = prevItems?.map((prod) => {
    if (+prod.item.id === +currentItem.item.id) {
      const updateProd = {
        ...prod,
        total: prod.total + 1,
      }
      return updateProd;
    }

    return prod;
  });



  localStorage.setItem('cardItems', JSON.stringify(local_update));

  updateCounter();
}

allAdToCArdBtns.addEventListener('click', incrementerNombre);

import { displayallproducts, allCategories, categorydisplay } from './api.js'

const getJson = await allCategories()
let productrender = []
const ITEMS_PER_PAGE = 12;

let current_page = 0;


const getPaginationCount = () => Math.ceil(productrender.length / ITEMS_PER_PAGE)

export function displayCards(fetchData) {
  const top = document.querySelector('.container4')
  top.innerHTML = ''

  // fucntion Addtocard

  const addListenersToAddToCardButton = () => {
    const allAdToCArdBtns = document.querySelectorAll('.addtocard')
    const selectItem = document.getElementById('items-selected')

    allAdToCArdBtns.forEach((card) => {
      card.addEventListener('click', (e) => {
        const imageId = e.target.dataset.imageid // destructuring e.target.dataset. equivalent to const imageId = e.target.dataset.imageId;
        const prevItems = JSON.parse(localStorage.getItem('cardItems')) || [];

        if (prevItems.find(prod => +prod?.item.id === +imageId)) return;

        const item = fetchData.find((gad) => +gad.id === +imageId);
        const newProd = {
          total: 1,
          item,
        }

        const update = [
          ...prevItems,
          newProd
        ]
        localStorage.setItem('cardItems', JSON.stringify(update));
        selectItem.innerHTML = update.length;
      })
    })
  }

  fetchData?.forEach((item) => {
    if (top) {
      top.innerHTML += `
    <div class="top">
      <div class="subcard" id="subcards">
        <a href="/details.html?id=${item.id}&category=${item.category}"><img src=${item.thumbnail} id="details-page"/></a>
        <i class="fa-regular fa-heart"></i>
      </div>

      <div class="snikersprice">
        <span id="snykers">${item.title}</span>
        <span id="snykers-price">$${item.price}</span>
      </div>

      <div class="shoes-available" data-name>
        <p id="shoes"> 5 types of shoes available</p>
      </div>
      <div class="stars">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <p id="number">(121)</p>
      </div>
      <div class="date">
        <button id="addtocard" class="addtocard" data-imageid="${item.id}">Add to Card</button>
        <button id="shortlist">Short List</button>
      </div>
    </div>
  `
    }
  })

  addListenersToAddToCardButton();
}

// LOADING PAGINATION DATA
const loadPageData = (index) => {
  current_page = index;

  console.log({ current_page })

  const start_pos = index * ITEMS_PER_PAGE;
  const end_pos = ITEMS_PER_PAGE;

  const items_to_display = [...productrender].splice(start_pos, end_pos);

  displayCards(items_to_display);
}

const handlePrev = () => {
  if (current_page == 0) return;

  loadPageData(current_page - 1);
}

const handleNext = () => {
  const lastpage = getPaginationCount() - 1;

  if (current_page == lastpage) return;

  loadPageData(current_page + 1);
}

function displayPaginationBtns() {

  const addEventListenersToAllPaginationBtns = () => {
    const allPageBtn = document.querySelectorAll(".pageBtn");
    allPageBtn.forEach((btn, i, arr_btns) => btn.onclick = () => {
      console.log("i got clicked");
      loadPageData(i);

      arr_btns.forEach(btn => {
        btn.classList.remove('current_page');
      });

      btn.classList.add('current_page')
    });
  }

  const paginationCount = getPaginationCount();


  const container5 = document.querySelector(".container5");
  container5.innerHTML = "";

  const previews = document.createElement("div");
  previews.className = "previews";

  const prevBtn = document.createElement('button');
  prevBtn.id = "previews";
  prevBtn.innerHTML = "Previous";

  previews.appendChild(prevBtn);

  prevBtn.addEventListener('click', handlePrev); // to go back to prev page

  for (let i = 0; i < paginationCount; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.id = "previews";
    pageBtn.className = "pageBtn";
    pageBtn.innerHTML = i + 1;
    console.log({ pageBtn });
    previews.appendChild(pageBtn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.id = "previews";
  nextBtn.innerHTML = "Next";
  nextBtn.addEventListener('click', handleNext); // to go to next page

  previews.appendChild(nextBtn);

  container5.appendChild(previews);

  addEventListenersToAllPaginationBtns();
}

// FETCHING DATA!

if (displayallproducts) {
  displayallproducts().then((res) => {
    productrender = res
    loadPageData(0); // to display first pagination data
    displayPaginationBtns();
  });

  console.log({ productrender })
}

export function navbar() {
  const container1 = document.querySelector(".container1");
  const cardItems = JSON.parse(localStorage.getItem("cardItems")) || [];
  if (container1) {
    container1.innerHTML = ` <div class="title">
  <a href="http://localhost:5173/"> <h1 id="fashionhub"><iif(container1)>FashionHub</iif></h1>  </a>
  <div class="navlinks">
    <span><select id="category">
    <option>shoes</option>
    <option>bags</option>
    <option>hats</option>
    </select></span>
    <span id="brand">Brand</span>
    <a href="./contact.html" id="contactdisplay"><span id="contact">Contact</span><a/>
    <span id="faq">FAQ's</span>
  </div>
</div>
<div class="basket">
  <button id="basketimg">
    <a href="./card.html" id="hover" class="hover"><span id="items-selected"></span></a>
    <i id="icon1" class="fa-solid fa-bag-shopping"></i>
  </button>
  <button id="bell">
    <span id="bells"></span>
    <i id="icon2" class="fa-regular fa-bell"></i>
  </button>
  <div class="title-image">
    <img src="./image/IMG-20220225-WA0033.jpg">
    <div class="name">
      <span id="gmorning">Good morning</span>
      <span id="johnson">Scarlet Johnson</span>
    </div>
  </div>
</div>
`;
  }
  var cardItemsLength = cardItems.length;
  // Update the content of the anchor tag
  var spanElement = document.getElementById("items-selected");
  if (cardItemsLength > 0) {
    spanElement.textContent = cardItemsLength;
  } else {
    spanElement.textContent = "0"; // or any other default value if desired
  }
}

navbar()

// counter selection

export function setupCounter(card) {
  const addtocard = document.querySelectorAll('.addtocard')
  let counter = document.getElementById('items-selected')
  counter = 0
  const setCounter = (count) => {
    counter = count
    console.log(counter)
  }
  addtocard.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
  console.log(counter)
}

// map and display cat
let category = document.getElementById('category')
category.innerHTML = getJson.map(
  (item) => `
 <option id="category">${item}</option>`
)

let selectedCategory = ''

category.addEventListener('input', async (e) => {
  category = e.target.value
  selectedCategory = category

  const res = await categorydisplay(category)
  productrender = res?.products

  console.log({ category, productrender, res })

  displayCards(productrender)
  // top.style.display = "none"
  console.log(selectedCategory)

  return selectedCategory
})

if (selectedCategory !== '') {
  productrender = productrender.filter(
    (item) => item.category === selectedCategory
  )
}

// display avatar section

export function avatarSection() {
  const container2 = document.querySelector('.container2')
  if (container2) {
    container2.innerHTML = `<div class="buy-now-section">
  <div class="grap-50">
    <h1 id="headphone">Grap up to 50% off 
    <br />on Selected Headphone</h1>
    <button id="buynow">Buy Now</button>
  </div>
  <div class="avatar">
  <img src="./image/Slider 1.png" alt="" id="img">
  </div>
</div>`
  }
}
avatarSection()

// display buttons section

export function buttons() {
  const container3 = document.querySelector('.container3')
  if (container3) {
    container3.innerHTML = ` <div class="dropdown-buttons">
  <div class="price">
 <select id="headers"><option id="headers"> HeadePhone-type</option></select>
  <select id="headers"><option id="headers">Price</option></select>
  <select id="headers"><option id="headers">Review</option></select>
  <select id="headers"><option id="headers">Color</option></select>
  <select id="headers"><option id="headers">Material</option></select>
  <select id="headers"><option id="headers">Offer</option></select>
</div>
<div class="headphone-type">
<select id="headerss"><option id="headers"> HeadePhone-type</option></select>
</div>
</div>`
  }
}

buttons()

export function footer() {
  const container6 = document.querySelector('.container6')
  if (container6) {
    container6.innerHTML = `<div class="footer">
  <h2 id="footer">Footer</h2>
</div>`
  }
}

footer()

document.querySelector('#app').innerHTML

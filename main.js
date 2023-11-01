import { displayallproducts, allCategories, categorydisplay } from "./api.js";

const getJson = await allCategories();
let productrender = [];

if(displayallproducts)displayallproducts()
  .then((res) => {
    productrender = res;
    displayCards(productrender);
  })

console.log({ productrender });

// const category = document.getElementById('category')

export function navbar() {
  const container1 = document.querySelector(".container1");
  if(container1)container1.innerHTML = ` <div class="title">
  <h1 id="fashionhub"><iif(container1)>FashionHub</iif></h1>
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
    <span id="items-selected">0</span>
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
  // allCategories (category)
}

navbar();

// map and display cat
let category = document.getElementById("category");
category.innerHTML = getJson.map(
  (item) => `
 <option id="category">${item}</option>`
);

let selectedCategory = "";

category.addEventListener("input", async (e) => {
  category = e.target.value;
  selectedCategory = category;
  const res = await categorydisplay(category);

  productrender = res?.products;

  console.log({ category, productrender, res });

  displayCards(productrender);
  // top.style.display = "none"
  console.log(selectedCategory);

  return selectedCategory;
});

if (selectedCategory !== "") {
  productrender = productrender.filter(
    (item) => item.category === selectedCategory
  );
}

//display avatar section

export function avatarSection() {
  const container2 = document.querySelector(".container2");
  if(container2)container2.innerHTML = `<div class="buy-now-section">
  <div class="grap-50">
    <h1 id="headphone">Grap up to 50% off 
    <br />on Selected Headphone</h1>
    <button id="buynow">Buy Now</button>
  </div>
  <div class="avatar">
  <img src="./image/Slider 1.png" alt="" id="img">
  </div>
</div>`;
}
avatarSection();

//display buttons section

export function buttons() {
  const container3 = document.querySelector(".container3");
  if(container3)container3.innerHTML = ` <div class="dropdown-buttons">
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
</div>`;
}

buttons();

// const container4 = document.querySelector('.container4')

export function displayCards(fetchData) {
  const top = document.querySelector(".container4");
  fetchData?.forEach((item) => {
    const arrImages = item.images;
    if (top)top.innerHTML += `<div class="top">
      <div class="subcard" id="subcards">
        <a href="/details.html?id=${item.id}"><img src=${item.thumbnail} id="details-page"/></a>
      <i class="fa-regular fa-heart"></i>
      </div>

      <div class="snikersprice">
        <span id="snykers">${item.title}</span>
        <span id="snykers-price">$${item.price}</span>
      </div>

      <div class="shoes-available">
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
        <button id="addtocard">Add to Card</button>
        <button id="shortlist">Short List</button>
      </div>


    </div>
 
  `;
  });
}

export function previews() {
  const container5 = document.querySelector(".container5");
  if(container5)container5.innerHTML = `<div class="previews">
  <button id="previews">Preview</button>
  <button id="previews">1</button>
  <button id="previews">2</button>
  <button id="previews">3</button>
  <button id="previews">4</button>
  <button id="previews">5</button>
  <button id="previews">6</button>
  <button id="previews">7</button>
  <button id="previews">Next</button>
</div>`;
}

previews();


export function footer() {
  const container6 = document.querySelector(".container6");
 if(container6) container6.innerHTML = `<div class="footer">
  <h2 id="footer">Footer</h2>
</div>`;
}

footer();

// const subcard =document.querySelector('.subcard')
document.querySelector("#app").innerHTML;

// setupCounter(document.querySelector('#counter'))

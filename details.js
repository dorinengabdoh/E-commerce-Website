const data = window.location.search;
const urlParam = new URLSearchParams(data);
const productId = urlParam.get("id");
import { navbar } from "./main.js";
import { displayallproducts } from "./api.js";

const container1 = document.querySelector(".all");

if (container1)container1.innerHTML = navbar();



const picture = await displayallproducts()
.then((Response) => {
  console.log(Response);
  displaydetailsPicture(Response)
})


function displaydetailsPicture(pict){
  const mealContainer = document.querySelector(".details-picture");
  pict?.forEach((product) => {
    if (productId == product.id) {
    const mealCard = document.createElement("div")
    mealCard.classList.add(".pict")
    mealCard.innerHTML = `
    <img id="pict_detail" src="${product.thumbnail}" />
    <div class="image">
    <i class="fa-solid fa-chevron-left" id="prev"></i>
    <img id="single_product" src="${product.images[0]}" />
    <img id="single_product" src="${product.images[1]}" />
    <img id="single_product" src="${product.images[2]}" />
    <img id="single_product" src="${product.images[3]}" />
    <i class="fa-solid fa-chevron-right" id="next"></i>    </div>
    `

   mealContainer.appendChild(mealCard);
    }
  });
}

// display the picture





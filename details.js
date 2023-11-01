import { navbar } from "./main.js";
import { displayallproducts } from "./api.js";

const container1 = document.querySelector(".all");

container1.innerHTML = navbar();

const getJson = await allCategories();
let productrender = [];

displayallproducts()
.then((response) => {
  return response.json();
})
.then((data) => {
  console.log(data);
  displayallproducts(data.meals);
});



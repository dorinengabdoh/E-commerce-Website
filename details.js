import { navbar } from "./main.js";
import { displayallproducts } from "./api.js";

const container1 = document.querySelector(".all");

container1.innerHTML = navbar();

let i =10;
console.log(i);

displayallproducts()
.then((response) => {
  return response.json();
})

.then((data) => {
  console.log(data);
});




// display the picture





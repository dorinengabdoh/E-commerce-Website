const getCurrentItems = JSON.parse(localStorage.getItem("cardItems"));
const data = window.location.search;
const urlParam = new URLSearchParams(data);
const productId = urlParam.get("id");
console.log(productId);

console.log(getCurrentItems);



const top = document.querySelector(".container4");
top.innerHTML = "";

function relodValue() {


}
getCurrentItems.map(function call(element) {
  if (top) {
    top.innerHTML += `
  <div class="top">
    <div class="subcard" id="subcards">
      <a href="/details.html?id=${element.item.id}&category=${element.item.category}"><img src=${element.item.thumbnail} id="details-page"/></a>
      <i class="fa-regular fa-heart"></i>
    </div>

    <div class="snikersprice">
      <span id="snykers">${element.item.title}</span>
      <span id="snykers-price">$${element.item.price}</span>
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
      <input class="he" type="text" value="${element.total}"  >
    <button id="shortlist" data-id ="${element.item.id}" class="remove">Remove</button>
    </div>
  </div>
`;
    // console.log(data-id);
    const removes = document.querySelectorAll(".remove");
    removes.forEach((remove) => {
      remove.addEventListener("click", (e) => {
        const getCardItem = JSON.parse(localStorage.getItem("cardItems"));
        const id = +e.target.dataset.id;
        console.log(id);
        const removeValue = getCardItem.filter((item) => item.id !== id);
        localStorage.setItem("cardItems", JSON.stringify(removeValue));
        console.log(removeValue);
      });
    });
  }
});

const objetRecupere = JSON.parse(localStorage.getItem('countValue'));
console.log(objetRecupere);





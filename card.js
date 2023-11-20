const getCardItem = JSON.parse(localStorage.getItem('cardItems'))

console.log(getCardItem)
const top = document.querySelector('.container4')
top.innerHTML = ''

getCardItem.map(element => {
  if (top) {
    top.innerHTML += `
  <div class="top">
    <div class="subcard" id="subcards">
      <a href="/details.html?id=${element.id}&category=${element.category}"><img src=${element.thumbnail} id="details-page"/></a>
      <i class="fa-regular fa-heart"></i>
    </div>

    <div class="snikersprice">
      <span id="snykers">${element.title}</span>
      <span id="snykers-price">$${element.price}</span>
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
      <button id="shortlist" data-id ="${element.id}" class="remove">Remove</button>
    </div>
  </div>
`;
// console.log(data-id);
const itemsInLocalStorage = JSON.parse(localStorage.getItem("cardItems")) || [];
const removes = document.querySelectorAll(".remove");
removes.forEach((remove)=> {
  remove.addEventListener('click', () => {
    console.log("click reussi");
    
  });
})
}

})



import { navbar } from "./main.js";
import { displayallproducts } from "./api.js";
const data = window.location.search;
const urlParam = new URLSearchParams(data);
const productId = urlParam.get("id");
console.log(productId);
const allAdToCArdBtns = document.querySelector(".addd");
let currentProduct = {};

const dataCategory = window.location.search;
const category = new URLSearchParams(dataCategory);
// const categoryId = category.get("category");

const container1 = document.querySelector(".all");

if (container1) container1.innerHTML = navbar();

const picture = await displayallproducts().then((Response) => {
  console.log({ Response });
  displaydetailsPicture(Response);
  // DisplaySimilarProduct(Response);
});

function displaydetailsPicture(pict) {
  const mealContainer = document.querySelector(".details-picture");
  pict?.forEach((product) => {
    if (productId == product.idPro) {
      currentProduct = product;
      const mealCard = document.createElement("div");
      mealCard.classList.add(".pict");
      mealCard.innerHTML = `
    <img id="pict_detail" src="${product.imagePro[1]}" />
    <div class="image">
    <i class="fa-solid fa-chevron-left" id="prev"></i>
    <img id="single_product" src="${product.imagePro[0]}" />
    <img id="single_product" src="${product.imagePro[1]}" />
    <img id="single_product" src="${product.imagePro[2]}" />
    <img id="single_product" src="${product.imagePro[3]}" />
    <i class="fa-solid fa-chevron-right" id="next"></i>   
     </div>
    <div class="item-price">
    <p class="prices"> Product Price: $${product.price}</p>
    <p class="price"> Product Price: $${product.price}</p>
    </div>
    `;
      mealContainer.appendChild(mealCard);
    }
  });
}

proUpdate.addEventListener("click", () =>{
  console.log("hey");
})

export const editProduct = () => {
  const proUpdate = document.querySelector(".container8");

  proUpdate.addEventListener("click", () => {
    let productName = document.getElementById("productName").value;
    let productUrl = document.getElementById("productUrl").value;
    let productPrice = document.getElementById("productPrice").value;
    let productCategory = document.getElementById("productCategory").value;

    let updatedProduct = {
      namePro: productName,
      imagePro: [productUrl],
      price: productPrice,
      nameCat: productCategory,
    };

    proUpdate.addEventListener("submit", (event) => {
      console.log("proUpdate");
      event.preventDefault();

      fetch(`http://localhost:3002/product/update/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour du produit");
          }
          console.log("Produit mis à jour avec succès");
          console.log(response);
          proUpdate.reset();
        })
        .catch((error) => {
          console.error("Erreur:", error);
        });
    });
  });
};

editProduct();
// remove a product
function remove() {
  const prodelete = document.querySelector(".container9");
  function deleteProduct(productId) {
    fetch(`http://localhost:3002/product/delete/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression du produit");
        }
        console.log("Produit supprimé avec succès");
        alert("succesfully moved");
      })
      .catch((error) => {
        console.error("Erreur:", error.message);
      });
  }
  prodelete.addEventListener("click", () => {
    deleteProduct(productId);
  });
}
remove();
// categoty
// function DisplaySimilarProduct(prod) {
//   const mealContaine = document.querySelector(".similar");
//   prod?.forEach((produ) => {
//     if (categoryId == produ.category) {
//       top;
//       const mealCar = document.createElement("div");
//       mealCar.classList.add(".sim");
//       console.log(produ.id);
//       mealCar.innerHTML = `
//       <div class="flex">
//       <img class="single" id="single_product" src="${produ.thumbnail}" alt="">
//       </div>
//       `;
//       mealContaine.appendChild(mealCar);
//     }
//   });
// }

// ToAdd Function
// const getCurrentItems = () => {
//   const prevItems = JSON.parse(localStorage.getItem("cardItems")) || [];
//   console.log({ prevItems, productId });
//   return prevItems.find((prod) => +prod?.item.idPro === +productId);
// };

// const updateCounter = () => {
//   const counter = document.querySelector(".a5");

//   const currentItem = getCurrentItems();

//   if (!currentItem) return;
//   counter.value = currentItem.total;
// };

// updateCounter();
// console.log();

// function incrementerNombre() {
//   const prevItems = JSON.parse(localStorage.getItem("cardItems")) || [];
//   const currentItem = getCurrentItems();

//   console.log({ currentItem });

//   console.log("prevItems", prevItems, currentItem);

//   const local_update = prevItems?.map((prod) => {
//     if (+prod.item.id === +currentItem.item.id) {
//       const updateProd = {
//         ...prod,
//         total: prod.total + 1,
//       };
//       return updateProd;
//     }

//     return prod;
//   });

//   localStorage.setItem("cardItems", JSON.stringify(local_update));

//   updateCounter();
// }

// // function to delet a product

// allAdToCArdBtns.addEventListener("click", incrementerNombre);

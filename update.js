// const productId = +req.params.id;

// const updateProductForm = document.getElementById("update-product-form");

// updateProductForm.addEventListener("submit", function(event) {
//   event.preventDefault();

//   const productName = document.getElementById("productName").value;
//   const productUrl = document.getElementById("productUrl").value;
//   const productPrice = parseFloat(document.getElementById("productPrice").value);
//   const productCategory = document.getElementById("productCategory").value;

//   const updatedProduct = {
//     namePro: productName,
//     imagePro: [productUrl],
//     price: productPrice,
//     nameCat: productCategory,
//   };

//   fetch(`http://localhost:3002/product/update/${productId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(updatedProduct)
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Erreur lors de la mise à jour du produit');
//     }
//     console.log('Produit mis à jour avec succès');
//     console.log(response);
//     updateProductForm.reset();
//   })
//   .catch(error => {
//     console.error('Erreur:', error);
//   });
// });
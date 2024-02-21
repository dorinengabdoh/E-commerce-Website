export function form() {
  document.getElementById("add-product-form").addEventListener("submit", function (event) {
    event.preventDefault();

    var productName = document.getElementById("productName").value;
    var productUrl = document.getElementById("productUrl").value;
    var productPrice = parseFloat(document.getElementById("productPrice").value);
    var productCategory = document.getElementById("productCategory").value;

    var newProduct = {
      namePro: productName,
      imagePro: [productUrl], 
      price: productPrice,
      nameCat: productCategory,
    };

    fetch('http://localhost:3002/product/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du produit');
      }
      console.log('Produit ajouté avec succès');
      console.log(response);
      // Réinitialiser le formulaire
      document.getElementById("add-product-form").reset();
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
  });
  
}

form();

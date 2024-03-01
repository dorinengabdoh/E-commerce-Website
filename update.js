import { editProduct } from "./details";

const newEditProduct = editProduct(); // Vérifiez si cette ligne est correcte selon le fonctionnement de editProduct

document.addEventListener("DOMContentLoaded", () => {
  const updateProduct = document.querySelector(".updateProduct");

  const newForm = () => {
    document.getElementById("update-product-form").addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("Formulaire soumis");
      newEditProduct(); // Appel de la fonction editProduct
    });
    updateProduct.innerHTML = `
      <form id="update-product-form">
        <div>
          <label for="productName">Nom du produit:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            required
          />
        </div>
        <div>
          <label for="productUrl">Image du produit</label>
          <input
            type="text"
            id="productUrl"
            name="productUrl"
            required
          />
        </div>
        <div>
          <label for="productPrice">Prix du produit:</label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            step="0.01"
            required
          />
        </div>
        <div>
          <label for="productCategory">Catégorie du produit:</label>
          <input
            type="text"
            id="productCategory"
            name="productCategory"
            required
          />
        </div>
        <div>
          <button type="submit">Mettre à jour le produit</button>
        </div>
      </form>
    `;
  };

  newForm();
});

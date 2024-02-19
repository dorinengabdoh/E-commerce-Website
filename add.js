export function form() {
  const container11 = document.querySelector(".container11");
  if (container11) {
    container11.innerHTML = `
     <form action="/ajouter-produit" method="post" class="produit-form">
        <label for="nom_produit">Nom du produit:</label>
         <input type="text" id="nom_produit" name="nom_produit" required>
        <label for="url_image">URL de l'image:</label>
         <input type="url" id="url_image" name="url_image" required>
       <label for="prix_produit">Prix du produit:</label>
         <input type="number" id="prix_produit" name="prix_produit" required>
       <label for="categorie_produit">Catégorie du produit:</label>
  <select id="categorie_produit" name="categorie_produit" required>
    <option value="">Choisir une catégorie</option>
    <option value="vetements">Vêtements</option>
    <option value="electronique">Electronique</option>
    <option value="maison-jardin">Maison et jardin</option>
    <option value="livres">Livres</option>
  </select>

  <button type="submit">Ajouter le produit</button>
</form>

     `;
  }
}

form();

export function form() {
  const container11 = document.querySelector(".container11");
  if (container11) {
    container11.innerHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Product</title>
    <link rel="stylesheet" href="styles.css">
    </head>
    <body>
    <div class="container">
      <h2>Add Product</h2>
      <form action="/product/add" method="post">
        <div class="form-group">
          <label for="namePro">Product Name:</label>
          <input type="text" id="namePro" name="namePro" required>
        </div>
        <div class="form-group">
          <label for="price">Price:</label>
          <input type="number" id="price" name="price" required>
        </div>
        <div class="form-group">
          <label for="imagePro">Image URL:</label>
          <input type="url" id="imagePro" name="imagePro" required>
        </div>
        <div class="form-group">
          <label for="nameCat">Category Name:</label>
          <input type="text" id="nameCat" name="nameCat" required>
        </div>
        <div class="form-group">
          <label for="idPro">Product ID:</label>
          <input type="text" id="idPro" name="idPro" required>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
    </body>
    </html>
    

     `;
  }
}

form();

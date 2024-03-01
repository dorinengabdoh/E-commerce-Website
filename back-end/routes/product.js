var express = require("express");
var router = express.Router();
let connection = require("../congif/bd_connect");

router.get("/", function (req, res, next) {
  const getquery = ` SELECT
  p.idPro,
  p.namePro,
  p.imagePro,
  p.price,
  c.nameCat
FROM product AS p
INNER JOIN category AS c ON p.idPro = c.idPro; `;
  connection.query(getquery, (err, data) => {
    console.log(data);
    if (data.length === 0) {
      let err = new Error(`product is not found`);
      err.status = 404;
      res.send(err);
      next(err);
    } else {
      res.setHeader("Content-type", "application/json");
      res.send(data);
    }
  });
});

// get al the category

router.get("/categorie", function (req, res, next) {
  const getquery = ` SELECT nameCat
  FROM category;`;
  connection.query(getquery, (err, data) => {
    console.log(data);
    if (data.length === 0) {
      let err = new Error(`product is not found`);
      err.status = 404;
      res.send(err);
      next(err);
    } else {
      res.setHeader("Content-type", "application/json");
      res.send(data);
    }
  });
});

// put request to update product

router.put("/update/:id", function (req, res, next) {
  const productId = +req.params.id;
  const { namePro, imagePro,price, nameCat } = req.body;
  const imagesJson = JSON.stringify(imagePro);
  const updateProduct = `UPDATE product SET namePro = ?, imagePro = ?, price = ? WHERE idPro = ${productId}`;
  const updateCategory = `UPDATE category SET nameCat = ? WHERE idPro = ${productId}`;
  const values = [namePro, imagesJson, price];
  console.log(values);
  const catvalues = [nameCat]
  console.log(catvalues);
  connection.beginTransaction(function (err) {
    if (err) {
      console.log(err,"the error");
      return next(err);
    }
    connection.query(updateProduct, values, function (err, productData) {
      if (err) {
        console.log(err,"error");
        return connection.rollback(function () {
          next(err);
        });

      }
      connection.query(updateCategory, catvalues, function (error, productCategoryData) {
        if (error) {
          return connection.rollback(function () {
            next(error);
          });
        }
        connection.commit(function (err) {
          if (err) {
            return connection.rollback(function () {
              next(err);
            });
          }
          console.log('succesfully update.');
          res.status(200).send({ productData, productCategoryData });
          console.log({productData,productCategoryData});
        });
      })
    })
  });
});





// post request to add a product

router.post("/add", function (req, res, next) {
  const { namePro, price, imagePro, nameCat } = req.body;
  const createQuery = `INSERT INTO product (namePro, imagePro, price) VALUES (?, ?, ?);`;
  const querryCategory = `INSERT INTO category (nameCat, idPro) VALUES (?, LAST_INSERT_ID());`;

  connection.beginTransaction(function (err) {
    if (err) {
      return next(err);
    }

    // Convert imagePro to JSON string
    const imageProJson = JSON.stringify(imagePro);

    connection.query(createQuery, [namePro, imageProJson, price], function (error, productResult) {
      if (error) {
        console.error("Error inserting product:", error);
        return connection.rollback(function () {
          next(error);
        });
      }

      // Insert category after product insertion
      connection.query(querryCategory, [nameCat], function (categoryError, categoryResult) {
        if (categoryError) {
          console.error("Error inserting category:", categoryError);
          return connection.rollback(function () {
            next(categoryError);
          });
        }

        // Commit transaction if everything is successful
        connection.commit(function (commitError) {
          if (commitError) {
            console.error("Error committing transaction:", commitError);
            return connection.rollback(function () {
              next(commitError);
            });
          }
          // Send success response
          res.status(201).json({ product: productResult, category: categoryResult });
        });
      });
    });
  });
});

router.delete("/delete/:id", function (req, res, next) {
  const id = req.params.id
  const deletedquery = `delete from product WHERE idPro = ${id};`
  console.log(id);
  connection.query(deletedquery, (err, data) => {
    if (err) {
      console.log(err);
      if (err.message === "not found") next()
      else {
        next()
      }
    } else {
      res.send(data)
    }
  })
})


module.exports = router;

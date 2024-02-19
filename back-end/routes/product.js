var express = require("express");
var router = express.Router();
let connection = require("../congif/bd_connect");

// get All the product
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

// post request to add a product

router.post('/add', function (req, res, next) {
  // const { brand, color } = req.body;
  // console.log(req.body);
  const createQuery = `START TRANSACTION;

  INSERT INTO product (namePro, imagePro, price)
  VALUES ('doc', '["https://cdn.dummyjson.com/product-images/1/1.jpg",
  "https://cdn.dummyjson.com/product-images/1/2.jpg",
  "https://cdn.dummyjson.com/product-images/1/3.jpg",
  "https://cdn.dummyjson.com/product-images/1/4.jpg",
  "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"]', 250)
  SET @productId = LAST_INSERT_ID()
  INSERT INTO category (nameCat, idPro)
  VALUES ('iphone9', 14)
  COMMIT;
  `
  connection.query(createQuery, (err, data) => {
    if (err) next(err)
    else res.status(201).send({data})
  })
})


















// router.get('/:idRec', function (req, res, next) {
//   console.log("working");
//   const idRec = req.params.idRec
//   console.log("idRec", idRec);

//   const query2 = `
//   SELECT
//   recipe.nameRec,
//   recipe.imageRec,
//   recipe.areaRec,
//   category.nameCat,
//   Instruction.step,
//   Instruction.nameInstru,
//   ingredient.nameIngre,
//   belongTo.quantity,
//   belongTo.unit
//   FROM
//     recipe
//   LEFT JOIN
//     category ON recipe.idCat = category.idCat
//   LEFT JOIN
//     Instruction ON recipe.idRec = Instruction.idRec
//   LEFT JOIN
//     belongTo ON recipe.idRec = belongTo.idRec
//   LEFT JOIN
//     ingredient ON belongTo.idIngre = ingredient.idIngre
//   WHERE
//   recipe.idRec = ${idRec};`;

//   connection.query(query2, (err, data) => {
//     console.log(data);
//     if (err) {
//       next(err)
//     } else {
//       if ((data.length === 0)) {
//         let error = new Error(`meal with that id not found`)
//         error.status = 404;
//         console.log(data);
//         console.log(error);
//         return res.status(404).send(error);
//       } else {
//         let parseData = data.map(item => ({
//           ...item,
//           nameInstru: JSON.parse(item.nameInstru)
//         }))
//         res.send(parseData);
//       }
//     }
//   })
// });



// router.post("/", function (req, res, next) {
//   const {
//     nameRec,
//     imageRec,
//     areaRec,
//     idCat,
//     nameCat,
//     idInstru,
//     nameInstru,
//     step,
//     idIngre,
//     idRec,
//     nameIngre,
//     quantity,
//     unit
//   } = req.body;

//   console.log("body", req.body);

//   const categoryQuery = `INSERT INTO category (nameCat) VALUES ("beef")`;
//   const mealQuery = `INSERT INTO recipe (idRec, nameRec, imageRec, areaRec, idCat) values (1,"shawama","https://example.com/spaghetti.jpg", "Spain",1)`;
//   const ingredientQuery = `insert into ingredient (nameIngre) values ("poulet")`;
//   const belongToQuery = ` insert  into belongTo (idRec, idIngre, quantity, unit) values (1, 1, 4, "tasse")`;
//   const instructionsQuery = `INSERT INTO Instruction (idInstru,nameInstru,step)
//     values (3,
//       '[{"instruction": "follow steps for shawarma carefully"}]',
//        '[{"instruction": "follow steps for shawarma carefully"}, {"step": "add tomatoes and"}]'
//      ),
//      (4,
//       '[{"instruction": "follow steps for shawarma carefully"}]',
//        '[{"instruction": "follow steps for shawarma carefully"}, {"step": "add tomatoes and"}]'
//      )
// `;

//   connection.beginTransaction(function (err) {
//     if (err) {
//       return next(err);
//     }
//     // Insert into mealcategory table
//     connection.query(categoryQuery, [idCat, nameCat], function (error, results) {
//       if (error) {
//         return connection.rollback(function () {
//           next(error);
//         });
//       }
//       // Insert into meals table
//       connection.query(mealQuery, [nameRec, imageRec, areaRec, idCat], function (error, results) {
//         if (error) {
//           return connection.rollback(function () {
//             next(error);
//           });
//         }
//         const mealIdFromMealsInsert = results.insertId;
//         // Insert into mealInstructions table
//         connection.query(instructionsQuery, [idInstru, nameInstru, step], function (error, results) {
//           console.log("instructions querry ", results);
//           if (error) {
//             return connection.rollback(function () {
//               next(error);
//             });
//           }

//           connection.query(ingredientQuery, [nameIngre], function (error, results) {
//             console.log(" ingredientquerry ", results);
//             if (error) {
//               return connection.rollback(function () {
//                 next(error)
//               })
//             }
//             connection.query(belongToQuery, [idRec, idIngre, quantity,unit], function (error, results) {
//               console.log(" belongToquerry ", results);
//               if (error) {
//                 return connection.rollback(function () {
//                   next(error)
//                 })
//               }
//               connection.commit(function (err) {
//                 if (err) {
//                   return connection.rollback(function () {
//                     next(err);
//                   });
//                 }
//                 console.log('Transaction Complete.');
//                 res.setHeader("Content-type", "application/json")
//                 res.status(201).send(results);
//               });
//             })
//           });
//         });
//       });
//     });
//   });
// });

// // post du router
// router.post("/", function (req, res, next) {
//   const recipeQuery = `INSERT INTO recipe (nameRec, imageRec, areaRec, idCat)
//   VALUES ('Gâteau a la banane', 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg', 'France', 1);`
//   const ingreQuery = `INSERT INTO Ingredient (nameIngre)
//   VALUES ('Farine');`
//   const instruQuery = `INSERT INTO instruction (nameInstru, step, idRec)
//   VALUES ('Mélanger la farine, le chocolat et les autres ingrédients dans un bol.', 2, 1);`
//   const catQuery = `INSERT INTO category (nameCat)
//   VALUES ('Desserts');`
//   const belongToQuery = `INSERT INTO belongTo (idIngre, idRec, quantity, unit)
//   VALUES (2, 1, 6, 'tasse');`
//   connection.query(recipeQuery, ingreQuery[instruQuery], catQuery, belongToQuery, (err, data) => {
//     if (err) next(err);
//     else res.status(201).send({ id: data.insertId });
//   });
// });

// // post  
// router.put("/:idRec", function (req, res, next) {
//   const idRec = req.params.idRec;
//   console.log(req.body);
//   const createQuery = `update recipe set nameRec = "gateau simpe" where idRec=${idRec}`;
//   connection.query(createQuery, (err, data) => {
//     if (err) next(err);
//     else res.status(201).send(data);
//   });
// });

// // delete

// router.delete("/:idRec", function (req, res, next) {
//   const idRec = req.params.idRec;
//   console.log(req.body);
//   const createQuery = `DELETE m FROM recipe m INNER JOIN Instruction i ON m.idRec = i.idRec INNER JOIN belongTo
//   mi ON m.idRec = mi.idRec INNER JOIN ingredient ing ON mi.idIngre = ing.idIngre WHERE m.idRec = ${idRec};`;
//   connection.query(createQuery, (err, data) => {
//     if (err) {
//       console.log(err);
//       if (err.message === "not found") next();
//       else {
//         next();
//       }
//     } else res.send(data);
//   });
// });

module.exports = router;

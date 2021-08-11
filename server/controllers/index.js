/* eslint-disable camelcase */
const { db } = require('../../db/index');

// const example = `SELECT
//   name,
//   slogan,
//   description,
//   category,
//   default_price,
//   ARRAY_AGG (
//     feature,
//     value
//       FROM
//         products.features
//           WHERE
//             products.features.product_id = 1
//   ) as features
//   FROM
//     products.products
//       WHERE
//         products.products.id = 1`;

module.exports = {
  getProducts: (req, res) => {
    let { page, count } = req.body;
    if (!page) { page = 1; }
    if (!count) { count = 5; }
    db.query(`SELECT * FROM products.products LIMIT ${count} OFFSET ${(count * (page - 1))};`)
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => console.log(err));
  },
  getProduct: (req, res) => {
    const { product_id } = req.params;
    // need product + features
    // db.query(`SELECT * FROM products.products WHERE id = ${product_id};`)
    //   .then((productData) => {
    //     db.query(`SELECT feature, value FROM products.features
    // WHERE products.features.product_id = ${product_id};`)
    //       .then((featuresData) => {
    //         res.send([productData.rows, featuresData.rows]);
    //       })
    //       .catch((err) => console.log(err));
    //     // should I make two separate calls (one to fetch products, another to fetch features?)
    //   })
    //   .catch((err) => console.log(err));
    // db.query(example)
    //   .then((productData) => {
    //     res.send(productData.rows);
    //   })
    //   .catch((err) => console.log(err));
    // should I make two separate calls (one to fetch products, another to fetch features?)
  },
  getStyles: (req, res) => {
    // need styles + photos + skus
    // const { product_id } = req.params;
    // db.query(`SELECT * FROM products.styles WHERE id = ${product_id}`)
    //   .then((data) => {
    //     res.send(data.data);
    //   })
    //   .catch((err) => console.log(err));
  },
  getRelatedProducts: (req, res) => {
    const { product_id } = req.params;
    db.query(`SELECT * FROM products.related WHERE current_product_id = ${product_id};`)
      .then((data) => {
        const relatedIds = [];
        data.rows.forEach((obj) => {
          if (relatedIds.indexOf(obj.related_product_id) < 0) {
            relatedIds.push(obj.related_product_id);
          }
        });
        // // manage duplicates here
        res.send(relatedIds);
        // res.send(data.rows)
      })
      .catch((err) => console.log(err));
  },
};

// 'SELECT name, slogan, description, category, default_price, feature, value
// 	FROM products.products
// 			INNER JOIN products.features
// 				ON products.products.id = products.features.product_id
// 					WHERE products.products.id = ${product_id};'

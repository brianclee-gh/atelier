/* eslint-disable camelcase */
const { db } = require('../../db/index');

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
    db.query(`SELECT *, ( SELECT jsonb_agg(
      jsonb_build_object(
        'feature', products.features.feature,
        'value', products.features.value)
   )
      FROM products.features
        WHERE products.features.product_id =11) as results
     FROM products.products as p
       WHERE p.id = ${product_id};`)
      .then((productData) => {
        res.send(productData.rows[0]);
      })
      .catch((err) => console.log(err));
    // db.query(`SELECT * FROM products.products WHERE id = ${product_id};`)
    //   .then((productData) => {
    //     db.query(`SELECT json_agg(
    //       json_build_object(
    //         'feature', products.features.feature,
    //         'value', products.features.value)
    //     )
    //       FROM products.features
    //         WHERE products.features.product_id = ${product_id}`)
    //       .then((featureData) => {
    //         const product = productData.rows[0];
    //         product.results = featureData.rows[0].json_agg;
    //         res.send([productData.rows[0]]);
    //       })
    //       .catch((err) => console.log(err));
    //   })
    //   .catch((err) => console.log(err));
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
    db.query(`SELECT array_agg(related_product_id) FROM products.related WHERE current_product_id = ${product_id};`)
      .then((data) => {
        const filtered = [...new Set(data.rows[0].array_agg)];
        res.send(filtered);
      })
      .catch((err) => console.log(err));
  },
};

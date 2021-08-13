/* eslint-disable camelcase */
const { db } = require('../../db/index');

module.exports = {
  getProducts: (req, res) => {
    let { page, count } = req.body;
    if (!page) { page = 1; }
    if (!count) { count = 5; }
    db.query(`SELECT data FROM prod_jsonb LIMIT ${count} OFFSET ${(count * (page - 1))};`)
      .then((data) => {
        res.send(data.rows.map((item) => item.data));
      })
      .catch((err) => console.log(err));
  },
  getProduct: (req, res) => {
    const { product_id } = req.params;
    db.query(`SELECT data FROM prod_feat_jsonb WHERE id = ${product_id}`)
      .then((productData) => {
        res.send(productData.rows[0].data);
      })
      .catch((err) => console.log(err));
  },
  getStyles: (req, res) => {
    // need styles + photos + skus
    const { product_id } = req.params;
    db.query(`SELECT product_id, json_build_object(
      'style_id', style_id,
      'name', name,
      'original_price', original_price,
      'sale_price', sale_price,
      'default?', default_style,
      'photos',
       (SELECT json_agg(jsonb_build_object(
          'thumbnail_url', thumbnail_url,
          'url', url
        )) FROM products.photos WHERE style_id = products.styles.style_id),
     'skus',
       (SELECT
           json_object_agg(id,
               jsonb_build_object(
            'size', size,
            'quantity', quantity
               )
           ) as skus
         FROM products.skus
         WHERE style_id = products.styles.style_id
             GROUP by style_id)
     ) as results FROM products.styles
        WHERE products.styles.product_id = ${product_id}`)
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => console.log(err));
  },
  getRelatedProducts: (req, res) => {
    const { product_id } = req.params;
    db.query(`SELECT related FROM prod_related WHERE id = ${product_id};`)
      .then((data) => {
        const filtered = [...new Set(data.rows[0].related)];
        res.send(filtered);
      })
      .catch((err) => console.log(err));
  },
};

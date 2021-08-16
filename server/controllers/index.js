/* eslint-disable camelcase */
const { db } = require('../../db/index');

module.exports = {
  getProducts: (req, res) => {
    let { page, count } = req.body;
    if (!page) { page = 1; }
    if (!count) { count = 5; }
    const queryString = `SELECT id, name, slogan, category, description, default_price
      FROM products LIMIT $1 OFFSET $2;`;
    db.any(queryString, [count, (count * (page - 1))])
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getProduct: (req, res) => {
    const { product_id } = req.params;
    const queryString = `SELECT *, (
      SELECT json_agg(json_build_object(
        'feature', feature,
        'value', value
      )) AS features
        FROM features
          WHERE product_id = p.id
            GROUP BY product_id
    ) FROM products AS p WHERE id = $1`;

    const intId = parseInt(product_id, 10);

    db.one({
      text: queryString,
      values: [intId],
    })
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        console.log(error);
        res.send('Invalid ID');
      });
  },
  getStyles: (req, res) => {
    const { product_id } = req.params;
    const queryString = `SELECT product_id, json_agg(json_build_object(
      'style_id', style_id,
      'name', name,
      'original_price', original_price,
      'sale_price', sale_price,
      'default?', (default_style::int::bool),
      'photos',
      (SELECT json_agg(json_build_object(
          'thumbnail_url', thumbnail_url,
          'url', url
        )) FROM photos WHERE style_id = styles.style_id),
    'skus',
      (SELECT
          json_object_agg(id,
              json_build_object(
            'size', size,
            'quantity', quantity
              )
          ) as skus
        FROM skus
        WHERE style_id = styles.style_id
            GROUP by style_id)
    )) as results FROM styles
        WHERE styles.product_id = $1
          GROUP BY product_id`;

    db.any(queryString, [product_id])
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getRelatedProducts: (req, res) => {
    const { product_id } = req.params;
    const queryString = `SELECT json_agg(related_product_id) AS related
      FROM related WHERE current_product_id = $1;`;
    db.any(queryString, [product_id])
      .then((data) => {
        const filtered = [...new Set(data[0].related)];
        res.send(filtered);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

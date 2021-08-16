/* eslint-disable camelcase */
const { pool } = require('../../db/index');

module.exports = {
  getProducts: (req, res) => {
    let { page, count } = req.body;
    if (!page) { page = 1; }
    if (!count) { count = 5; }
    const queryString = `SELECT id, name, slogan, category, description, default_price
      FROM products LIMIT ${count} OFFSET ${(count * (page - 1))};`;
    pool
      .connect()
      .then((client) => client
        .query(queryString)
        .then((data) => {
          client.release();
          res.send(data.rows);
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
        }));
  },
  getProduct: (req, res) => {
    const { product_id } = req.params;
    const queryString = `SELECT *, (
      SELECT json_agg(json_build_object(
        'feature', feature,
        'value', value
      )) as features
        from features
          where product_id = p.id
            group by product_id
    ) from products as p where id = ${product_id}`;

    pool.query(queryString, (err, data) => {
      if (err) {
        throw err;
      }
      res.send(data.rows[0]);
    });
    // pool
    //   .connect()
    //   .then((client) => client
    //     .query(queryString)
    //     .then((productData) => {
    //       client.release();
    //       res.send(productData.rows[0]);
    //     })
    //     .catch((err) => {
    //       client.release();
    //       console.log(err.stack);
    //     }));
  },
  getStyles: (req, res) => {
    const { product_id } = req.params;
    const queryString = `SELECT product_id, json_agg(json_build_object(
      'style_id', style_id,
      'name', name,
      'original_price', original_price,
      'sale_price', sale_price,
      'default?', default_style,
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
        WHERE styles.product_id = ${product_id}
          GROUP BY product_id`;

    pool
      .connect()
      .then((client) => client
        .query(queryString)
        .then((data) => {
          client.release();
          res.send(data.rows[0]);
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
        }));
  },
  getRelatedProducts: (req, res) => {
    const { product_id } = req.params;
    const queryString = `SELECT json_agg(related_product_id) AS related FROM related WHERE current_product_id = ${product_id};`;
    pool
      .connect()
      .then((client) => client
        .query(queryString)
        .then((data) => {
          client.release();
          const filtered = [...new Set(data.rows[0].related)];
          res.send(filtered);
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
        }));
  },
};

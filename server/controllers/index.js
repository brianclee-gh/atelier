// const axios = require('axios');
// const db = require('../../db/index');

module.exports = {
  getProducts: (req, res) => {
    res.send('hit this endpoint');
    // db.query
    // params: page, #
  },
  getProduct: (req, res) => {
    const { product_id } = req.params;
    // db.query
    // params: product_id
  },
  getStyles: (req, res) => {
    const { product_id } = req.params;
    // db.query
    // params: product_id
  },
  getRelatedProducts: (req, res) => {
    const { product_id } = req.params;
    // db.query
    // params: product_id
  },
};

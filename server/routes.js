const router = require('express').Router();
const controller = require('./controllers');

router.get('/products', controller.getProducts);
router.get('/products/:product_id', controller.getProduct);
router.get('/products/:product_id/styles', controller.getStyles);
router.get('/products/:product_id/related', controller.getRelatedProducts);

module.exports = router;

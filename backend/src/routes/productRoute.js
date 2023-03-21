const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getMany);

router.get('/:id', productController.getSingle);
  
router.post('/add', productController.create);

router.get('/categories', productController.getCategories);

router.get('/category/:categoryId', productController.getByCategory);

module.exports = router;

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/all/:token', orderController.getAll);

router.post('/add', orderController.create);
  
router.post('/user', orderController.getByUser);

module.exports = router;

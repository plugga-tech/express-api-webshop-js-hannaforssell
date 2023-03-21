const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getMany);

router.post('/add', categoryController.create);

module.exports = router;

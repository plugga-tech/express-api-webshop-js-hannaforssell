const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET users. */
router.get('/', userController.getMany);

/* POST user. */
router.post('/', userController.getSingle);
  
/* POST user */
router.post('/add', userController.create);

/* POST user */
router.post('/login', userController.login);

/* DELETE user */
//router.delete('/:id', userController.remove);

module.exports = router;

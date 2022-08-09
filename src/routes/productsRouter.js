const express = require('express');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/search', productsController.search);
router.post('/', productsController.create);
router.get('/:id', productsController.getById);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.delete);

module.exports = router;

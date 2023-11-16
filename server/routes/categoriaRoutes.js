const express = require('express');
const router = express.Router();
const categoriaController = require ('../controllers/categoriaController');

router.get('/', categoriaController.getAllCategorias);
router.get('/:id', categoriaController.getCategoriaByID);
router.post('/', categoriaController.createCategoria);
router.put('/:id', categoriaController.updateCategoria);
router.delete('/:id', categoriaController.deleteCategoria);


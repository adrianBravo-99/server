const express = require('express');
const libraryController = require('../controllers/library.controller');

const router = express.Router();

router.get('/', libraryController.getAllLibraries); // Obtener todas las bibliotecas
router.get('/:id', libraryController.getLibraryById); // Obtener biblioteca por ID
router.post('/', libraryController.createLibrary); // Crear una nueva biblioteca
router.put('/:id', libraryController.updateLibrary); // Actualizar una biblioteca
router.delete('/:id', libraryController.deleteLibrary); // Eliminar una biblioteca

module.exports = router;

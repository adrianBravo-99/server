const libraryService = require('../services/library.service');

const getAllLibraries = async (req, res) => {
  try {
    const libraries = await libraryService.getAllLibraries();
    res.json(libraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLibraryById = async (req, res) => {
  try {
    const library = await libraryService.getLibraryById(req.params.id);
    if (!library) return res.status(404).json({ error: 'Biblioteca no encontrada' });
    res.json(library);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLibrary = async (req, res) => {
  try {
    const newLibrary = await libraryService.createLibrary(req.body);
    res.status(201).json(newLibrary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLibrary = async (req, res) => {
  try {
    const updatedLibrary = await libraryService.updateLibrary(req.params.id, req.body);
    if (!updatedLibrary) return res.status(404).json({ error: 'Biblioteca no encontrada' });
    res.json(updatedLibrary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLibrary = async (req, res) => {
  try {
    await libraryService.deleteLibrary(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllLibraries,
  getLibraryById,
  createLibrary,
  updateLibrary,
  deleteLibrary,
};

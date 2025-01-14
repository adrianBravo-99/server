const { Library } = require('../models');

// Crear una biblioteca
const createLibrary = async (data) => {
  const library = await Library.create(data);
  return {
    id: library.id,
    name: library.name,
    address: library.address,
    createdAt: library.createdAt,
    updatedAt: library.updatedAt,
  };
};

// Actualizar una biblioteca
const updateLibrary = async (id, data) => {
  const library = await Library.findByPk(id);
  if (!library) throw new Error('Biblioteca no encontrada');

  const updatedLibrary = await library.update(data);
  return {
    id: updatedLibrary.id,
    name: updatedLibrary.name,
    address: updatedLibrary.address,
    createdAt: updatedLibrary.createdAt,
    updatedAt: updatedLibrary.updatedAt,
  };
};

// Eliminar una biblioteca
const deleteLibrary = async (id) => {
  const library = await Library.findByPk(id);
  if (!library) throw new Error('Biblioteca no encontrada');

  return library.destroy();
};

// Obtener una biblioteca por su ID
const getLibraryById = async (id) => {
  const library = await Library.findByPk(id);
  if (!library) return null;

  return {
    id: library.id,
    name: library.name,
    address: library.address,
    createdAt: library.createdAt,
    updatedAt: library.updatedAt,
  };
};

// Obtener todas las bibliotecas
const getAllLibraries = async () => {
  const libraries = await Library.findAll();
  return libraries.map(library => ({
    id: library.id,
    name: library.name,
    address: library.address,
    createdAt: library.createdAt,
    updatedAt: library.updatedAt,
  }));
};

// Crear bibliotecas por defecto
const createDefaultLibraries = async () => {
  const defaultLibraries = [
    { name: 'Biblioteca Sangolquí', address: 'Calle Principal #123' },
    { name: 'Biblioteca Alejandro Segovia', address: 'Av. Amazonas y República' },
    { name: 'Biblioteca Santo Domingo', address: 'Av. Tsáchila y 10 de Agosto' },
    { name: 'Biblioteca Latacunga', address: 'Calle Bolívar y Montalvo' },
  ];

  await Library.bulkCreate(defaultLibraries);
};

module.exports = {
  createLibrary,
  updateLibrary,
  deleteLibrary,
  getLibraryById,
  getAllLibraries,
  createDefaultLibraries,
};

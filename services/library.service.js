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
    { id: '7c2582cb-1d01-4635-917d-0e3fb23bb4c4', name: 'Biblioteca Sangolquí', address: 'Matriz' },
    { id: '977f2a17-4701-465a-9c1d-ef96c39d81cd', name: 'Biblioteca Latacunga', address: 'Sucursal' },
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

// services/user.service.js
const { User } = require('../models');
const { UserDTOBuilder } = require('../dto/user.dto');

// Crear un usuario
const createUser = async (data) => {
  const user = await User.create(data);
  return new UserDTOBuilder()
    .setId(user.id)
    .setFirstName(user.firstName)
    .setLastName(user.lastName)
    .setEmail(user.email)
    .setUserType(user.userType)
    .setLibraryId(user.libraryId)
    .build();
};

// Actualizar un usuario
const updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuario no encontrado');

  const updatedUser = await user.update(data);

  return new UserDTOBuilder()
    .setId(updatedUser.id)
    .setFirstName(updatedUser.firstName)
    .setLastName(updatedUser.lastName)
    .setEmail(updatedUser.email)
    .setUserType(updatedUser.userType)
    .build();
};

// Eliminar un usuario
const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuario no encontrado');
  return user.destroy();
};

// Obtener un solo usuario por su ID
const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  return new UserDTOBuilder()
    .setId(user.id)
    .setFirstName(user.firstName)
    .setLastName(user.lastName)
    .setEmail(user.email)
    .setUserType(user.userType)
    .build();
};

const getAllUsers = async (libraryId) => {
  const where = {};

  // Filtramos por libraryId si está presente
  if (libraryId) {
    where.libraryId = libraryId;
  }

  const users = await User.findAll({ where });
  
  return users.map(user =>
    new UserDTOBuilder()
      .setId(user.id)
      .setFirstName(user.firstName)
      .setLastName(user.lastName)
      .setEmail(user.email)
      .setUserType(user.userType)
      .build()
  );
};

// Crear bibliotecas por defecto
const createDefaultUser = async () => {
  const defaultUser = [
    { firstName: 'Root', lastName: 'Root', email: 'root@mail.com', password: '12345678', userType: 'creator' },
    { firstName: 'Adrian', lastName: 'Bravo', email: 'adrian@mail.com', password: '12345678', userType: 'admin', libraryId: '7c2582cb-1d01-4635-917d-0e3fb23bb4c4' },
    { firstName: 'Kathy', lastName: 'Armendariz', email: 'kathy@mail.com', password: '12345678', userType: 'consumer', libraryId: '7c2582cb-1d01-4635-917d-0e3fb23bb4c4' },
    { firstName: 'Sebastian', lastName: 'Falconi', email: 'sebastian@mail.com', password: '12345678', userType: 'admin', libraryId: '977f2a17-4701-465a-9c1d-ef96c39d81cd' },
    { firstName: 'Jessica', lastName: 'Andrango', email: 'jessica@mail.com', password: '12345678', userType: 'consumer', libraryId: '977f2a17-4701-465a-9c1d-ef96c39d81cd' },
  ];

  await User.bulkCreate(defaultUser);
};


module.exports = { createUser, updateUser, deleteUser, getUserById, getAllUsers, createDefaultUser };

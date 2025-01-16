const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Book = require('./book'); // Importa el modelo Book
const User = require('./user.model'); // Importa el modelo User

const Loan = sequelize.define('Loan', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users', // Nombre de la tabla de usuarios
      key: 'id',
    },
  },
  bookId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'books', // Nombre de la tabla de libros
      key: 'id',
    },
  },
  libraryId: {
    type: DataTypes.UUID, // Usamos UUID para que sea compatible con la tabla `libraries`
    allowNull: true, // No obligatorio
    defaultValue: null, // Valor por defecto
  },
  loanDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'returned', 'late'),
    defaultValue: 'active',
  },
}, {
  tableName: 'loans', // Nombre de la tabla en la BD
  timestamps: true,
});

// Asociaciones
Loan.belongsTo(Book, { as: 'book', foreignKey: 'bookId' }); // Asociación con Book
Loan.belongsTo(User, { as: 'user', foreignKey: 'userId' }); // Asociación con User

module.exports = Loan;

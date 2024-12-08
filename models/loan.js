const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

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

module.exports = Loan;

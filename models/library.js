const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Library = sequelize.define('Library', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    subscription: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'libraries', // Nombre de la tabla en la base de datos
    timestamps: true, // Incluye createdAt y updatedAt automáticamente
});

module.exports = Library;

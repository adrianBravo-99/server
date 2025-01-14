const { Sequelize } = require('sequelize');

// Configuración de la base de datos PostgreSQL
const sequelize = new Sequelize('postgres', 'postgres', 'admin', {
  host: 'localhost', // Cambiar si usas un servidor remoto
  dialect: 'postgres', // Especificamos PostgreSQL
  dialectOptions: {
    ssl: false,
  },
  logging: false, // Desactiva logs de consultas SQL en consola
});

// Verificar la conexión
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a PostgreSQL.');
  } catch (error) {
    console.error('Error al conectar con PostgreSQL:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };

const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/database');
const userRoutes = require('./routes/user.routes');
const bookRoutes = require('./routes/book.routes');
const { createDefaultBooks } = require('./services/book.service');
const soapService = require('./services/soap.service');
const { authenticateToken } = require('./auth.middleware'); // Importa el middleware de autenticación

const app = express();
const PORT = process.env.PORT || 4000;

// Configuración global de middlewares
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Middleware para parsear JSON en las solicitudes

// Middleware para validar el origen o referer
app.use((req, res, next) => {
  const allowedReferer = 'https://fantastic-fiesta-j9xv499j4g2p9rr-3000.app.github.dev';
  const referer = req.headers.referer || req.headers.origin;

  if (referer && referer.startsWith(allowedReferer)) {
    next(); // Permite la solicitud
  } else {
    res.status(403).json({ message: 'No autorizado' }); // Rechaza la solicitud
  }
});

// Configurar el servicio SOAP
soapService(app);

// Rutas protegidas por API token
app.use('/api/users', userRoutes); // Rutas relacionadas con usuarios
app.use('/api/books', bookRoutes); // Rutas relacionadas con libros

// Ruta de autenticación para generar un token (no protegida)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar credenciales (esto es solo un ejemplo)
  if (username === 'admin' && password === 'admin123') {
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ username, role: 'admin' }, 'your-secret-key', { expiresIn: '1h' }); // Genera el token
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Credenciales incorrectas' });
});

// Función principal
const main = async () => {
  try {
    // Conectar a la base de datos PostgreSQL
    await connectDB();

    // Sincronizar las tablas de la base de datos
    await sequelize.sync({ force: false }); // Cambiar a `true` solo para recrear tablas (borrar datos)
    console.log('Tablas sincronizadas correctamente.');

    // Inicializar datos por defecto (opcional, descomenta para usar)
    //await initializeDefaults();

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en: http://localhost:${PORT}`);
      console.log(`URL pública: https://stunning-fortnight-j9xv4995xw3q6j6-4000.app.github.dev/`);
    });
  } catch (error) {
    console.error('Error al inicializar la aplicación:', error.message);
    process.exit(1); // Salir del proceso en caso de error crítico
  }
};

// Función para inicializar datos por defecto (libros, usuarios, etc.)
const initializeDefaults = async () => {
  try {
    console.log('Creando libros por defecto...');
    await createDefaultBooks();
    console.log('Libros por defecto creados con éxito.');
  } catch (error) {
    console.error('Error al crear libros por defecto:', error.message);
  }
};

// Ejecutar la función principal
main();

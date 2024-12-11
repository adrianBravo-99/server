const jwt = require('jsonwebtoken'); // O usa otra librería para manejar tokens
const SECRET_KEY = 'your-secret-key'; // Cambia esto por una clave segura

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
  console.log('prueba')

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Usar la clave secreta cargada
    req.user = decoded; // Adjuntar información del token a la solicitud
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = { authenticateToken };

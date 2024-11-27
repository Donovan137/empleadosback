const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const employeeRoutes = require('../routes/employee.routes'); // Ajusta según la nueva estructura
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Ya conectado a MongoDB.');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState;
    console.log('Conectado a MongoDB.');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Salir del proceso si falla la conexión
  }
};

connectDB();

// Rutas
app.use('/api/employees', employeeRoutes);

app.get('/test', (req, res) => {
  res.json({ message: 'El servidor está funcionando correctamente' });
});

// Middleware para errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    message: 'Error interno del servidor',
    stack: err.stack,
  });
});

module.exports = app;

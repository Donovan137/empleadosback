const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const employeeRoutes = require('../routes/employee.routes');
require('dotenv').config();

const app = express();


app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB.');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};


connectDB();


app.use('/api/employees', employeeRoutes);


app.get('/test', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
});


app.use((err, req, res, next) => {
  console.error('Error en middleware:', err);
  res.status(500).json({
    message: 'Error interno del servidor',
    error: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
});

module.exports = app;
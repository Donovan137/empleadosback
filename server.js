const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employee.routes');
require ('dotenv').config()

const app = express();


app.use(cors({oringin:'*'}));
app.use(bodyParser.json());

// Conexión a MongoDB //
mongo.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log('Conexión exitosa a MongoDB.');

  testInsert();
})
.catch(err => console.error('Error al conectar a MongoDB:', err));


const Employee = require('./models/employee.model');

async function testInsert() {
  try {
    const testEmployee = new Employee({
      nombre_usuario: 'Usuario Prueba',
      puesto: 'Puesto Prueba',
      lugar_trabajo: 'Lugar Prueba',
      valor: 1000
    });

    await testEmployee.save();
    console.log('Empleado de prueba insertado correctamente');
    

    const empleados = await Employee.find();
    console.log('Empleados en la base de datos:', empleados);
  } catch (error) {
    console.error('Error al insertar empleado de prueba:', error);
  }
}


app.use('/api/employees', employeeRoutes);


app.get('/test', (req, res) => {
  res.json({ message: 'El servidor está funcionando correctamente' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Error interno del servidor',
    error: err.message
  });
});
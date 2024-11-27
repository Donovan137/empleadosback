const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');


router.post('/', async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);
    
    const { username, position, workplace, value } = req.body;
    
    const newEmployee = new Employee({
      nombre_usuario: username || req.body.nombre_usuario,
      puesto: position || req.body.puesto,
      lugar_trabajo: workplace || req.body.lugar_trabajo,
      valor: Number(value || req.body.valor)
    });

    const savedEmployee = await newEmployee.save();
    console.log('Empleado guardado:', savedEmployee);
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error('Error al agregar el empleado:', error);
    res.status(400).json({ 
      message: error.message,
      detalles: error.toString()
    });
  }
});


router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ 
      message: error.message,
      detalles: error.toString()
    });
  }
});

module.exports = router;
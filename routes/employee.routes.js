const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');

// Agregar nuevo empleado //
router.post('/', async (req, res) => {
  try {
    const { username, position, workplace, value } = req.body;
    
    const newEmployee = new Employee({
      nombre_usuario: username,
      puesto: position,
      lugar_trabajo: workplace,
      valor: value
    });

    const savedEmployee = await newEmployee.save();
    console.log('Empleado guardado:', savedEmployee);
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error('Error al agregar el empleado:', error);
    res.status(400).json({ message: error.message });
  }
});

// Obtener todos los empleados //
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
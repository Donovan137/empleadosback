const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  nombre_usuario: {
    type: String,
    required: true
  },
  puesto: {
    type: String,
    required: true
  },
  lugar_trabajo: {
    type: String,
    required: true
  },
  valor: {
    type: Number,
    required: true
  }
}, {
  collection: 'empleados'
  // Se removió timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
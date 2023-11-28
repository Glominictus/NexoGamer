// models/consola.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Consola = sequelize.define('Consola', {
  id_consola: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Puedes agregar más atributos aquí según tu esquema de base de datos
}, {
  tableName: 'consolas',
  timestamps: false
});

module.exports = Consola;
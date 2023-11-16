// models/genero.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Genero = sequelize.define('Genero', {
  id_genero: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'genero',
  timestamps: false // Omitir si tu tabla no tiene campos de timestamps automáticos
});

module.exports = Genero;

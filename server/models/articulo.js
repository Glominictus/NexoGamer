// models/articulo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Usuario = require('./usuario');
const Categoria = require('./categoria');
const Genero = require('./genero');
const Plataforma = require('./plataforma');

const Articulo = sequelize.define('Articulo', {
  id_articulo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  interes: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  fecha_publicacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categoria',
      key: 'id_categoria'
    }
  },
  imagenes: {
    type: DataTypes.TEXT, // Esto puede ser una URL o un JSON con URLs si hay múltiples imágenes
    allowNull: true
  },
  tipo: {
    type: DataTypes.ENUM('Venta', 'Intercambio'),
    allowNull: true
  },
  id_genero: {
    type: DataTypes.INTEGER,
    allowNull: true, // o false, dependiendo de si cada artículo debe tener un género
    references: {
        model: 'Genero', // Nombre del modelo de Género
        key: 'id_genero'
    }
},
  id_plataforma: {
    type: DataTypes.INTEGER,
    allowNull: true, // o false, dependiendo de si cada opción debe tener una plataforma
    references: {
        model: 'Plataforma', // Nombre del modelo de Plataforma
        key: 'id_plataforma'
    }
  // No incluyo id_usuario aquí porque estableceremos la relación a continuación
},

},
 {
  tableName: 'articulos',
  timestamps: false // Si no deseas los campos createdAt y updatedAt
});

// Establece la relación Uno a Muchos con Categoria
Categoria.hasMany(Articulo, { foreignKey: 'id_categoria' });
Articulo.belongsTo(Categoria, { foreignKey: 'id_categoria' });

// Establece la relación Uno a Muchos con Usuario
Usuario.hasMany(Articulo, { foreignKey: 'id_usuario' });
Articulo.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Genero.hasMany(Articulo, { foreignKey: 'id_genero' });
Articulo.belongsTo(Genero, { foreignKey: 'id_genero' });

Plataforma.hasMany(Articulo, { foreignKey: 'id_plataforma' });
Articulo.belongsTo(Plataforma, { foreignKey: 'id_plataforma' });

module.exports = Articulo;

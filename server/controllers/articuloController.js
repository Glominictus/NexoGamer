const Articulo = require('../models/articulo');
const articuloController = {
    // Obtener todos los artículos
    getAllArticulos: async (req, res) => {
        try {
            const articulos = await Articulo.findAll();
            res.json(articulos);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Obtener un artículo específico por ID
    getArticuloById: async (req, res) => {
        try {
            const articulo = await Articulo.findByPk(req.params.id);
            if (articulo) {
                res.json(articulo);
            } else {
                res.status(404).send('Artículo no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Crear un nuevo artículo
    createArticulo: async (req, res) => {
        try {
            const nuevoArticulo = await Articulo.create(req.body);
            res.status(201).json(nuevoArticulo);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Actualizar un artículo
    updateArticulo: async (req, res) => {
        try {
            const [updated] = await Articulo.update(req.body, {
                where: { id_articulo: req.params.id }
            });
            if (updated) {
                const articuloActualizado = await Articulo.findByPk(req.params.id);
                res.status(200).json(articuloActualizado);
            } else {
                res.status(404).send('Artículo no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Eliminar un artículo
    deleteArticulo: async (req, res) => {
        try {
            const deleted = await Articulo.destroy({
                where: { id_articulo: req.params.id }
            });
            if (deleted) {
                res.status(204).send('Artículo eliminado');
            } else {
                res.status(404).send('Artículo no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = articuloController;

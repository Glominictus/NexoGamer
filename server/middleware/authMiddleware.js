const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send("Se requiere un token para la autenticación");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        return res.status(401).send("Token no válido");
    }

    return next();
};

module.exports = verifyToken;
/*a añadir al controlador de usuario:
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Si estás usando bcrypt para hashear contraseñas
const Usuario = require('../models/usuario');

const usuarioController = {
    // ... otras funciones del controlador ...

    login: async (req, res) => {
        try {
            const usuario = await Usuario.findOne({ where: { email: req.body.email } });

            // Verificar si el usuario existe
            if (!usuario) {
                return res.status(404).send('Usuario no encontrado');
            }

            // Verificar la contraseña (suponiendo que usas bcrypt para hashear las contraseñas)
            const validPassword = bcrypt.compareSync(req.body.password, usuario.password_hash);
            if (!validPassword) {
                return res.status(401).send('Contraseña incorrecta');
            }

            // Crear un token JWT
            const token = jwt.sign({ id: usuario.id_usuario }, process.env.JWT_SECRET, {
                expiresIn: 86400 // 24 horas
            });

            res.json({ auth: true, token });
        } catch (error) {
            res.status(500).send('Error en el servidor');
        }
    }

    // ... otras funciones del controlador ...
};

module.exports = usuarioController;

*/

/*añadir a la ruta 
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// ... otras rutas de usuario ...

router.post('/login', usuarioController.login);

// ... otras rutas de usuario ...

module.exports = router;
*/
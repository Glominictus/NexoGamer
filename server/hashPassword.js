const bcrypt = require('bcryptjs');

const password = 'jose2209';
const saltRounds = 10; // O el número de rondas que usas normalmente

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error(err);
    } else {
        console.log('Hashed Password:', hash);
        // Aquí puedes actualizar la contraseña en la base de datos
    }
});

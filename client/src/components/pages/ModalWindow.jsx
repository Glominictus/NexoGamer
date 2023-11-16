import React, { useState } from 'react';

export const ModalWindow = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Entra en NexoGamer</h2>
                <form>
                    <label>
                        Correo Electrónico
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        Contraseña
                        <input type="password" name="password" required />
                    </label>
                    <button type="submit">Iniciar Sesión</button>
                    <a href="/recuperar-contraseña">¿Olvidaste tu contraseña?</a>
                </form>
                <div>
                    <h3>Regístrate aquí</h3>
                    <button onClick={() => {/* código para manejar registro */}}>Registrarse</button>
                </div>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

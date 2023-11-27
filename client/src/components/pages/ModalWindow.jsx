import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const ModalWindow = ({ isOpen, onClose, onLoginSuccess }) => {
    

    const handleLogin = async (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json();
        console.log(data)

        if (response.ok) {
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userName', data.user.nickname);
            localStorage.setItem('id_usuario', data.user.id_usuario);
            onLoginSuccess();
            onClose();
        } else {
            console.error("Inicio de sesión fallida:", data.error);
        }
    }
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">


                <h2 className='modal-title'>
                    <span className="icon">
                        <i className="bi bi-person-circle"></i>
                    </span>
                    Entra en NexoGamer</h2>

                <hr />
                <form className='form-login' onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Correo Electrónico:</label>
                        <input type="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input type="password" name="password" required />
                    </div>
                    <div className="form-group action-group">
                        <button type="submit">Iniciar Sesión</button>
                        <a href="/recuperar-contraseña" className="forgot-password">¿Olvidaste tu contraseña?</a>
                    </div>
                    <hr />
                    <div>
                        <h3 className='modal-footer'>Regístrate aquí</h3>
                        <button onClick={() => {/* código para manejar registro */ }}>Registrarse</button>
                        <button onClick={onClose}>Cerrar</button>
                    </div>
                </form>



            </div>
        </div>
    );
};

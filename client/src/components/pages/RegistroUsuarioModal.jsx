import React, { useState } from 'react'

export const RegistroUsuarioModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit iniciado");
        if (password !== confirmPassword) {
            setPasswordError('Las contraseñas no coinciden');
            console.log("Las contraseñas no coinciden");
            return;
        }
        if (emailError || nicknameError || passwordError) {
            // Si hay algún error de validación, no proceder con el registro
            console.log("Hay errores de validación");
            return;
        }
        try {
            console.log("Realizando solicitud de registro");
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, nickname }),
            });
            const data = await response.json();
            console.log("Respuesta recibida:", data);
            if (!response.ok) {
                // Maneja los errores del registro aquí
                setError(data.message || 'Error al registrar el usuario');
                console.log("Error en la respuesta del registro");
            } else {
                setSuccessMessage('Has sido registrado correctamente.');
                console.log("Mensaje de éxito establecido:", successMessage);
            }
        } catch (error) {
            // Maneja errores de red aquí
            setError('Error de conexión al registrar el usuario');
            console.log("Error de conexión:", error);
        }
    }


const handleEmailBlur = async () => {
    console.log("Comprobando email:", email);
    // Comprobar si el email ya está en uso
    // Esto es un ejemplo, deberás ajustarlo según tu API
    const response = await fetch('http://localhost:3000/api/check-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) {
        console.log("Respuesta de la verificación de email:", data);
        setEmailError(data.message || 'Error al comprobar el email');
    }
};

const handleNicknameBlur = async () => {
    console.log("Comprobando nickname:", nickname);
    // Comprobar si el nickname ya está en uso
    // Ajusta según tu API
    const response = await fetch('http://localhost:3000/api/check-nickname', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }),
    });
    const data = await response.json();
    console.log("Respuesta de la verificación de nickname:", data);
    if (!response.ok) {
        setNicknameError(data.message || 'Error al comprobar el nombre de usuario');
    }
};

const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Limpia el mensaje de error al empezar a escribir de nuevo
    if (passwordError) setPasswordError('');
};

const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Limpia el mensaje de error al empezar a escribir de nuevo
    if (passwordError) setPasswordError('');
};

const checkPasswordsMatch = () => {
    if (password !== confirmPassword && password && confirmPassword) {
        setPasswordError('Las contraseñas no coinciden');
    }
};


if (!isOpen) return null;

return (
    <div className='modal-register'>
        <div className="modal-content-register">
            <button onClick={onClose}>Cerrar</button>
            <h2>Registro de NexoGamer</h2>
            
            <form onSubmit={handleSubmit}>
            {successMessage && <div className="success-message">{successMessage}</div>}
                <div className="form-group">
                    <label>Correo Electrónico:</label>
                    <input type="email" name="email" required onChange={(e) => setEmail(e.target.value)} onBlur={handleEmailBlur} />
                    {emailError && <div className="error">{emailError}</div>}
                </div>
                <div className="form-group">
                    <label>Contraseña (mínimo 6 caracteres):</label>
                    <input type="password" name="password" required
                        onChange={handlePasswordChange}
                        onBlur={checkPasswordsMatch} />
                </div>
                <div className="form-group">
                    <label>Repetir contraseña:</label>
                    <input type="password" name="confirmPassword" required
                        onChange={handleConfirmPasswordChange}
                        onBlur={checkPasswordsMatch} />
                </div>
                {passwordError && <div className="error">{passwordError}</div>}
                <div className='form-group'>
                    <label>Nombre de usuario</label>
                    <input type="text" name="nickname" required onChange={(e) => setNickname(e.target.value)} onBlur={handleNicknameBlur} />
                    {nicknameError && <div className="error">{nicknameError}</div>}
                </div>

                <button type="submit">Registrar</button>
            </form>
        </div>

    </div>
)
}

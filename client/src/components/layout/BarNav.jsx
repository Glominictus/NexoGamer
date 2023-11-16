import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import imagenLogo from '../../../public/logoWh.png'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ModalWindow } from '../pages/ModalWindow';

const DropDownMenu = ({ items, label }) => {
    const [isOpen, setIsOpen] = useState(false); // Añade esta línea para definir el estado

    return (
        <div className="dropdown" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <button className="dropbtn">{label}</button>
            {isOpen && (
                <div className="dropdown-content">
                    {items.map((item, index) => (
                        <NavLink to={item.path} key={index}>{item.label}</NavLink>
                    ))}
                </div>
            )}
        </div>
    );
};



export const BarNav = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const intercambioItems = [
        { label: 'Juegos', path: '/intercambio/juegos' },
        { label: 'Consolas', path: '/intercambio/consolas' },
        { label: 'Accesorios', path: '/intercambio/accesorios' },
        { label: 'Merchandising', path: '/intercambio/merchandising' },
    ];

    const segundaManoItems = [
        { label: 'Juegos', path: '/segunda-mano/juegos' },
        { label: 'Consolas', path: '/segunda-mano/consolas' },
        { label: 'Accesorios', path: '/segunda-mano/accesorios' },
        { label: 'Merchandising', path: '/segunda-mano/merchandising' },
    ];

    return (

        <div className="main__nav">
            <div className="main__nav_logo">
                <a href="index.html">
                    <img id="logo" src={imagenLogo} alt="Logo de NexoGamer" />
                </a>
            </div>

            <div className="nav-container main__nav_menu">
                <div className="buscador-container">
                    <div className="buscador-inner">
                        <form action="#" method="get">
                            <label htmlFor="buscador-select" className="visually-hidden">Categoría</label>
                            <select id="buscador-select" className="buscador-select">
                                <option value="opcion1">Todas las secciones</option>
                                <option value="opcion2">Intercambio</option>
                                <option value="opcion3">2ª Mano</option>
                                <option value="opcion4">Comunidad</option>
                                <option value="opcion5">Soporte</option>
                            </select>
                            <input type="text" className="buscador-input" placeholder="Buscar..." />
                            <button type="submit" className="buscador-button">
                                <i className="bi bi-search"></i>
                                <span className="visually-hidden">Buscar</span>
                            </button>
                        </form>
                    </div>
                </div>

                <nav className="navbar">
                    <div className='navbar-container'>
                        <NavLink to="/" className="nav-item">Inicio</NavLink>
                        <DropDownMenu items={intercambioItems} label="Intercambio" />
                        <DropDownMenu items={segundaManoItems} label="2ª Mano" />
                        <NavLink to="/soporte" className="nav-item">Soporte</NavLink>
                    </div>
                    <div className='login'>
                        <div className='login'>
                            <NavLink
                                to="/login"
                                className="nav-item"
                                onClick={(e) => {
                                    e.preventDefault();
                                    openModal();
                                }}
                            >
                                Iniciar Sesión
                            </NavLink>
                            <NavLink to="/registro" className="nav-item">Registrarse</NavLink>
                            <ModalWindow isOpen={isModalOpen} onClose={closeModal} />
                        </div>
                    </div>
                </nav>

            </div>
        </div>
    )
}

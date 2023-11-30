import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { ArticuloCard } from '../layout/ArticuloCard';


export const MisAnuncios = () => {
  const navigate = useNavigate();
  const [articulos, setArticulos] = useState([]);
  
  useEffect(() => {
     
      const idUsuario  = localStorage.getItem('id_usuario');
      console.log(idUsuario)

     
      fetch(`http://localhost:3000/api/articulos?userId=${idUsuario}`)
      .then(response => response.json())
      .then(data => setArticulos(data))
  }, []);

  const handleCrearAnuncio = () => {
      navigate('/FormularioAnuncio');
  };

  return (
    <div className="mis-anuncios">
        <h1>Mis anuncios</h1>
        <button onClick={handleCrearAnuncio} className='btn-create-anuncio'>Crear anuncio</button>
        <div>
            {articulos.map(articulo => (
                <ArticuloCard key={articulo.id} articulo={articulo} /*onVerDetalles={handleVerDetalles}*/ />
            ))}
        </div>

    </div>
  )
}

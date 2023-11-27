import React from 'react'

export const ArticuloCard = ({articulo, onVerDetalles}) => {
  return (
    <div className='articulo-card'>
        <h3>{articulo.nombre}</h3>
        <img src={articulo.imagen} alt={articulo.nombre}/>
        <p>Plataforma : {articulo.plataforma}</p>
        <p>Precio: {articulo.precio}€</p>
        <button onClick={() => onVerDetalles(articulo.id)}>Ver Detalles</button>
    </div>
  )
}

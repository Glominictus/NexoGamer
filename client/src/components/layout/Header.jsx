import React from 'react';
import imagenCorp from '../../assets/images/imagenCorp.png';

export const Header = () => {
    return (
        <>
            <header className="header">
                <div className="cabecera">
                    <div id="img_cabecera">
                        <img src={imagenCorp} alt="NexoGamer" />
                    </div>
                    <div className="cabecera-content">
                        <h1>Descubre un mundo de posibilidades <br />gaming en NexoGamer</h1>
                        <button className="join-button"><a href="registro.html">Unirse ahora</a></button>
                    </div>
                </div>
            </header>
        </>
    )
}

import React, { useState, useEffect } from 'react'




export const FormularioAnuncio = () => {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [plataforma, setPlataforma] = useState([]);
    const [genero, setGenero] = useState([]);
    const [tipoAnuncio, setTipoAnuncio] = useState("");
    const [plataformaSeleccionada, setPlataformaSeleccionada] = useState(null);
    const [generoSeleccionado, setGeneroSeleccionado] = useState(null);
    

    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/categorias/');
                const data = await response.json();
                console.log(data); // Depuración para ver la estructura de datos
                setCategorias(data); // Asegúrate de que 'data' es un arreglo
            } catch (error) {
                console.error("Error al cargar categorías: ", error);
            }
        };
        cargarCategorias();
    }, []);

    useEffect(() => {
        const cargarPlataforma = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/plataformas/');
                const data = await response.json();
                console.log(data); // Depuración para ver la estructura de datos
                setPlataforma(data); // Asegúrate de que 'data' es un arreglo
            } catch (error) {
                console.error("Error al cargar categorías: ", error);
            }
        };
        cargarPlataforma();
    }, []);
    useEffect(() => {
        const cargarGenero = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/generos/');
                const data = await response.json();
                console.log(data); // Depuración para ver la estructura de datos
                setGenero(data); // Asegúrate de que 'data' es un arreglo
            } catch (error) {
                console.error("Error al cargar categorías: ", error);
            }
        };
        cargarGenero();
    }, []);


    const tiposAnuncio = ["venta", "intercambio"];
    const handleCategoriaChange = (e) => {
        const nombreSeleccionado = e.target.value;
        const categoriaCorrespondiente = categorias.find(categoria => categoria.nombre === nombreSeleccionado);
        if (categoriaCorrespondiente) {
            setCategoriaSeleccionada(categoriaCorrespondiente.id_categoria);
            console.log('ID de la categoría seleccionada:', categoriaCorrespondiente.id_categoria);
        } else {
            console.error('No se encontró una categoría con ese nombre');
        }
    };
    const handlePlataformaChange = (e) => {
        // Almacenar el valor numérico del ID de la plataforma
        const nombreSeleccionado = e.target.value
        const plataformaCorrespondiente = plataforma.find(plataforma => plataforma.nombre === nombreSeleccionado);
        if (plataformaCorrespondiente) {
            setPlataformaSeleccionada(plataformaCorrespondiente.id_plataforma)
            console.log('ID de la plataforma seleccionada:', plataformaCorrespondiente.id_plataforma)
        } else {
            console.error('No se encontró una plataforma con ese nombre');
        }
    };
    const handleGeneroChange = (e) => {
        const nombreSeleccionado = e.target.value
        const generoCorrespondiente = genero.find(genero => genero.nombre === nombreSeleccionado);
        if (generoCorrespondiente) {
            setGeneroSeleccionado(generoCorrespondiente.id_genero)
            console.log('ID del genero seleccionado:', generoCorrespondiente.id_genero)
        } else {
            console.error('No se encontró un genero con ese nombre');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Paso 1: Recoger datos del formulario
        const nombre = document.querySelector('input[name="nombre"]').value;
        const descripcion = document.querySelector('textarea[name="descripcion"]').value;
        const precio = tipoAnuncio === 'venta' ? document.querySelector('input[name="precio"]').value : 0
        const interes = tipoAnuncio === 'intercambio' ? document.querySelector('textarea[name="interes"]').value : null;
        const imagen = document.querySelector('input[name="imagen"]').files[0];
        const idUsuario = localStorage.getItem('id_usuario');
        const fechaActual = new Date().toISOString();

        // Paso 2: Procesar imágenes
        let imageUrl = '';
        if (imagen) {
            const imageForm = new FormData();
            imageForm.append('image', imagen);
            const imageResponse = await fetch('https://api.imgbb.com/1/upload?key=949b24ffb477062f170dac82ba1186ca', {
                method: 'POST',
                body: imageForm
            });
            const imageData = await imageResponse.json();
            imageUrl = imageData.data.url;
        }
        const idCategoria = parseInt(categoriaSeleccionada);
        const idPlataforma = parseInt(plataformaSeleccionada);
        const idGenero = generoSeleccionado ? parseInt(generoSeleccionado) : undefined;


        if (isNaN(idCategoria) || isNaN(idPlataforma) ||  (generoSeleccionado && isNaN(idGenero))) {
            console.error('ID de categoría o plataforma no válido o género no valido');
            return;
        }

        // Paso 3: Preparar datos para el envío
        const articuloData = {
            nombre,
            descripcion,
            precio,
            interes,
            id_categoria: idCategoria,
            id_plataforma: idPlataforma,
            tipo: tipoAnuncio,
            imagenes: imageUrl,
            id_usuario: parseInt(idUsuario),
            fecha_publicacion: fechaActual
        };
        if (idGenero) {
            articuloData.id_genero = idGenero;
        }
        console.log('Datos que se enviarán:', articuloData);


        // Paso 4: Enviar datos al servidor
        const response = await fetch('http://localhost:3000/api/articulos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articuloData)
        });

        // Paso 5: Manejar la respuesta
        if (response.ok) {
            const responseData = await response.json();
            console.log('Artículo creado con éxito:', responseData);
            // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        } else {
            console.error('Error al crear el artículo:', await response.text());
            // Mostrar un mensaje de error al usuario
        }
    };


    return (
        <div>
            <h1 className='new-anuncio-tittle'>Nuevo Anuncio</h1>
            <div className='form-container'>
                <form>
                    <div className='radio-group'>
                        <label htmlFor="tipoAnuncio">Tipo de anuncio:</label>
                        <br />
                        {tiposAnuncio.map((tipo) => (
                            <label key={tipo}>
                                <input
                                    type="radio"
                                    value={tipo}
                                    name="tipoAnuncio"
                                    onChange={(e) => setTipoAnuncio(e.target.value)}
                                />
                                {tipo}
                            </label>
                        ))}
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoria">Categoría:</label>
                        <select name="categoria" onChange={handleCategoriaChange}>
                            <option value="" disabled selected>Elige la categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="plataforma">Plataforma:</label>
                        <select name="plataforma" onChange={handlePlataformaChange}>
                            <option value="" disabled selected>Elige la plataforma</option>
                            {plataforma.map((plataforma) => (
                                <option key={plataforma.id} value={plataforma.id}>
                                    {plataforma.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        {categoriaSeleccionada === 1 && (
                            <>
                                <label htmlFor="genero">Género:</label>
                                <select name="genero" id="genero"  onChange={handleGeneroChange} >
                                    <option value="" disabled selected>Elige el género</option>
                                    {genero.map((genero) => (
                                        <option key={genero.id} value={genero.id}>
                                            {genero.nombre}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='nombre'>Nombre</label>
                        <input type='text' name='nombre' /* onChange={...} */ />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripcion:</label>
                        <textarea name="descripcion" /* onChange={...} */></textarea>
                    </div>
                    <div className="form-group precio">
                        {tipoAnuncio === "venta" && (
                            <>
                                <label htmlFor="precio">Precio:</label>
                                <div className="input-group">
                                    <input className="form-control precio-input" type="text" name="precio" id="precio" /* onChange={...} */ />
                                    <span className="input-group-addon moneda">€</span>
                                </div>
                            </>
                        )}
                        {tipoAnuncio === "intercambio" && (
                            <>
                                <label htmlFor="interes">Me interesa:</label>
                                <textarea className='interes-area' name="interes" /* onChange={...} */></textarea>
                            </>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor='imagen'>Imagenes:</label>
                        <input type="file" name="imagen" /* onChange={...} */ multiple />
                    </div>
                    <div className='form-group'>
                        <button type="submit" onClick={handleSubmit}>Enviar Anuncio</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

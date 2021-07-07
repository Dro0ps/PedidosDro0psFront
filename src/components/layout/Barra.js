import React, {useContext, Fragment, useEffect} from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import { Link } from 'react-router-dom';


const Barra = () => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion  } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);



    return ( 
        <Fragment>
       <header className="app-header">
            
            {usuario ? <p className="nombre-usuario" >Hola <span>{usuario.nombre} </span> </p> : null}

            <nav className="nav-principal">
            <Link to={'/pagos'} className="">
                    Registro de Pagos
                </Link>
            </nav>
            <nav className="nav-principal">
            <Link to={'/pedidos'} className="">
                    Registro de Pedidos
                </Link>
            </nav>
            
            <nav className="nav-principal"><Link to={'/edita'} className="">Editar Pedidos</Link></nav>

            <nav className="nav-principal">
                <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerrarSesion() }
                >Cerrar Sesión</button>
            </nav>
        </header>
     
        </Fragment>
     );
}
 
export default Barra;
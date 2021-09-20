import React, {useContext, Fragment, useEffect} from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';


const Nav = styled.nav`
    padding-left: 2rem;


    a{
        font-size: 1.8rem;
        margin-right: 2rem;
        color: #e1e1e1;
        font-family: 'PT Sans', sans-serif;

        &:last-of-type{
            margin-right: 0;
        }
    }


`;



const Barra = () => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion  } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);


    return ( 

        <header className="app-header"
            css={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
            
            `}
        >

    {usuario ? <p className="nombre-usuario" ><spam>{usuario.nombre} </spam></p> : null}


            <Nav>

            

                {/* {usuario.tipo!==('bodega') ? 
                    <Link to={'/pagos'} className=""><a>Registro de Pagos</a></Link>
                : null} */}

                {/* {usuario.tipo!==('bodega') ? 
                    <Link to={'/edita'} className=""><a>Editar Pedidos</a></Link>
                : null} */}

            <a><Link to={'/pedidos/user'} >Tus Pedidos</Link></a>

            <a><Link to={'/pedidos'} >Registro de Pedidos</Link></a>
                
            </Nav>

        <button 
            className="btn btn-blank cerrar-sesion"
            onClick={() => cerrarSesion() }
        >Cerrar Sesión</button>

            
        </header>


    );
}
 
export default Barra;
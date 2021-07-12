import React, { useContext, useEffect, Fragment } from 'react';
import Barra from '../layout/Barra';
import NuevoPedido from '../pedidos/NuevoPedido';
import RegistroPedidos from '../tablas/RegistroPedidos';
import AuthContext from '../../context/autenticacion/authContext';
import VistaPedido from './VistaPedido';


const Pedidos = () => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

     

    return ( 
       <Fragment>
           
           <Barra/>
           {/* <Imagen/> */}
           <h1 className="margen-top">HOMAR <span>Pedidos</span></h1>

           {(usuario.tipo !== ('bodega')) ? 
               <NuevoPedido />
           : null }
           
           <div className="margen-top"><VistaPedido/></div>
           
           <RegistroPedidos/>
            
     </Fragment>
     );
}
 
export default Pedidos;
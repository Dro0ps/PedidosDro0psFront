import React, { useContext, useEffect, Fragment } from 'react';
import Barra from '../layout/Barra';
import NuevoPedido from './NuevoPedido';
import RegistroPedidosUser from '../tablas/RegistroPedidosUser';
import AuthContext from '../../context/autenticacion/authContext';
import VistaPedido from './VistaPedido';


const PedidosUsuario = () => {

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
           

           {(usuario.tipo !== ('bodega')) ? 
               <NuevoPedido />
           : null }
           
           <div className="margen-top"><VistaPedido/></div>
           
           <RegistroPedidosUser/>
            
     </Fragment>
     );
}
 
export default PedidosUsuario;
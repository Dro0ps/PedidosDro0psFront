import React, { useContext, useEffect } from 'react';
import Barra from '../layout/Barra';
import NuevoPedido from './NuevoPedido';
import RegistroPedidos from '../tablas/RegistroPedidos';
import RegistroPedidosUser from '../tablas/RegistroPedidosUser';
import AuthContext from '../../context/autenticacion/authContext';
import VistaPedido from './VistaPedido';
import NuevoPedidoBas from './NuevoPedidoBas';


const PedidosUsuario = () => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

     

    return ( 
       <>
           
           <Barra/>
           {/* <Imagen/> */}
           

           {(usuario.tipo !== ('bodega')) ? 
               <NuevoPedido />
           : null }


           {(usuario.tipo === ('bodega')) ? 
               <NuevoPedidoBas />
           : null }
           
           <div className="margen-top"><VistaPedido/></div>
           
           {(usuario.tipo === ('ventas')) ? 
             <RegistroPedidosUser/>
               
           : <RegistroPedidos/> }
            
     </>
     );
}
 
export default PedidosUsuario;
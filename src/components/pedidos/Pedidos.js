import React, { useContext, useEffect } from 'react';
import Barra from '../layout/Barra';
import NuevoPedido from '../pedidos/NuevoPedido';
import RegistroPedidos from '../tablas/RegistroPedidos';
import RegistroPedidosUser from '../tablas/RegistroPedidosUser';
import AuthContext from '../../context/autenticacion/authContext';
import VistaPedido from './VistaPedido';
import NuevoPedidoBas from './NuevoPedidoBas';


const Pedidos = () => {

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
           
           {(usuario.tipo === ('bodega')) ? 

           <div className="container-fluid"><RegistroPedidosUser /></div>
             
               
           : <div className="container-fluid"><RegistroPedidos className="container"/></div> }
            
     </>
     );
}
 
export default Pedidos;
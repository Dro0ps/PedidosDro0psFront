import React, {Fragment, useState} from 'react';

import VistaEdicion from './VistaEdicion';
import Barra from '../../layout/Barra';
import RegistroPedidos from '../../tablas/RegistroPedidos';





const EditarPedido = () => {


    return ( 
        <Fragment>
            <Barra/>
            {/* <Sidebar/> */}
            <div className=" margen-top"><VistaEdicion/></div>
            
            <RegistroPedidos/>



        </Fragment>
    
    );
}
 
export default EditarPedido;
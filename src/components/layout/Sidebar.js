import React from 'react';
import NuevoPedido from '../pedidos/NuevoPedido';
import ListadoPedidos from '../pedidos/ListadoPedidos';
import Tabla from '../tablas/Tabla';


const Sidebar = () => {
    return ( 
        <aside>
            <h1>HOMAR <span>Pedidos</span></h1>

            <NuevoPedido />
            
            
                <Tabla/>
           
        </aside>
    );
}
 
export default Sidebar;
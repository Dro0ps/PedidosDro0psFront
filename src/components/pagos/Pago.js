import React, { Fragment, useContext, useState } from 'react';


import pagoContext from '../../context/pagos/pagoContext';


const Pago = ({pago}) => {
    // Obtener el state de pedidos
    const pagosContext = useContext(pagoContext);
    const {} = pagosContext; 


    return (  
        <Fragment>
        <div className="row">
            <div className="col-md-6">
                <div className="disflex "><h3>{pago.num_pedido_pago}</h3></div>
                <div className="disflex"><span className="t4">Nombre del Cliente:</span><span>{pago.nombre_cliente}</span></div>
                {/* <div className="disflex"><span className="t4">Barras:</span><input type="number" name="pago.sku" value={pago.sku} readOnly/></div> */}
                <div className="disflex"><span className="t4">Monto:</span><span>{pago.monto_pedido}</span></div>
                <div className="disflex"><span className="t4">Medio de Pago:</span><span>{pago.medio_pago}</span></div>
                <div className="disflex"><span className="t4">Banco:</span><span>{pago.banco}</span></div>
                <div className="disflex"><span className="t4">Tipo de Documento:</span><span>{pago.tipo_documento}</span></div>
                

            </div>
            
        </div>

        
        </Fragment>
     );
}
 
export default Pago;
import React, { Fragment, useContext } from 'react';
import Swal from 'sweetalert2';
import AuthContext from '../../context/autenticacion/authContext';
import pedidoContext from '../../context/pedidos/pedidoContext';
import FormTarea from '../tareas/FormTarea';




/* import tareaContext from '../../context/tareas/tareaContext'; */

const Pedido = ({pedido}) => {
    // Obtener el state de pedidos
    const pedidosContext = useContext(pedidoContext);
    const {elegirPedido, actualizarPedido } = pedidosContext;

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario } = authContext;

    


    
    // Función que modifica el estado del pedido Embalado
    const cambiarEstadoConfirmado = pedido => {

        if(pedido.confirma_pago){
            Swal.fire('Los Estados una vez Confirmados no Pueden ser Editados')
        } else {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "Quieres Cambiar el Estado de este Pedido a Confirmado? Los Estados una vez Confirmados no Pueden ser Editados",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Comfirmar',
                cancelButtonText : 'No, Cancelar'
            }).then((result) => { 
                
                if(result.value) {
                    if(!pedido.confirma_pago) {
                        pedido.confirma_pago = true;
                    }/*  else {
                        pedido.confirma_pago = true
                    } */
                    actualizarPedido(pedido);
    
            }
        })

        }

        
        
    }
    // Función que modifica el estado del pedido Embalado
    const cambiarEstado = pedido => {

        if(pedido.estado_pedido){
            Swal.fire('Los Estados una vez Confirmados no Pueden ser Editados')
        } else {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "Quieres Cambiar el Estado de este Pedido a Embalado? Los Estados una vez Confirmados no Pueden ser Editados",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Comfirmar',
                cancelButtonText : 'No, Cancelar'
            }).then((result) => { 
                
                if(result.value) {
                    if(!pedido.estado_pedido) {
                        pedido.estado_pedido = true;
                    }/*  else {
                        pedido.estado_pedido = true
                    } */
                    actualizarPedido(pedido);
    
            }
        })

        }
        
    }


    // Función que modifica el estado del Pedido Despachado
    const cambiarEstadoDespacho = pedido => {
        if(pedido.estado_despacho){
            Swal.fire('Los Estados una vez Confirmados no Pueden ser Editados')
        } else {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "Quieres Cambiar el Estado a Despachado? Los Estados una vez Confirmados no Pueden ser Editados",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Comfirmar',
                cancelButtonText : 'No, Cancelar'
            }).then((result) => { 
                
                if(result.value) {
                    if(!pedido.estado_despacho) {
                        pedido.estado_despacho = true;
                    }/*  else {
                        pedido.estado_despacho = true
                    } */
                    actualizarPedido(pedido);
    
            }
        })

        }
    }


    return (  
        <Fragment>
        <div className="row">
            <div className="col-md-6">
                <div className="disflex "><h3>Numero de pedido:</h3><span>{pedido.num_pedido}</span></div>
                <div className="disflex"><span className="t4">Nombre del cliente:</span><span>{pedido.nombre_cliente}</span></div>
                <div className="disflex"><span className="t4">Monto del pedido:</span><span>{pedido.monto_pedido}</span></div>
                <div className="disflex"><span className="t4">Medio de pago:</span><span>{pedido.medio_pago}</span></div>

                
                
            </div>
            <div className="col-md-6">
                <div className="disflex"><span className="t4">Banco:</span><span>{pedido.banco}</span></div>
                <div className="disflex"><span className="t4">Fecha de deposito:</span><span>{pedido.fecha_deposito}</span></div>
                <div className="disflex"><span className="t4">Tipo de documento:</span><span>{pedido.tipo_documento}</span></div>
                
 
            </div>

        </div>


        <div className=" row pad-up ">
        <div className="col-md-4">
                <div className="disflex"><span className="t4 ">Confirmación de Pago:</span>

                {/*//////////////// CONFIRMACIÓN ////////////////*/}
                {  (usuario.tipo==='supervisor')
                    ?
                    <div className="estado">
                    {pedido.confirma_pago 
                    ?  
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstadoConfirmado(pedido)}
                            >CONFIRMADO</button>
                        )
                    : 
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstadoConfirmado(pedido)}
                            >SIN CONFIRMAR</button>
                        )
                    }
                    </div>


                    :

                    <div className="estado">
                    {pedido.confirma_pago 
                    ?  
                        (
                            <button
                                type="button"
                                className="completo"
                                /* onClick={() => cambiarEstadoConfirmado(pedido)} */
                            >CONFIRMADO</button>
                        )
                    : 
                        (
                            <button
                                type="button"
                                className="incompleto"
                                /* onClick={() => cambiarEstadoConfirmado(pedido)} */
                            >SIN CONFIRMAR</button>
                        )
                    }
                    </div>


                }
                    
                   
                
                
                </div>
            </div>

            <div className="col-md-4">
                <div className="disflex"><span className="t4">Estado de Embalaje:</span>
                    

                {/*//////////////// EMBALAJE ////////////////*/}

                {  (usuario.tipo==='bodega')
                    ?
                    <div className="estado">
                    {pedido.estado_pedido 
                    ?  
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstado(pedido)}
                            >EMBALADO</button>
                        )
                    : 
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstado(pedido)}
                            >SIN EMBALAR</button>
                        )
                    }
                    </div>

                    :


                    <div className="estado">
                    {pedido.estado_pedido 
                    ?  
                        (
                            <button
                                type="button"
                                className="completo"
                                /* onClick={() => cambiarEstado(pedido)} */
                            >EMBALADO</button>
                        )
                    : 
                        (
                            <button
                                type="button"
                                className="incompleto"
                                /* onClick={() => cambiarEstado(pedido)} */
                            >SIN EMBALAR</button>
                        )
                    }
                    </div>



                }
                
                </div>
            </div>


                {/* //////////////////// CAMBIAR ESTADO DESPACHO ////////////////// */}


                {  (usuario.tipo === ('bodega' || 'supervisor'))

                 ?

            <div className="col-md-4">
                <div className="disflex"><span className="t4">Entrega del Pedido:</span>
                    
                    <div className="estado">
                    {pedido.estado_despacho 
                    ?  
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstadoDespacho(pedido)}
                            >ENTREGADO</button>
                        )
                    : 
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstadoDespacho(pedido)}
                            >PENDIENTE POR ENTREGA</button>
                        )
                    }
                    </div>
                
                </div>
            </div>

            :

            <div className="col-md-3">
            <div className="disflex"><span className="t4">Entrega del Pedido:</span>
                
                <div className="estado">
                {pedido.estado_despacho 
                ?  
                    (
                        <button
                            type="button"
                            className="completo"
                            /* onClick={() => cambiarEstadoDespacho(pedido)} */
                        >ENTREGADO</button>
                    )
                : 
                    (
                        <button
                            type="button"
                            className="incompleto"
                            /* onClick={() => cambiarEstadoDespacho(pedido)} */
                        >PENDIENTE POR ENTREGA</button>
                    )
                }
                </div>
            
            </div>
            </div>

                }









        </div>
        <FormTarea/>
        </Fragment>
     );
}
 
export default Pedido;
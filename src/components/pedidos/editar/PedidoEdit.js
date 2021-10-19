import React, { Fragment, useContext } from 'react';
import pedidoContext from '../../../context/pedidos/pedidoContext';
import FormTarea from '../../tareas/FormTarea';
import Swal from 'sweetalert2';
import moment from 'moment';



/* import tareaContext from '../../context/tareas/tareaContext'; */

const PedidoEdit = ({pedido}) => {
    // Obtener el state de pedidos
    const pedidosContext = useContext(pedidoContext);
    const { actualizarPedido, eliminarPedido } = pedidosContext;

    // obtener la función del context de tarea
   /*  const tareasContext = useContext(tareaContext); */
    /* const { obtenerTareas } = tareasContext; */


        // Función que modifica el estado del pedido Embalado
        const cambiarEstadoConfirmado = pedido => {

            if(pedido.confirma_pago){
                Swal.fire('Los Pedidos Confirmados no Pueden ser Editados')
            } else {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: "Quieres Cambiar el Estado de este Pedido a Confirmado?",
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
                Swal.fire('Los Pedidos Confirmados no Pueden ser Editados')
            } else {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: "Quieres Cambiar el Estado de este Pedido a Confirmado?",
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
                Swal.fire('Los Pedidos Confirmados no Pueden ser Editados')
            } else {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: "Quieres Cambiar el Estado de este Pedido a Confirmado?",
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


    const onClickEliminar = () => {

        
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un producto eliminado no se puede recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText : 'No, Cancelar'
        }).then((result) => { 
            console.log(result.value);
            if(result.value) {
            // eliminar en la rest api
              eliminarPedido(pedido._id)

        }
    })    
    }

   /*  const [ edicionIndentificador, guardarEdicionIndentificador ] = useState({
        num_transaccion: ''
        
    });

    const [ edicionFecha, guardarEdicionFecha ] = useState({

        fecha_confirmacion: pedido.fecha_deposito
    });

    const { num_transaccion} = edicionIndentificador;
    const { fecha_confirmacion } = edicionFecha;


    const onChangeIdentificador = e => {
        guardarEdicionIndentificador({
            ...pedido,
            [e.target.name] : e.target.value
        })
    }

    const onChangeFecha = e => {
        guardarEdicionFecha({
            ...pedido,
            [e.target.name] : e.target.value
        })
    }

   

    const submitEditarFecha = e => {
        e.preventDefault();
        

        actualizarPedido(edicionFecha);
    }


    const submitEditarIdentificador = e => {
        e.preventDefault();
        

        actualizarPedido(edicionIndentificador);
    } */



    return (  
        <Fragment>
            
        <div className="row">
            <div className="col-md-6">
                {/* <div className="disflex "><h3>Numero de pedido:</h3><span>{pedido.num_pedido}</span></div> */}
                <div className="disflex"><span className="t4">Nombre del Cliente:</span><span>{pedido.nombre_cliente}</span></div>
                <div className="disflex"><span className="t4">Monto del Pedido:</span><span>{pedido.monto_pedido}</span></div>
                <div className="disflex"><span className="t4">Medio de Pago:</span><span>{pedido.medio_pago}</span></div>
                <div className="disflex"><span className="t4">Banco:</span><span>{pedido.banco}</span></div>
                <div className="disflex"><span className="t4">Fecha de Deposito:</span><span>{pedido.fecha_deposito}</span></div>
                <div className="disflex"><span className="t4">{pedido.tipo_documento}:</span><span>{pedido.num_documento}</span></div>
                {
                    (pedido.estado_pedido) && 
                    <div><a href={pedido.doc_archivo} ><button type="button" className="btn btn-link">Descargar {pedido.tipo_documento}</button></a></div>
                }
                
                
            </div>
            <div className="col-md-6">
                
                <div className="disflex"><span className="t4">Confirmado Por:</span><span>{pedido.confirmado_por}</span></div>

                <div className="disflex">

                    {/* <form
                        className="border border-dark"
                        onSubmit={submitEditarIdentificador}
                    >
                    <span className="t4">N°Identificador:</span>
                    <input
                      type="text"
                      className="form-control"
                      name="num_transaccion"
                      value={num_transaccion}
                      placeholder={pedido.num_transaccion}
                      onChange={onChangeIdentificador}
                      
                    />

                    <input
                        type="submit"
                        value= "Editar identificador"
                        className="btn  btn-block"
                    />

                    </form>
                    <form
                        className="border border-dark"
                        onSubmit={submitEditarFecha}
                    >
                    
                    <span className="t4">fecha_confirmacion:</span>
                    <input
                      type="text"
                      className="form-control"
                      name="fecha_confirmacion"
                      value={fecha_confirmacion}
                      
                      onChange={onChangeFecha}
                      
                    />

                    <input
                        type="submit"
                        value= "Editar fecha"
                        className="btn  btn-block"
                    />

                    

                    </form>
 */}
                </div>


                <div className="disflex"><span className="t4">Fecha de Confirmación:</span><span>{moment(pedido.fecha_confirmacion).format('MMMM Do YYYY, h:mm:ss a')}</span></div>
                <div className="disflex"><span className="t4">Numero de Transacción:</span><span>{pedido.num_transaccion}</span></div>
                <div className="disflex"><span className="t4">Entregado Por:</span><span>{pedido.lugar_entrega}</span></div>
                <div className="disflex"><span className="t4">Fecha de Entrega:</span><span>{moment(pedido.fecha_entrega).format('MMMM Do YYYY, h:mm:ss a')}</span></div>
                <div className="disflex"><span className="t4">Bultos:</span><span>{pedido.bultos}</span></div>
                <div><a href={pedido.archivo} ><button type="button" className="btn btn-link">Descargar Pedido</button></a></div>
                
                
 
            </div>

            
        </div>


        <div className="row">

            <div className="col-md-3">
                <div className="disflex"><span className="t4 ">Confirmación de Pago:</span>
                    
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
                
                </div>
            </div>

            <div className="col-md-3">
                <div className="disflex"><span className="t4">Estado de Embalaje:</span>
                    
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
                
                </div>
            </div>

            <div className="col-md-3">
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

            <div className="col-md-3">
            <button     
                    type="button"
                    className="btn btn-eliminar"
                    onClick={onClickEliminar}
                >Eliminar Pedido &times;</button>
            </div>
            

        </div>
                
                
        <FormTarea/>
        </Fragment>
     );
}
 
export default PedidoEdit;
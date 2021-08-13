import React, { Fragment, useContext } from 'react';
import Swal from 'sweetalert2';
import AuthContext from '../../context/autenticacion/authContext';
import pedidoContext from '../../context/pedidos/pedidoContext';
import FormTarea from '../tareas/FormTarea';
import moment from 'moment';




/* import tareaContext from '../../context/tareas/tareaContext'; */

const Pedido = ({pedido}) => {
    // Obtener el state de pedidos
    const pedidosContext = useContext(pedidoContext);
    const {elegirPedido, actualizarPedido } = pedidosContext;

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario } = authContext;


    /////////// FUNCIONES /////////////

    
    // ASIGNACÓN DE FECHA AUTOMATICO
    moment.locale();
    let fechaConfirmación = moment().format('LLL');
    
    const obtenerNumeroConfirmacion = async () => {
                        
        const { value: text } = await  Swal.fire({
            input: 'text',
            inputLabel: 'NUMERO DE CONFIRMACIÓN',
            inputPlaceholder: 'Ingrese el Rut de la Transferencia',
            inputAttributes: {
              'aria-label': 'Type your message here'
            },
            showCancelButton: true
          })
          
          if (text) {
            Swal.fire(`El pago se ha guardado con el identificador ${text}`)
            pedido.confirma_pago = true;
            pedido.num_transaccion = text;
            pedido.confirmado_por= usuario.nombre;
            pedido.fecha_confirmacion= fechaConfirmación;

            actualizarPedido(pedido);
          } 

    }

    const obtenerDocumento = async () => {
                        
        const { value: text } = await  Swal.fire({
            input: 'text',
            inputLabel: '# de Factura / Boleta',
            inputPlaceholder: 'Ingrese el Numero del Documento de Venta',
            inputAttributes: {
              'aria-label': 'Type your message here'
            },
            showCancelButton: true
          })
          
          if (text) {
            Swal.fire(`El numero de Documento ingresado es el ${text}`)
            pedido.estado_pedido = true;
            pedido.num_documento = text;

            actualizarPedido(pedido);
          } 

    }

    const obtenerFechaEntrega = async () => {

        const inputOptions = new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                'Bascuñan': 'Bascuñan',
                'Transporte': 'Transporte',
                'Salvador': 'Salvador'
              })
            }, 1000)
          })
          const { value: tipo_entrega } = await Swal.fire({
            title: 'Seleccione el tipo de entrega',
            input: 'radio',
            inputOptions: inputOptions,
            inputValidator: (value) => {
              if (!value) {
                return 'Es Necesario Seleccionar una Opción'
              }

              
            }
          })
          
          if (tipo_entrega) {
            Swal.fire({ html: `Tipo de entrega: ${tipo_entrega}` })

            const { value: text } = await  Swal.fire({
                input: 'text',
                inputLabel: 'Ingrese la Fecha de Entrega',
                inputPlaceholder: 'Dia/Mes/Año',
                inputAttributes: {
                  'aria-label': 'Type your message here'
                },
                showCancelButton: true
              })
            const { value: cantidad_bultos } = await  Swal.fire({
                input: 'number',
                inputLabel: 'Ingrese la Cantidad de Bultos',
                /* inputAttributes: {
                  'aria-label': 'Type your message here'
                }, */
                showCancelButton: true
              })
              
              if (text && cantidad_bultos) {
                Swal.fire(`Se Entrego en ${tipo_entrega} el Dia ${text} con ${cantidad_bultos} Bultos`)
                pedido.estado_despacho = true;
                pedido.fecha_entrega = text;
                pedido.lugar_entrega = tipo_entrega;
                pedido.bultos = cantidad_bultos;
                
    

    
                actualizarPedido(pedido);
                
              } 
            
          }
          
         
                        
        

    }

    
    // Función que modifica el estado del pedido Embalado
    const cambiarEstadoConfirmado =  pedido => {

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

                    obtenerNumeroConfirmacion();

                   

                     /*  if(!pedido.confirma_pago) {
                        pedido.confirma_pago = true;
                      }
                    actualizarPedido(pedido); */

                   
            }
        })

        }

       
        
    }
    // Función que modifica el estado del pedido Embalado
    const cambiarEstado = pedido => {

        if(pedido.estado_pedido){
            Swal.fire('Los Estados una vez Confirmados no Pueden ser Editados')
        } else if (pedido.confirma_pago) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "Quieres Cambiar el Estado de este Pedido a Facturado? Una vez confirmada la factura no puede ser Editada",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Comfirmar',
                cancelButtonText : 'No, Cancelar'
            }).then((result) => { 

                
                
                if(result.value) {

                    obtenerDocumento();
    
            }
        })

        } else {
            Swal.fire('El Pedido debe estar Confirmado para poder a Facturarlo')
        }

           
        
    }


    // Función que modifica el estado del Pedido Despachado
    const cambiarEstadoDespacho = pedido => {
        if(pedido.estado_despacho){
            Swal.fire('Los Estados una vez Confirmados no Pueden ser Editados')
        } else if(pedido.estado_pedido) {
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
                    obtenerFechaEntrega();
    
            }
        })
        } else {
            Swal.fire('El Pedido debe estar Facturado para poder a Despacharlo')
        }

        
    }




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

                
                
            </div>
            <div className="col-md-6">
                
                <div className="disflex"><span className="t4">Confirmado Por:</span><span>{pedido.confirmado_por}</span></div>
                <div className="disflex"><span className="t4">Fecha de Confirmación:</span><span>{pedido.fecha_confirmacion}</span></div>
                <div className="disflex"><span className="t4">Numero de Transacción:</span><span>{pedido.num_transaccion}</span></div>
                <div className="disflex"><span className="t4">Entregado Por:</span><span>{pedido.lugar_entrega}</span></div>
                <div className="disflex"><span className="t4">Fecha de Entrega:</span><span>{pedido.fecha_entrega}</span></div>
                <div className="disflex"><span className="t4">Bultos:</span><span>{pedido.bultos}</span></div>
                <div><a href={pedido.archivo} target="_blank"><button type="button" className="btn btn-link">Descargar PDF</button></a></div>
                
 
            </div>

        </div>


        <div className=" row pad-up ">
        <div className="col-md-4">
                <div className="disflex"><span className="t4 ">Confirmación de Pago:</span>

                {/*//////////////// CONFIRMACIÓN ////////////////*/}
                {  (usuario.tipo===('supervisor'))
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
                <div className="disflex"><span className="t4">Estado del pedido:</span>
                    

                {/*//////////////// FACTURADO ////////////////*/}

                

                {  (usuario.tipo==='ventas')
                    ?
                    <div className="estado">
                    {pedido.estado_pedido 
                    ?  
                        (
                            <button
                                type="button"
                                className="completo"
                                
                                onClick={() => cambiarEstado(pedido)}
                            >FACTURADO</button>
                        )
                    : 
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstado(pedido)}
                            >SIN FACTURAR</button>
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
                            >FACTURADO</button>
                        )
                    : 
                        (
                            <button
                                type="button"
                                className="incompleto"
                                /* onClick={() => cambiarEstado(pedido)} */
                            >SIN FACTURAR</button>
                        )
                    }
                    </div>



                }
                
                </div>
            </div>


                {/* //////////////////// CAMBIAR ESTADO DESPACHO ////////////////// */}


                {  (usuario.tipo === 'ventas')

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
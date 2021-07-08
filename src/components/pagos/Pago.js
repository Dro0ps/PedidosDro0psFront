import moment from 'moment';
import React, { Fragment, useContext, useState } from 'react';
import Swal from 'sweetalert2';
import AuthContext from '../../context/autenticacion/authContext';
import pagoContext from '../../context/pagos/pagoContext';




const Pago = ({pago}) => {

    // ASIGNACÓN DE FECHA AUTOMATICO
    moment.locale();
    let fechaConfirmación = moment().format('LLL');

    // Obtener el state de pedidos
    const pagosContext = useContext(pagoContext);
    const { actualizarPago } = pagosContext; 


    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario } = authContext;

    let asignarUsuario = () => {
        pago.confirmado_por= usuario.nombre;

    }

    let fechaConfirmada = () => {
        pago.fecha_confirmacion= fechaConfirmación;

    }






    // Función que modifica el estado del pago 
    const cambiarEstadoConfirmado = pago => {

        if(pago.confirma_pago){
            Swal.fire('Los Estados una vez Confirmados no Pueden ser Editados')
        } else {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "Quieres Cambiar el Estado de este Pedido a Confirmado? Los Estados una vez Confirmados no Pueden ser Editados",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Confirmar',
                cancelButtonText : 'No, Cancelar'
            }).then((result) => { 
                
                if(result.value) {
                    if(!pago.confirma_pago) {
                        pago.confirma_pago = true;
                        
                        
                    }/*  else {
                        pago.confirma_pago = true
                    } */
                    actualizarPago(pago);
                    asignarUsuario();
                    fechaConfirmada();
    
            }
        })

        }

        
        
    }


    return (  
        <Fragment>
        <div className="row">
            <div className="col-md-4">
                <div className="disflex "><h3>{pago.num_pedido_pago}</h3></div>
                <div className="disflex"><span className="t4">Nombre del Cliente:</span><span>{pago.nombre_cliente}</span></div>
                <div className="disflex"><span className="t4">Monto:</span><span>{pago.monto_pedido}</span></div>
                
                
            </div>

            <div className="col-md-4">
                <div className="disflex"><span className="t4">Banco:</span><span>{pago.banco}</span></div>
                <div className="disflex"><span className="t4">Medio de Pago:</span><span>{pago.medio_pago}</span></div>
            </div>

            <div className="col-md-4">
                <div className="disflex"><span className="t4">Confirmado por:</span><span>{pago.confirmado_por}</span></div>
                <div className="disflex"><span className="t4">Confirmado El:</span><span>{pago.fecha_confirmacion}</span></div>
                <div className="disflex"><span className="t4 ">Confirmación de Pago:</span>

                {/*//////////////// CONFIRMACIÓN ////////////////*/}
                {  (usuario.tipo==='supervisor')
                    ?
                    <div className="estado">
                    {pago.confirma_pago 
                    ?  
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstadoConfirmado(pago)}
                            >CONFIRMADO</button>
                        )
                    : 
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstadoConfirmado(pago)}
                            >SIN CONFIRMAR</button>
                        )
                    }
                    </div>


                    :

                    <div className="estado">
                    {pago.confirma_pago 
                    ?  
                        (
                            <button
                                type="button"
                                className="completo"
                                /* onClick={() => cambiarEstadoConfirmado(pago)} */
                            >CONFIRMADO</button>
                        )
                    : 
                        (
                            <button
                                type="button"
                                className="incompleto"
                                /* onClick={() => cambiarEstadoConfirmado(pago)} */
                            >SIN CONFIRMAR</button>
                        )
                    }
                    </div>


                }
                    
                   
                
                
                </div>
            </div>


            
        </div>

        
        </Fragment>
     );
}
 
export default Pago;
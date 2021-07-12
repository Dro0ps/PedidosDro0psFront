import React, { useReducer } from 'react';
import Swal from 'sweetalert2';

import pedidoContext from './pedidoContext';
import pedidoReducer from './pedidoReducer';
import { 
    FORMULARIO_PEDIDO, 
    OBTENER_PEDIDOS,
    AGREGAR_PEDIDO,
    PEDIDO_ERROR,
    VALIDAR_FORMULARIO,
    PEDIDO_ACTUAL,
    ELIMINAR_PEDIDO,
    ACTUALIZAR_PEDIDO,
    ELEGIR_PEDIDO
} from '../../types';

import clienteAxios from '../../config/axios';
 

const PedidoState = props => {

    const initialState = {
        pedidos : [],
        formulario : false,
        errorformulario: false,
        pedido: null, 
        mensaje: null,
        pedidoseleccionado: null,
        
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(pedidoReducer, initialState)

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PEDIDO
        })
    }

    // Obtener los pedidos
    const obtenerPedidos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/pedidos');

            dispatch({
                type: OBTENER_PEDIDOS,
                payload: resultado.data.pedidos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: PEDIDO_ERROR,
                payload: alerta
            })
        }
    }

    // Agregar nuevo pedido
    const agregarPedido = async pedido => {

        try {
            const resultado = await clienteAxios.post("/api/pedidos", pedido, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
            

            // Lanzar una alerta
          if (resultado.status === 200) {
            Swal.fire("Agregado Correctamente", resultado.data.mensaje, "success");
          } else {
            // lanzar alerta
            Swal.fire({
              type: "error",
              title: "Hubo un error",
              text: "Vuelva a intentarlo",
            });
          }
            // Insertar el pedido en el state
            dispatch({
                type: AGREGAR_PEDIDO,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: PEDIDO_ERROR,
                payload: alerta
            })
        }
    }

    // Valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    } 
 
    // Selecciona el Proyecto que el usuario dio click
    const pedidoActual = pedidoId => {
        dispatch({
            type: PEDIDO_ACTUAL,
            payload: pedidoId
        })
    }

    // Elimina un pedido
    const eliminarPedido = async pedidoId => {
        try {
            const resultado = await clienteAxios.delete(`/api/pedidos/${pedidoId}`);

            // Lanzar una alerta
            if(resultado.status === 200) {

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Eliminado Correctamente',
                    text: resultado.data.mensaje,
                    showConfirmButton: false,
                    timer: 1500
                  })
                
            }


            dispatch({
                type: ELIMINAR_PEDIDO,
                payload: pedidoId
            })
        } catch (error) {
            /* const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            } */

            Swal.fire({
                icon: 'error',
                title: 'NO PUEDES ELIMINAR ESTE PEDIDO',
                text: 'Los pedidos solo pueden ser eliminados por su creador',
                
              })
            
            dispatch({
                type: PEDIDO_ERROR,
                /* payload: alerta */
            })
        }
    }

    // Edita o modifica un pedido
    const actualizarPedido = async pedido => {
        try {
            const resultado = await clienteAxios.put(`/api/pedidos/${pedido._id}`, pedido);
            dispatch({
                type: ACTUALIZAR_PEDIDO,
                payload: resultado.data.pedido
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'ACCESO DENEGADO',
                text: 'Tu usuario no tiene privilegios para cambiar el Estado de un Pedido',
                
              })
            
            dispatch({
                type: PEDIDO_ERROR,
                
            })
        }
    }

    const elegirPedido = async pedido => {
        try {
            const resultado = await clienteAxios.get(`/api/pedidos/${pedido}`, pedido);

            dispatch({
                type: ELEGIR_PEDIDO,
                payload: resultado.data.pedidos
            })
        } catch (error) {
            console.log(error);
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PEDIDO_ERROR,
                payload: alerta
            })

        }

    }


    return (
        <pedidoContext.Provider
            value={{
                pedidos: state.pedidos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                pedido: state.pedido,
                mensaje: state.mensaje,
                pedidoseleccionado: state.pedidoseleccionado,
                mostrarFormulario,
                obtenerPedidos,
                agregarPedido,
                mostrarError,
                pedidoActual,
                eliminarPedido,
                elegirPedido,
                actualizarPedido
            }}
        >
            {props.children}
        </pedidoContext.Provider>
        
    )
}

export default PedidoState;
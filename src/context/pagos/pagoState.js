import React, {useReducer} from 'react';
import pagoContext from './pagoContext';
import pagoReducer from './pagoReducer';

import {  
    OBTENER_PAGOS,
    AGREGAR_PAGO,
    VALIDAR_FORMULARIO_PAGO,
    ELIMINAR_PAGO,
    ACTUALIZAR_PAGO,
    PAGO_ACTUAL,

} from '../../types'; 

import usuarioAxios from '../../config/axios';

const PagoState = props => {

    const initialState = {
        pagos: [],
        formulario: false,
        pago: null,
        errorformulario: false,  
        pagoseleccionado: null   
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(pagoReducer, initialState)

    // Obtener los Pagos
    const obtenerPagos = async pago => {
        try {
            const resultado = await usuarioAxios.get('/api/pagos', pago);
            dispatch({
                type: OBTENER_PAGOS,
                payload: resultado.data.pagos
            })
        } catch (error) {
            console.log(error);
        }
    }

    const agregarPago = async pago => {

        try {
            const resultado = await usuarioAxios.post('/api/pagos', pago);
            console.log(resultado);
            // Insertar el pago en el state
            dispatch({
                type: AGREGAR_PAGO,
                payload: pago
            })
        } catch (error) {
            console.log(error);
        }

    }

    // Valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO_PAGO
        })
    } 

    // Selecciona el Pago que el usuario dio click
    const pagoActual = pagoId => {
        dispatch({
            type: PAGO_ACTUAL,
            payload: pagoId
        })
    }

    // Elimina un pago
    const eliminarPago = async pagoId => {
        try {
            await usuarioAxios.delete(`/api/pagos/${pagoId}`);
            dispatch({
                type: ELIMINAR_PAGO,
                payload: pagoId
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Edita o modifica un pago
    const actualizarPago = async pago => {
        try {
            const resultado = await usuarioAxios.put(`/api/pagos/${pago._id}`, pago);
            dispatch({
                type: ACTUALIZAR_PAGO,
                payload: resultado.data.pago
            })
        } catch (error) {
            console.log(error)
        }
    }

     
    return ( 
        <pagoContext.Provider
        value={{
            pagos: state.pagos,
            formulario: state.formulario,
            pago: state.pago,
            pagoseleccionado:state.pagoseleccionado,
            errorformulario: state.errorformulario,
            obtenerPagos,
            agregarPago,
            mostrarError,
            eliminarPago,
            actualizarPago,
            pagoActual
        }}
        >
            {props.children}
        </pagoContext.Provider>
        );
}

 
export default PagoState;
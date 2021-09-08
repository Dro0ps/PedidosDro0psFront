import React, {useReducer} from 'react';
import notaContext from './notaContext';
import notaReducer from './notaReducer';
import Swal from 'sweetalert2';

import {
    AGREGAR_NOTA,
    OBTENER_NOTAS,
    VALIDAR_FORMULARIO_NOTA,
    ACTUALIZAR_NOTA,
    ELIMINAR_NOTA,
    NOTA_ACTUAL
} from '../../types';

import usuarioAxios from '../../config/axios';

const NotaState = props => {

    const initialState = {
        notas: [],
        formulario: false,
        nota: null,
        errorformulario: false,
        notasseleccionada: null
    }

    // Dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer(notaReducer, initialState)

    // Obtener las Notas
    const obtenerNotas = async nota => {
        try {
            const resultado = await usuarioAxios.get('/api/notas', nota);
            dispatch({
                type: OBTENER_NOTAS,
                payload: resultado.data.notas
            })
        } catch (error) {
            console.log(error);
        }
    }

    const registrarNotaCredito = async nota => {

        try {
            const resultado = await usuarioAxios.post('/api/notaCredito', nota);
            console.log(resultado);

            // Lanzar una alerta
            if(resultado.status === 200) {

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Agregado Correctamente',
                    text: resultado.data.mensaje,
                    showConfirmButton: false,
                    timer: 1500
                  })
                
            }
            // Insertar el nota en el state
            dispatch({
                type: AGREGAR_NOTA,
                payload: nota
            })
        } catch (error) {
            console.log(error);
        }

    }

        // Valida el formulario por errores
        const mostrarError = () => {
            dispatch({
                type: VALIDAR_FORMULARIO_NOTA
            })
        } 
    
        // Selecciona el Nota que el usuario dio click
        const notaActual = notaId => {
            dispatch({
                type: NOTA_ACTUAL,
                payload: notaId
            })
        }

        // Elimina una nota
        const eliminarNota = async notaId => {
            try {
                await usuarioAxios.delete(`/api/notaCredito/${notaId}`);
                dispatch({
                    type: ELIMINAR_NOTA,
                    payload: notaId
                })
            } catch (error) {
                console.log(error)
            }
        }

        // Edita o modifica un nota
        const actualizarNota = async nota => {
            try {
                const resultado = await usuarioAxios.put(`/api/notaCredito/${nota._id}`, nota);
                dispatch({
                    type: ACTUALIZAR_NOTA,
                    payload: resultado.data.nota
                })
            } catch (error) {
                console.log(error)
            }
        }

        return ( 
            <notaContext.Provider
            value={{
                notas: state.notas,
                formulario: state.formulario,
                nota: state.nota,
                notasseleccionada: state.notasseleccionada,
                errorformulario: state.errorformulario,
                obtenerNotas,
                registrarNotaCredito,
                mostrarError,
                eliminarNota,
                actualizarNota,
                notaActual
            }}
            >
                {props.children}
            </notaContext.Provider>
            );

}

export default NotaState;
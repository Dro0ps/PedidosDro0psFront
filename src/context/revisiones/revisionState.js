import React, {useReducer} from 'react';
import revisionContext from './revisionContext';
import revisionReducer from './revisionReducer';
import Swal from 'sweetalert2';

import {
    AGREGAR_REVISION,
    OBTENER_REVISIONES,
    VALIDAR_FORMULARIO_REVISION,
    ACTUALIZAR_REVISION,
    ELIMINAR_REVISION,
    REVISION_ACTUAL
} from '../../types';

import usuarioAxios from '../../config/axios';

const RevisionState = props => {

    const initialState = {
        revisiones: [],
        formulario: false,
        revision: null,
        errorformulario: false,
        revisionseleccionada: null
    }

    // Dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer(revisionReducer, initialState)

    // Obtener las Notas
    const obtenerRevisiones = async revision => {
        try {
            const resultado = await usuarioAxios.get('/api/revisiones', revision);
            dispatch({
                type: OBTENER_REVISIONES,
                payload: resultado.data.revisiones
            })
        } catch (error) {
            console.log(error);
        }
    }

    const registrarRevision = async revision => {

        try {
            const resultado = await usuarioAxios.post('/api/revisiones', revision);
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
            // Insertar el revision en el state
            dispatch({
                type: AGREGAR_REVISION,
                payload: revision
            })
        } catch (error) {
            console.log(error);
        }

    }

        // Valida el formulario por errores
        const mostrarError = () => {
            dispatch({
                type: VALIDAR_FORMULARIO_REVISION
            })
        } 
    
        // Selecciona el Nota que el usuario dio click
        const revisionActual = revisionId => {
            dispatch({
                type: REVISION_ACTUAL,
                payload: revisionId
            })
        }

        // Elimina una revision
        const eliminarRevision = async revisionId => {
            try {
                await usuarioAxios.delete(`/api/revision/${revisionId}`);
                dispatch({
                    type: ELIMINAR_REVISION,
                    payload: revisionId
                })
            } catch (error) {
                console.log(error)
            }
        }

        // Edita o modifica un revision
        const actualizarRevision = async revision => {
            try {
                const resultado = await usuarioAxios.put(`/api/revision/${revision._id}`, revision);
                dispatch({
                    type: ACTUALIZAR_REVISION,
                    payload: resultado.data.revision
                })
            } catch (error) {
                console.log(error)
            }
        }

        return ( 
            <revisionContext.Provider
            value={{
                revisiones: state.revisiones,
                formulario: state.formulario,
                revision: state.revision,
                revisionseleccionada: state.revisionseleccionada,
                errorformulario: state.errorformulario,
                obtenerRevisiones,
                registrarRevision,
                mostrarError,
                eliminarRevision,
                actualizarRevision,
                revisionActual
            }}
            >
                {props.children}
            </revisionContext.Provider>
            );

}

export default RevisionState;
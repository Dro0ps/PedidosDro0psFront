import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import { 
    FORMULARIO_TAREA,
    TAREAS_PEDIDO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';
 
import clienteAxios from '../../config/axios';

const TareaState = props => {
    const initialState = {
        tareaspedido: [],
        formulario : false,
        errortarea: false,
        tareaseleccionada: null
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    // Ver formulario tarea
    const mostrarFormularioTarea = () => {
        dispatch({
            type: FORMULARIO_TAREA
        })
    }

    // Obtener las tareas de un pedido
    const obtenerTareas = async pedido => {

        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { pedido }});
            
            dispatch({
                type: TAREAS_PEDIDO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Agregar una tarea al pedido seleccionado
    const agregarTarea = async tarea => {
        console.log(tarea);
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // Eliminar tarea por id
    const eliminarTarea = async (id, pedido) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { pedido }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Edita o modifica una tarea
    const actualizarTarea = async tarea => {

        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Extrae una tarea para edición
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }



    // Elimina la tareaseleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareaspedido : state.tareaspedido,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                formulario: state.formulario,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea,
                mostrarFormularioTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;
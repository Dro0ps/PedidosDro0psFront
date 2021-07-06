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
 
export default (state, action) => {
    switch(action.type) {
        case FORMULARIO_TAREA:
            return {
                ...state,
                formulario: true
            }
        case TAREAS_PEDIDO:
            return { 
                ...state,
                tareaspedido: action.payload
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                tareaspedido: [action.payload, ...state.tareaspedido],
                formulario: false,
                errortarea: false
            }
        case VALIDAR_TAREA:
            return {
                ...state,
                errortarea: true
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareaspedido: state.tareaspedido.filter(tarea => tarea._id !== action.payload )
            }
        case ACTUALIZAR_TAREA:
            return {
                ...state,
                tareaspedido: state.tareaspedido.map(tarea => tarea._id === action.payload._id ? action.payload : tarea ),
                formulario: false,
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaseleccionada: action.payload
            }
        case LIMPIAR_TAREA:
            return {
                ...state,
                tareaseleccionada: null
            }
        default:
            return state;
    }
}
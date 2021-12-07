import {
    AGREGAR_REVISION,
    OBTENER_REVISIONES,
    VALIDAR_FORMULARIO_REVISION,
    ACTUALIZAR_REVISION,
    ELIMINAR_REVISION,
    REVISION_ACTUAL
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case OBTENER_REVISIONES:
            return {
                ...state,
                revisiones: action.payload
            }
        case AGREGAR_REVISION:
            return {
                ...state,
                revisiones: [...state.revisiones, action.payload],
                errorformulario: false
            }

        case VALIDAR_FORMULARIO_REVISION:
            return {
                ...state, 
                errorformulario: true
            }
        case REVISION_ACTUAL:
            return {
                ...state,
                revision: state.revisiones.filter(revision => revision._id === action.payload )
            }

        case ELIMINAR_REVISION:
            return {
                ...state,
                revisiones: state.revisiones.filter(revision => revision._id !== action.payload ),
                revision: null
            }

        case ACTUALIZAR_REVISION:
            return {
                ...state,
                revisiones: state.revisiones.map(revision => revision._id === action.payload._id ? action.payload : revision )
            }

        default:
            return state;
    }
}
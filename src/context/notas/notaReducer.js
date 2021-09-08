import {
    AGREGAR_NOTA,
    OBTENER_NOTAS,
    VALIDAR_FORMULARIO_NOTA,
    ACTUALIZAR_NOTA,
    ELIMINAR_NOTA,
    NOTA_ACTUAL
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case OBTENER_NOTAS:
            return {
                ...state,
                notas: action.payload
            }

        case AGREGAR_NOTA:
            return {
                ...state,
                notas: [...state.notas, action.payload],
                errorformulario: false
            }

        case VALIDAR_FORMULARIO_NOTA:
            return {
                ...state, 
                errorformulario: true
            }
        case NOTA_ACTUAL:
            return {
                ...state,
                nota: state.notas.filter(nota => nota._id === action.payload )
            }

        case ELIMINAR_NOTA:
            return {
                ...state,
                notas: state.notas.filter(nota => nota._id !== action.payload ),
                nota: null
            }

        case ACTUALIZAR_NOTA:
            return {
                ...state,
                notas: state.notas.map(nota => nota._id === action.payload._id ? action.payload : nota )
            }

        default:
            return state;
    }
}
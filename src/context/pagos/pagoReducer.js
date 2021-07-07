import { 
    OBTENER_PAGOS,
    AGREGAR_PAGO,
    VALIDAR_FORMULARIO_PAGO,
    ELIMINAR_PAGO,
    ACTUALIZAR_PAGO,
    PAGO_ACTUAL
 
} from '../../types';


export default (state, action) => {
    switch(action.type) {
        case OBTENER_PAGOS:
            return {
                ...state,
                pagos: action.payload
            }

        case AGREGAR_PAGO:
            return {
                ...state,
                pagos: [...state.pagos, action.payload],
                errorformulario: false
            }

        case VALIDAR_FORMULARIO_PAGO:
            return {
                ...state, 
                errorformulario: true
            }
        case PAGO_ACTUAL:
            return {
                ...state,
                pago: state.pagos.filter(pago => pago._id === action.payload )
            }

        case ELIMINAR_PAGO:
            return {
                ...state,
                pagos: state.pagos.filter(pago => pago._id !== action.payload ),
                pago: null
            }

        case ACTUALIZAR_PAGO:
            return {
                ...state,
                pagos: state.pagos.map(pago => pago._id === action.payload._id ? action.payload : pago )
            }

        default:
            return state;
    }
}
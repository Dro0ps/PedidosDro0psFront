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
 
 
export default (state, action) => {
    switch(action.type) {
        case FORMULARIO_PEDIDO:
            return {
                ...state,
                formulario: true
            }
        case OBTENER_PEDIDOS:
            return {
                ...state,
                pedidos: action.payload
            }
        case AGREGAR_PEDIDO:
            return {
                ...state,
                pedidos: [...state.pedidos, action.payload],
                formulario: false,
                errorformulario: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state, 
                errorformulario: true
            }
        case PEDIDO_ACTUAL:
            return {
                ...state,
                pedido: state.pedidos.filter(pedido => pedido._id === action.payload )
            }
        case ACTUALIZAR_PEDIDO:
        return {
            ...state,
            pedidos: state.pedidos.map(pedido => pedido._id === action.payload._id ? action.payload : pedido )
        }
        case ELEGIR_PEDIDO:
            return {
                ...state,
                pedidoseleccionado: action.payload
            }
        case ELIMINAR_PEDIDO:
            return {
                ...state,
                pedidos: state.pedidos.filter(pedido => pedido._id !== action.payload ),
                pedido: null
            }

        case PEDIDO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        default:
            return state;
    }
}
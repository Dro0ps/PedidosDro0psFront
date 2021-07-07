import { 
    OBTENER_PRODUCTOS,
    AGREGAR_PRODUCTO,
    VALIDAR_FORMULARIO_PRODUCTO,
    ELIMINAR_PRODUCTO,
    ACTUALIZAR_PRODUCTO,
    PRODUCTO_ACTUAL
 
} from '../../types';


export default (state, action) => {
    switch(action.type) {
        case OBTENER_PRODUCTOS:
            return {
                ...state,
                productos: action.payload
            }

        case AGREGAR_PRODUCTO:
            return {
                ...state,
                productos: [...state.productos, action.payload],
                errorformulario: false
            }

        case VALIDAR_FORMULARIO_PRODUCTO:
            return {
                ...state, 
                errorformulario: true
            }
        case PRODUCTO_ACTUAL:
            return {
                ...state,
                producto: state.productos.filter(producto => producto._id === action.payload )
            }

        case ELIMINAR_PRODUCTO:
            return {
                ...state,
                productos: state.productos.filter(producto => producto._id !== action.payload ),
                producto: null
            }

        case ACTUALIZAR_PRODUCTO:
            return {
                ...state,
                productos: state.productos.map(producto => producto._id === action.payload._id ? action.payload : producto )
            }

        default:
            return state;
    }
}
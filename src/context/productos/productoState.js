import React, {useReducer} from 'react';
import productoContext from './productoContext';
import productoReducer from './productoReducer';

import {  
    OBTENER_PRODUCTOS,
    AGREGAR_PRODUCTO,
    VALIDAR_FORMULARIO_PRODUCTO,
    ELIMINAR_PRODUCTO,
    ACTUALIZAR_PRODUCTO,
    PRODUCTO_ACTUAL,

} from '../../types'; 

import usuarioAxios from '../../config/axios';

const ProductoState = props => {

    const initialState = {
        productos: [],
        formulario: false,
        producto: null,
        errorformulario: false,  
        productoseleccionado: null   
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(productoReducer, initialState)

    // Obtener los Productos
    const obtenerProductos = async producto => {
        try {
            const resultado = await usuarioAxios.get('/api/productos', producto);
            dispatch({
                type: OBTENER_PRODUCTOS,
                payload: resultado.data.productos
            })
        } catch (error) {
            console.log(error);
        }
    }

    const agregarProducto = async producto => {

        try {
            const resultado = await usuarioAxios.post('/api/productos', producto);
            console.log(resultado);
            // Insertar el producto en el state
            dispatch({
                type: AGREGAR_PRODUCTO,
                payload: producto
            })
        } catch (error) {
            console.log(error);
        }

    }

    // Valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO_PRODUCTO
        })
    } 

    // Selecciona el Producto que el usuario dio click
    const productoActual = productoId => {
        dispatch({
            type: PRODUCTO_ACTUAL,
            payload: productoId
        })
    }

    // Elimina un producto
    const eliminarProducto = async productoId => {
        try {
            await usuarioAxios.delete(`/api/productos/${productoId}`);
            dispatch({
                type: ELIMINAR_PRODUCTO,
                payload: productoId
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Edita o modifica un producto
    const actualizarProducto = async producto => {
        try {
            const resultado = await usuarioAxios.put(`/api/productos/${producto._id}`, producto);
            dispatch({
                type: ACTUALIZAR_PRODUCTO,
                payload: resultado.data.producto
            })
        } catch (error) {
            console.log(error)
        }
    }

     
    return ( 
        <productoContext.Provider
        value={{
            productos: state.productos,
            formulario: state.formulario,
            producto: state.producto,
            productoseleccionado:state.productoseleccionado,
            errorformulario: state.errorformulario,
            obtenerProductos,
            agregarProducto,
            mostrarError,
            eliminarProducto,
            actualizarProducto,
            productoActual
        }}
        >
            {props.children}
        </productoContext.Provider>
        );
}

 
export default ProductoState;
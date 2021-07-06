import React, { Fragment, useContext } from 'react';
import Tarea from '../tareas/Tarea';
import Pedido from './Pedido';
import pedidoContext from '../../context/pedidos/pedidoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const VistaPedido = () => {

    // Extrar pedidos de state inicial
    const pedidosContext = useContext(pedidoContext);
    const { pedido, eliminarPedido } = pedidosContext;

    // obtener las tareas del pedido
    const tareasContext = useContext(tareaContext);
    const { tareaspedido } = tareasContext;

    // Si no hay pedido seleccionado
    if (!pedido) return <h2>Selecciona un pedido</h2>;

    // Array destructuring para extraer el pedido actual
    const [pedidoActual] = pedido;

    // Elimina un pedido
    const onClickEliminar = () => {
        eliminarPedido(pedidoActual._id)
    }

    return (
        <Fragment>
            <div className="container box-order-detail">
                <h2>Pedido: {pedidoActual.num_pedido} </h2>

                <TransitionGroup>
                    {pedido.map(pedido => (
                        <CSSTransition
                            key={pedido._id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Pedido
                                pedido={pedido}
                            />
                        </CSSTransition>
                    ))}
                    {tareaspedido.map(tarea => (
                        <CSSTransition
                            key={tarea.id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea
                                tarea={tarea}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>

            {/* <button     
            type="button"
            className="btn btn-eliminar"
            onClick={onClickEliminar}
        >Eliminar Pedido &times;</button> */}
        </Fragment>
    );
}

export default VistaPedido;
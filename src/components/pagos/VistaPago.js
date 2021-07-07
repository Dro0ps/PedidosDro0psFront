import React, { Fragment, useContext } from 'react';
import Tarea from '../tareas/Tarea';
import Pago from './Pago';
import pagoContext from '../../context/pagos/pagoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const VistaPago = () => {

    // Extrar pagos de state inicial
    const pagosContext = useContext(pagoContext);
    const { pago, eliminarPago } = pagosContext;

    // obtener las tareas del pago
    const tareasContext = useContext(tareaContext);
    const { tareaspago } = tareasContext;

    // Si no hay pago seleccionado
    if (!pago) return <h2>Selecciona un pago</h2>;

    // Array destructuring para extraer el pago actual
    const [pagoActual] = pago;

    // Elimina un pago
    const onClickEliminar = () => {
        eliminarPago(pagoActual._id)
    }

    return (
        <Fragment>
            <div className="container box-order-detail">
                {/* <h2>Pago: {pagoActual.num_pedido_pago} </h2> */}

                <TransitionGroup>
                    {pago.map(pago => (
                        <CSSTransition
                            key={pago._id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Pago
                                pago={pago}
                            />
                        </CSSTransition>
                    ))}
                    {/* {tareaspago.map(tarea => (
                        <CSSTransition
                            key={tarea.id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea
                                tarea={tarea}
                            />
                        </CSSTransition>
                    ))} */}
                </TransitionGroup>
            </div>

            {/* <button     
            type="button"
            className="btn btn-eliminar"
            onClick={onClickEliminar}
        >Eliminar Pago &times;</button> */}
        </Fragment>
    );
}

export default VistaPago;
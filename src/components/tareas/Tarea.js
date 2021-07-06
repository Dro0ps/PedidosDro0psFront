import React, { useContext } from 'react';
import authContext from '../../context/autenticacion/authContext';
import pedidoContext from '../../context/pedidos/pedidoContext';
import tareaContext from '../../context/tareas/tareaContext';



const Tarea = ({tarea}) => {
 
    // Extrar si un pedido esta activo
    const pedidosContext = useContext(pedidoContext);
    const { pedido } = pedidosContext;


    // obtener la función del context de tarea
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;


    // Extraer el pedido
    const [pedidoActual] = pedido;
 
    // Función que se ejecuta cuando el usuario presiona el btn de eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, pedidoActual._id);
        obtenerTareas(pedidoActual.id)
    }

    // Función que modifica el estado de las tareas
    /* const cambiarEstado = tarea => {
        if(tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true
        }
        actualizarTarea(tarea);
    } */

    // Agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <div className="row btop">

            <div className="col-md-12 disflex mb-2 "></div>
            <div className="col-md-10">
                <div className="disflex"><h3>{tarea.titulo_anexo}</h3><span>{tarea.fecha_anexo}</span></div>
         
                
            </div>
            <div className="col-md-2">
              
                <div className="disflex"><span>{tarea.operador}</span></div>
                
            </div>
            <div className="col-md-4">
              
                <div className="disflex"></div>
                
            </div>
            <div className="col-md-12">
                <div className="disflex"><span>{tarea.anexo}</span></div>
                
            </div>
            
            {/* <div className="estado">
                {tarea.estado 
                ?  
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >Completo</button>
                    )
                : 
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
            </div> */}
        
            
{/* 
            <div className="acciones">
                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea) }
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div> */}
            
        </div>
     );
}
 
export default Tarea;
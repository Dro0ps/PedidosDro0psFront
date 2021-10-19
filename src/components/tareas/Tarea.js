import React from 'react';




const Tarea = ({tarea}) => {
 

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
import React, { useContext, useState, Fragment } from "react";
import pedidoContext from "../../context/pedidos/pedidoContext";
import tareaContext from "../../context/tareas/tareaContext";
import authContext from "../../context/autenticacion/authContext";
import moment from "moment";

// Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";


const FormTarea = () => {
  // Ventana Emergente UI
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Extrar si un pedido esta activo
  const pedidosContext = useContext(pedidoContext);
  const { pedido } = pedidosContext;

  const AuthContext = useContext(authContext);
    const { usuario } = AuthContext;

    // ASIGNACÓN DE FECHA AUTOMATICO
    moment.locale();
    let capturaFecha = moment().format('LLL');

    
  // obtener la función del context de tarea
  const tareasContext = useContext(tareaContext);
  const {
    tareaseleccionada,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
  } = tareasContext;

  // Effect que detecta si hay una tarea seleccionada
 /*  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        titulo_anexo: "",
        anexo: "",
        operador: "",
        fecha_anexo: ""
      });
    }
  }, [tareaseleccionada]); */

  // State del formulario
  const [tarea, guardarTarea] = useState({
    titulo_anexo: "",
    anexo: "",
    operador: usuario.nombre,
    fecha_anexo: capturaFecha
  });

  // extraer los datos completos de las tareas
  const { titulo_anexo, anexo} = tarea;

  // Si no hay pedido seleccionado
  if (!pedido) return null;

  // Array destructuring para extraer el pedido actual
  const [pedidoActual] = pedido;

  // Mostrar el formulario
  /* const onClickFormulario = () => {
    mostrarFormularioTarea();
    setOpen(true);
  }; */

  // Leer los valores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
      
    });
    console.log(tarea);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // validar
    if (titulo_anexo.trim() === "" || anexo.trim() === "" ) {
      validarTarea();
      return;
    }

    // Si es edición o si es nueva tarea
    if (tareaseleccionada === null) {
      // agregar la nueva tarea al state de tareas
      tarea.pedido = pedidoActual._id;
      agregarTarea(tarea);
    } else {
      // actualizar tarea existente
      actualizarTarea(tarea);

      

     /*  // Elimina tareaseleccionada del state
      limpiarTarea(); */
    }
    // Obtener y filtrar las tareas del pedido actual
    obtenerTareas(pedidoActual.id);

    
    // reiniciar el form
    guardarTarea({
      titulo_anexo: "",
      anexo: "",
      /* operador: usuario.nombre,
      fecha_anexo: capturaFecha */
    });

    handleClose();
    
  };

  

  return (
    <Fragment>
      <Button onClick={handleClickOpen}>Agregar Anexo</Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          
        </DialogTitle>
        <DialogContent ajuste-UI>
          {/* Inicio del recuadro */}

          <div className="">
            <form onSubmit={onSubmit}>
              {/**TERCERA**/}

              <div className="form-row row">
              <div className="form-group col-md-15 margin_personal">
                  <p>Titulo del Anexo:</p>
                <select
                    className="form-control"
                    name="titulo_anexo"
                    value={titulo_anexo}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="Embalaje">Embalaje</option>
                    <option value="Factura">Factura</option>
                    <option value="Despacho">Despacho</option>
                    <option value="Nota de Credito">Nota de Credito</option>
                    <option value="Mercaderia">Mercaderia</option>
                    <option value="Corrección">Corrección</option>
                    <option value="Comentarios">Comentarios</option>
                </select>

                </div>


                <div className="form-group col-md-15 margin_personal">
                  <p>Comentarios:</p>
                  <textarea
                    rows="6"
                    className="form-control"
                    placeholder="Comentarios"
                    name="anexo"
                    value={anexo}
                    onChange={handleChange}
                  />
                </div>
                
              </div>

              <div className="contenedor-input">
                <input
                  type="submit"
                  className="btn btn-block"
                  value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
                />
              </div>
            </form>

            {errortarea ? (
              <p className="mensaje error">
                El nombre de la tarea es obligatorio
              </p>
            ) : null}
          </div>

          {/* Fin del recuadro */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default FormTarea;

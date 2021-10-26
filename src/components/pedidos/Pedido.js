import React, { Fragment, useContext, useState } from 'react';
import Swal from 'sweetalert2';
import AuthContext from '../../context/autenticacion/authContext';
import pedidoContext from '../../context/pedidos/pedidoContext';
import FormTarea from '../tareas/FormTarea';
import moment from 'moment';
import styled from '@emotion/styled';

import clienteAxios from '../../config/axios';

// MATERIAL UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const TituloP = styled.p`
    font-family: 'PT Sans', sans-serif;
    color: var(--gris2);
    font-weight: bold;
    font-size: 1.5rem;
`;

moment.locale("es");


/* import tareaContext from '../../context/tareas/tareaContext'; */

const Pedido = ({pedido}) => {

    


    // Obtener el state de pedidos
    const pedidosContext = useContext(pedidoContext);
    const {actualizarPedido} = pedidosContext;

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario } = authContext;

    ////////// COMPLEMENTOS DEL MATERIAL UI /////////

    const [open, setOpen] = React.useState(false);
    const [openFact, setOpenFact] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleClose = () => {
    setOpen(false);
    };

    const handleClickOpenFactura = () => {
        setOpenFact(true);
      };
    
    const handleCloseFact = () => {
        setOpenFact(false);
    };
    

    /////////// FUNCIONES /////////////

     ////////// SUBIR FACTURA /////

     const [ docArchivo, guardarDocArchivo ] = useState('');
     

     const agregarFormFactura = async e => {
         const formData = new FormData();

         formData.append("doc_archivo", docArchivo)

         try {
             const respuesta = await clienteAxios.put(`/api/pedidos/up/${pedido._id}`, formData, {
               headers: {
                   'Content-Type' : 'multipart/form-data'
               }
           } );

           if (respuesta) {
               pedido.estado_pedido = true;
               Swal.fire("El Documento Fue Agregado Correctamente", respuesta.data.mensaje, "success");
           } 
           actualizarPedido(pedido);

           handleCloseFact();
         } catch (error) {
             console.log(error);
         }
     }

   // Coloca EL ARCHIVO en el state
   const leerArchivoFactura = e => {
       guardarDocArchivo(e.target.files[0]);
       
   }

   const onSubmitFactura = e => {
       e.preventDefault();
       agregarFormFactura();
   }


    // ASIGNACÓN DE FECHA AUTOMATICO
    moment.locale();
    let fechaConfirmación = moment().format('LLL');
    
    const obtenerNumeroConfirmacion = async () => {
                        
        const { value: text } = await  Swal.fire({
            input: 'text',
            inputLabel: 'NUMERO DE CONFIRMACIÓN',
            inputPlaceholder: 'Ingrese el Rut de la Transferencia',
            inputAttributes: {
              'aria-label': 'Type your message here'
            },
            showCancelButton: true
          })
          
          if (text) {
            Swal.fire(`El pago se ha guardado con el identificador ${text}`)
            pedido.confirma_pago = true;
            pedido.num_transaccion = text;
            pedido.confirmado_por= usuario.nombre;
            pedido.fecha_confirmacion= fechaConfirmación;

            actualizarPedido(pedido);
          } 

    }

    const obtenerDocumento = async () => {
                        
        const { value: text } = await  Swal.fire({
            input: 'text',
            inputLabel: '# de Documento Factura/Boleta',
            inputPlaceholder: 'Ingrese el Numero del Documento de Venta',
            inputAttributes: {
              'aria-label': 'Type your message here'
            },
            showCancelButton: true
          })

          if (text) {
            if(usuario.tipo==="bodega") {

                try {
                    pedido.num_documento = text;
                    pedido.estado_pedido = true;
                    actualizarPedido(pedido);
                    Swal.fire({
                        type: "error",
                        title: "Factura Confirmada",
                        text: `Registrada con el Numero: ${pedido.num_documento}`,
                      });
                } catch (error) {
                    console.log(error)
                    Swal.fire({
                        type: "error",
                        title: "Hubo un error",
                        text: "Vuelva a intentarlo",
                      });
                }

                
            } else {
                pedido.num_documento = text;
                handleClickOpenFactura();
            }
            
          } 

          

    }

    /////// ALGUNOS STATE Y FUNCIONES DE ENTREGA ///////
    const [ fechaEntrega, guardarFechaEntrega ] = useState('');
    const [ lugarEntrega, guardarLugarEntrega ] = useState('');
    const [ cantidadBulto, guardarCantidadBulto ] = useState('');

    const onSubmitDespacho = e => {
        e.preventDefault();

        // Validar los datos
        if (fechaEntrega === '' || lugarEntrega === '' || cantidadBulto === '') {
            
              return;
        }

        pedido.estado_despacho = true;
        pedido.fecha_entrega = fechaEntrega;
        pedido.lugar_entrega = lugarEntrega;
        pedido.bultos = cantidadBulto;

        actualizarPedido(pedido);



        // Limpiar campos del formulario
        e.target.reset() // No Funciona

        handleClose();


    }


    //////////////////////////////////////////////////////////

    
    // Función que modifica el estado del pedido Embalado
    const cambiarEstadoConfirmado =  pedido => {

        if(pedido.confirma_pago){
            Swal.fire('Los Estados una vez Confirmados no Pueden ser Editados')
        } else {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "Quieres Cambiar el Estado de este Pedido a Confirmado? Los Estados una vez Confirmados no Pueden ser Editados",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Comfirmar',
                cancelButtonText : 'No, Cancelar'
            }).then((result) => { 

                
                
                if(result.value) {
                    obtenerNumeroConfirmacion();
            }
        })

        }
 
    }
    // Función que modifica el estado del pedido Embalado
    const cambiarEstado = pedido => {

        if(pedido.estado_pedido){
            Swal.fire('Los Estados una vez Confirmados no Pueden ser Editados')
        } else if (pedido.confirma_pago) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "Quieres Cambiar el Estado de este Pedido a Facturado? Una vez confirmada la factura no puede ser Editada",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Comfirmar',
                cancelButtonText : 'No, Cancelar'
            }).then((result) => { 

                
                
                if(result.value) {

                    obtenerDocumento();
    
            }
        })

        } else {
            Swal.fire('El Pedido debe estar Confirmado para poder a Facturarlo')
        }

           
        
    }


    // Función que modifica el estado del Pedido Despachado
    const cambiarEstadoDespacho = pedido => {
        if(pedido.estado_despacho){
            Swal.fire('Los Estados una vez Confirmados no Pueden ser Editados')
        } else if(pedido.estado_pedido) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "Quieres Cambiar el Estado a Despachado? Los Estados una vez Confirmados no Pueden ser Editados",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Comfirmar',
                cancelButtonText : 'No, Cancelar'
            }).then((result) => { 
                
                if(result.value) {
                    handleClickOpen();
    
            }
        })
        } else {
            Swal.fire('El Pedido debe estar Facturado para poder a Despacharlo')
        }

        
    }

    return (  
        <Fragment>
        <div className="row">
            <div className="col-md-6">
                {/* <div className="disflex "><h3>Numero de pedido:</h3><span>{pedido.num_pedido}</span></div> */}
                <div className="disflex"><span className="t4">Nombre del Cliente:</span><span>{pedido.nombre_cliente}</span></div>
                <div className="disflex"><span className="t4">Monto del Pedido:</span><span>{pedido.monto_pedido}</span></div>
                <div className="disflex"><span className="t4">Medio de Pago:</span><span>{pedido.medio_pago}</span></div>
                <div className="disflex"><span className="t4">Banco:</span><span>{pedido.banco}</span></div>
                <div className="disflex"><span className="t4">Fecha de Deposito:</span><span>{pedido.fecha_deposito}</span></div>
                <div className="disflex"><span className="t4">{pedido.tipo_documento}:</span><span>{pedido.num_documento}</span></div>
                {
                    (pedido.estado_pedido) && 
                    <div> {usuario.tipo!=="bodega" && <a href={pedido.doc_archivo} ><button type="button" className="btn btn-link">Descargar {pedido.tipo_documento}</button></a>}</div>
                }
                
                
            </div>
            <div className="col-md-6">
                
                <div className="disflex"><span className="t4">Confirmado Por:</span><span>{pedido.confirmado_por}</span></div>
                <div className="disflex"><span className="t4">Fecha de Confirmación:</span><span>{moment(pedido.fecha_confirmacion).format('MMMM Do YYYY, h:mm:ss a')}</span></div>
                <div className="disflex"><span className="t4">Numero de Transacción:</span><span>{pedido.num_transaccion}</span></div>
                <div className="disflex"><span className="t4">Entregado Por:</span><span>{pedido.lugar_entrega}</span></div>
                <div className="disflex"><span className="t4">Fecha de Entrega:</span><span>{moment(pedido.fecha_entrega).format('MMMM Do YYYY, h:mm:ss a')}</span></div>
                <div className="disflex"><span className="t4">Bultos:</span><span>{pedido.bultos}</span></div>
                <div>{usuario.tipo!=="bodega" && <a href={pedido.archivo} ><button type="button" className="btn btn-link">Descargar Pedido</button></a>}</div>
                
                
 
            </div>

        </div>


        <div className=" row pad-up ">
            <div className="col-md-4">
                <div className="disflex"><span className="t4 ">Confirmación de Pago:</span>

                {/*//////////////// CONFIRMACIÓN ////////////////*/}
                {  (usuario.tipo===('supervisor'))
                    ?
                    <div className="estado">
                    {pedido.confirma_pago 
                    ?  
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstadoConfirmado(pedido)}
                            >CONFIRMADO</button>
                        )
                    : 
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstadoConfirmado(pedido)}
                            >SIN CONFIRMAR</button>
                        )
                    }
                    </div>


                    :

                    <div className="estado">
                    {pedido.confirma_pago 
                    ?  
                        (
                            <button
                                type="button"
                                className="completo"
                                /* onClick={() => cambiarEstadoConfirmado(pedido)} */
                            >CONFIRMADO</button>
                        )
                    : 
                        (
                            <button
                                type="button"
                                className="incompleto"
                                /* onClick={() => cambiarEstadoConfirmado(pedido)} */
                            >SIN CONFIRMAR</button>
                        )
                    }
                    </div>


                }

                </div>
            </div>

            <div className="col-md-4">
                <div className="disflex"><span className="t4">Estado del pedido:</span>
                    

                {/*//////////////// FACTURADO ////////////////*/}

                    <div className="estado">
                    {(pedido.estado_pedido) 
                    ?  
                        (
                            <button
                                type="button"
                                className="completo"
                                
                                onClick={() => cambiarEstado(pedido)}
                            >FACTURADO</button>
                        )
                    : 
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstado(pedido)}
                            >SIN FACTURAR</button>
                        )
                    }
                    </div>
                
                </div>
            </div>


                {/* //////////////////// CAMBIAR ESTADO DESPACHO ////////////////// */}

                {/*/////// MATERIAL UI //////*/}
              
            <div className="col-md-4">
                <div className="disflex"><span className="t4">Entrega del Pedido:</span>
                    
                    <div className="estado">
                    {pedido.estado_despacho 
                    ?  
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstadoDespacho(pedido)}
                                
                            >ENTREGADO</button>
                        )
                    : 
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstadoDespacho(pedido)}
                                
                            >PENDIENTE POR ENTREGA</button>
                        )
                    }

                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >

                        <form
                            className="formulario-nuevo-pedido"
                            onSubmit={onSubmitDespacho}
                            
                        >
                        <DialogContent>
                        <DialogTitle id="responsive-dialog-title">{"Complete los Datos de Entrega"}</DialogTitle>
                            <DialogContentText>
                                <div className="">
                                    <TituloP>Tipo de Entrega:</TituloP>
                                    <select
                                        className="form-control"
                                        name="lugarEntrega"
                                        value={lugarEntrega}
                                        onChange={e => guardarLugarEntrega(e.target.value)}
                                    >
                                        <option value="">-- Seleccione --</option>
                                        <option value="Transporte">Transporte</option>
                                        <option value="Retiro Bascuñan">Bascuñan</option>
                                        <option value="Retiro Salvador Sanfuentes">Salvador Sanfuentes</option>
                                        
                                    </select>
                                </div>
                                <div className="mt-2">
                                <TituloP>Fecha de Entrega:</TituloP>
                                    <input 
                                            type="datetime-local"
                                            className="form-control"
                                            name="fechaEntrega"
                                            value={fechaEntrega}
                                            onChange={e => guardarFechaEntrega(e.target.value)}
                                        />
                                </div>
                                <div className="mt-2">
                                <TituloP>Cantidad de Bultos:</TituloP>
                                    <input 
                                            type="number"
                                            className="form-control"
                                            name="cantidadBulto"
                                            value={cantidadBulto}
                                            onChange={e => guardarCantidadBulto(e.target.value)}
                                        />
                                </div>
                                <DialogActions>
                                {
                                    (lugarEntrega, fechaEntrega, cantidadBulto ) &&

                                    <input 
                                        type="submit"
                                        className="btn  btn-block"
                                        value="Agregar Pedido"
                                    />
                                }
                                    {/* <Button onClick={handleClose} color="primary" autoFocus>
                                        Agree
                                    </Button> */}
                                </DialogActions>
                                
                            </DialogContentText>
                        </DialogContent>
                        </form>
                    </Dialog>

                    {/** FORMULARIO PARA SUBIR FACTURA **/}

                    <Dialog
                        fullScreen={fullScreen}
                        open={openFact}
                        /* onClose={handleCloseFact} */
                        aria-labelledby="responsive-dialog-title"
                    >

                        <form
                            className="formulario-nuevo-pedido"
                            onSubmit={onSubmitFactura}
                            
                        >
                        <DialogContent>

                            {(usuario.tipo!=="bodega") &&

                            <div>
                                <DialogTitle id="responsive-dialog-title">{<TituloP>Subir Factura/Boleta</TituloP>}</DialogTitle>
                                <div className="m-2">
                                    
                                    <div className="form-group">
                                        <input 
                                        type="file" 
                                        accept=".pdf" 
                                        className="form-control-file"
                                        name="docArchivo"
                                        onChange={leerArchivoFactura}
                                    />
                                    </div>
                                </div>

                            </div>
                                
                            
                            }
                        

                            <DialogActions>
                            {
                                (docArchivo) 
                                &&
                                <input 
                                    type="submit"
                                    className="btn  btn-block"
                                    value="Guardar Documento"
                                />
                            }

                                {/* <Button onClick={handleClose} color="primary" autoFocus>
                                    Agree
                                </Button> */}
                            </DialogActions>
                        </DialogContent>
                        
                        </form>
                        <Button className="btn-block" onClick={handleCloseFact} color="primary">
                            Salir
                        </Button>
                    </Dialog>


                    {/** ////////////////////////////// **/}

                    </div>
                
                </div>
            </div>

            
            {/* <form
                className="formulario-nuevo-pedido"
                onSubmit={onSubmitFactura}
            >
                <div className="form-group col-md-8 margin_personal">
                    <label>Archivo:</label>
                    <input 
                    type="file" 
                    accept=".pdf" 
                    className="form-control"
                    name="docArchivo"
                    onChange={leerArchivoFactura}
                />
                </div>

                <input 
                    type="submit"
                    className="btn  btn-block"
                    value="Agregar Factura"
                />
            </form> */}
            
        </div>
        <FormTarea/>
        </Fragment>
     );
}
 
export default Pedido;
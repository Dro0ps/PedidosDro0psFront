import React, { Fragment, useState, useContext } from 'react';
import pedidoContext from '../../context/pedidos/pedidoContext';
import styled from '@emotion/styled';
import AuthContext from '../../context/autenticacion/authContext';



// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';





const TituloP = styled.p`
    font-size: 1.2rem;
`;


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',

    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  
  
}));



const NuevoPedido = () => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario } = authContext;



      // Ventana Emergente UI
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


    // Obtener el state del formulario
    const pedidosContext = useContext(pedidoContext);
    const {
        formulario,
        errorformulario,
        mostrarFormulario,
        agregarPedido,
        mostrarError 
    } = pedidosContext;

 
    // State para Pedido
    const [pedido, guardarPedido] = useState({
        num_pedido: '',
        nombre_cliente: '',
        monto_pedido: '',
        medio_pago: '',
        banco: '',
        fecha_deposito: '',
        tipo_documento: '',
        num_documento: 'vacio',
        num_transaccion: 'vacio',
        lugar_entrega: 'vacio',
        fecha_entrega: 'vacio',



    });

    // Extraer datos de pedido
    const { num_pedido,
        nombre_cliente,
        monto_pedido,
        medio_pago,
        banco,
        fecha_deposito,
        tipo_documento,
        

    } = pedido;

    const [archivo, guardarArchivo] = useState('');

    const agregarFormPedido = async (e) => {
        // crear formData
        const formData = new FormData();
        formData.append("num_pedido", pedido.num_pedido);
        formData.append("nombre_cliente", pedido.nombre_cliente);
        formData.append("monto_pedido", pedido.monto_pedido);
        formData.append("medio_pago", pedido.medio_pago);
        formData.append("banco", pedido.banco);
        formData.append("fecha_deposito", pedido.fecha_deposito);
        formData.append("tipo_documento", pedido.tipo_documento);
        formData.append("num_documento", pedido.num_documento);
        formData.append("num_transaccion", pedido.num_transaccion);
        formData.append("lugar_entrega", pedido.lugar_entrega);
        formData.append("fecha_entrega", pedido.fecha_entrega);
        formData.append("archivo", archivo); 
        
        // Almacenar en la base de Datos
        try {
            await agregarPedido(formData);
          } catch (error) {
          console.log(error);
        }
      };

    // coloca la imagen en el state
    const leerArchivo = e => {
        guardarArchivo( e.target.files[0] );
    }

    // Lee los contenidos del input
    const onChangePedido = e => {
        guardarPedido({
            ...pedido,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario envia un pedido
    const onSubmitPedido = e => {
        e.preventDefault();

        // Validar el pedido
        if( num_pedido === '' || nombre_cliente === '' || monto_pedido === '' || medio_pago === '' || banco === ''
         || fecha_deposito === '' || tipo_documento === '' || archivo === ''  )  {
            mostrarError();
            return;
        }

        // agregar al state
        agregarFormPedido();
        

        /* agregarPedido(pedido); */
        
        
        // Reiniciar el form
        guardarPedido({
            num_pedido: '',
            nombre_cliente: '',
            monto_pedido: '',
            medio_pago: '',
            banco: '',
            fecha_deposito: '',
            tipo_documento: '', 
            num_documento: '',
            num_transaccion: '',
            lugar_entrega: '',
            fecha_entrega: '',
            
        })

        handleClose();
    }

    // Mostrar el formulario
    const onClickFormulario = () => {
        mostrarFormulario();
    }

    return ( 
        <Fragment>
            <Button variant="contained" onClick={handleClickOpen}>Registrar Nuevo Pedido</Button>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Rellene los Campos</DialogTitle>
            <DialogContent>
        {/* Inicio del recuadro */}
            
        
        <form
            className="formulario-nuevo-pedido"
            onSubmit={onSubmitPedido}
        >
            
            {/**PRIMERA**/}
            <div className="form-row">

            <div className="form-group col-md-auto margin_personal">
            <TituloP>Pedido:</TituloP>
            <input 
                    type="number"
                    className="form-control"
                    placeholder="# Pedido"
                    name="num_pedido"
                    value={num_pedido}
                    onChange={onChangePedido}
                />
            </div>

            <div className="form-group col-md-6 margin_personal">
            <TituloP>Cliente:</TituloP>
            <input 
                    type="text"
                    className="form-control"
                    placeholder="cliente..."
                    name="nombre_cliente"
                    value={nombre_cliente}
                    onChange={onChangePedido}
                />
            </div>

            
            
            </div>

            {/**SEGUNDA**/}
            <div className="form-row"> 


            <div className="form-group col-md-auto margin_personal">
                <TituloP>Monto:</TituloP>
                <input 
                        type="number"
                        className="form-control"
                        placeholder="Monto $"
                        name="monto_pedido"
                        value={monto_pedido}
                        onChange={onChangePedido}
                    />
                </div>

                <div className="form-group col-md-auto margin_personal">
                    <TituloP>Medio de Pago:</TituloP>
                    <select
                        className="form-control"
                        name="medio_pago"
                        value={medio_pago}
                        onChange={onChangePedido}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="Transferencia">Transferencia</option>
                        <option value="Deposito">Deposito</option>
                        <option value="Caja Vecina">Caja Vecina</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Cheque">Cheque</option>
                    </select>
                </div>

                <div className="form-group col-md-auto margin_personal">
                    <TituloP>Banco:</TituloP>
                    <select
                        className="form-control"
                        name="banco"
                        value={banco}
                        onChange={onChangePedido}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="Santander">Santander</option>
                        <option value="Bancoestado">Bancoestado</option>
                        
                    </select>
                </div>

                </div>


                {/**TERCERA**/}
                <div className="form-row">

                <div className="form-group col-md-auto margin_personal">
                <TituloP>Fecha del Deposito:</TituloP>
                <input 
                        type="date"
                        className="form-control"
                        name="fecha_deposito"
                        value={fecha_deposito}
                        onChange={onChangePedido}
                    />
                </div>
                <div className="form-group col-md-auto margin_personal">
                    <TituloP>Tipo de documento:</TituloP>
                    <select
                        className="form-control"
                        name="tipo_documento"
                        value={tipo_documento}
                        onChange={onChangePedido}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="Boleta">Boleta</option>
                        <option value="Factura">Factura</option>
                        
                    </select>
                </div>

                <div className="form-group col-md-8 margin_personal">
                    <label>Archivo:</label>
                    <input 
                    type="file" 
                    accept=".pdf" 
                    className="form-control"
                    name="archivo"
                    onChange={leerArchivo}
                />
                </div>
                

                {/* <div className="form-group col-md-auto margin_personal">
                    <TituloP>Estado:</TituloP>
                    <select
                        className="form-control"
                        name="estado_pedido"
                        value={estado_pedido}
                        onChange={onChangePedido}
                    >
                        <option value="estado_pedido">{estado_pedido}</option>
                        <option value="Completo">Completo</option>
                        <option value="Pendiente">Pendiente</option>
                        
                    </select>
                </div> */}
                </div>
                <input 
                    type="submit"
                    className="btn  btn-block"
                    value="Agregar Pedido"
                />

            </form>
            

        { errorformulario ? <p className="mensaje error">Todos los campos son Obligatorios</p>  : null }
        

            {/* Fin del recuadro */}
        </DialogContent>
        <DialogActions>
        <Button className="btn-block" onClick={handleClose} color="primary">
        Salir
        </Button>
        
        </DialogActions>
        </Dialog>

    </Fragment>
    );
}
 
export default NuevoPedido;
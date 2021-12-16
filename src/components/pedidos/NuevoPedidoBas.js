import React, {  useState, useContext } from 'react';
import pedidoContext from '../../context/pedidos/pedidoContext';
import styled from '@emotion/styled';



// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


const TituloP = styled.p`
    font-size: 1.2rem;
`;

const NuevoPedidoBas = () => {

// Ventana Emergente UI

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
    agregarPedidoBas,
    mostrarError
} = pedidosContext;


// State para el pedido
const [pedido, guardarPedido] = useState({
    num_pedido: '',
    nombre_cliente: '',
    monto_pedido: '',
    medio_pago: '',
    banco: '',
    fecha_deposito: '',
    tipo_documento: '',
    num_documento: '',
    num_transaccion: 'sin asignar',
    lugar_entrega: '',
    fecha_entrega: '',
    bultos: '',
    archivo: 'sin asignar'
})

// Extraer datos del pedido
const { 
    num_pedido,
    nombre_cliente,
    monto_pedido,
    medio_pago,
    banco,
    fecha_deposito,
    tipo_documento,
} = pedido;




// Lee los contenidos del input
const onChangePedido = e => {
    guardarPedido({
        ...pedido,
        [e.target.name] : e.target.value
    })
}

// Enviando los datos del pedido
const onSubmitPedido = async e => {
    e.preventDefault();

    // Validar el pedido
    if( num_pedido === '' || nombre_cliente === '' || monto_pedido === '' || medio_pago === '' || banco === ''
        || fecha_deposito === '' || tipo_documento === '' )  {
        mostrarError();
        return;
    }

    // Almacenar en la base de Datos
    try {
        await agregarPedidoBas(pedido);
      } catch (error) {
      console.log(error);
    }

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
        bultos: '',
        archivo: ''
        
        
    })

    handleClose();

}





    return ( 
    <>

        <Button variant="contained" onClick={handleClickOpen}>Registrar Pedido Bascuñan</Button>
        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogContent className="ajuste-UI">
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
                        type="text"
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
                        type="text"
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

            </div>
                <input 
                    type="submit"
                    className="btn  btn-block"
                    value="Agregar Pedido"
                />

            </form>

            </DialogContent>
            <DialogActions>
            <button className="btn btn-block" onClick={handleClose} color="primary">Salir</button>
            
            </DialogActions>
        </Dialog>



    </>
     );
}
 
export default NuevoPedidoBas;
import React, {Fragment, useState, useContext} from 'react';
import pagoContext from '../../context/pagos/pagoContext';
import styled from '@emotion/styled';


// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const TituloP = styled.p`
    font-size: 1.2rem;
`;


const NuevoPago = () => {

    // Ventana Emergente UI
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const pagosContext = useContext(pagoContext);
    const {  
        errorformulario,
        agregarPago,
        mostrarError    
    } = pagosContext;

    // State para pago
    const [pago, guardarPago] = useState({
      num_pedido_pago: '',
      rut_depositante: '',
      monto_pedido: '',
      medio_pago: '',
      banco: '',
      fecha_pago: '',
      
  });

    // Extraer datos del pago
    const {
      num_pedido_pago,
      rut_depositante,
      monto_pedido,
      medio_pago,
      banco,
      fecha_pago,
      
        } = pago;

      // Lee los contenidos del input
      const onChangePago = e => {
        guardarPago({
            ...pago,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario envia un pago
    const onSubmitPago = e => {
        e.preventDefault();

        // Validar el pago
        if( num_pedido_pago === '' || rut_depositante === '' || monto_pedido === '' || medio_pago === '' || banco === '' || fecha_pago === ''  )  {
            mostrarError();
            return;
        }

        /* if(password.length < 6) {
          mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
          return;
      } */

        // agregar al state
        agregarPago(pago)

        // Reiniciar el form
        guardarPago({
          num_pedido_pago: '',
          rut_depositante: '',
          monto_pedido: '',
          medio_pago: '',
          banco: '',
          fecha_pago: '',
          
        })
 
        handleClose();
      }

    

    return ( 

    <Fragment>
    <Button onClick={handleClickOpen}>Registrar Nuevo Pago</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle><h2>Rellene los Campos</h2></DialogTitle>
        <DialogContent>
            {/* Inicio del recuadro */}

            <form
                className="formulario-nuevo-pedido"
                onSubmit={onSubmitPago}
            >
                
                {/**PRIMERA**/}
                <div class="form-row">

                <div class="form-group col-md-auto margin_personal">
                <TituloP>Numero de Pedido:</TituloP>
                <input 
                      type="number"
                      className="form-control"
                      placeholder="# pedido"
                      name="num_pedido_pago"
                      value={num_pedido_pago}
                      onChange={onChangePago}
                    />
                </div>

                <div class="form-group col-md-4 margin_personal">
                <TituloP>Rut del Depositante:</TituloP>
                <input 
                      type="number"
                      className="form-control"
                      placeholder="Ingrese Rut sin puntos ni guíon"
                      name="rut_depositante"
                      value={rut_depositante}
                      onChange={onChangePago}
                    />
                </div>

                <div class="form-group col-md-6 margin_personal">
                <TituloP>Monto Pago:</TituloP>
                <input 
                      type="text"
                      className="form-control"
                      placeholder="Monto"
                      name="monto_pedido"
                      value={monto_pedido}
                      onChange={onChangePago}
                    />
                </div>

                <div class="form-group col-md-6 margin_personal">
                <TituloP>Medio de Pago:</TituloP>
                    <select
                        className="form-control"
                        name="medio_pago"
                        value={medio_pago}
                        onChange={onChangePago}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="Transferencia">Transferencia</option>
                        <option value="Deposito">Deposito</option>
                        <option value="Caja Vecina">Caja Vecina</option>
                        <option value="Cheque">Cheque</option>
                    </select>
                </div>

                <div class="form-group col-md-6 margin_personal">
                <TituloP>Banco:</TituloP>
                <select
                    className="form-control"
                    name="banco"
                    value={banco}
                    onChange={onChangePago}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="Santander">Santander</option>
                    <option value="Bancoestado">Bancoestado</option>
                    <option value="Otro">Otro</option>
                    
                </select>
                </div>

                </div>

            {/**SEGUNDA**/}
            <div class="form-row"> 


            <div class="form-group col-md-auto margin_personal">
                <TituloP>Fecha del Pago:</TituloP>
                <input 
                        type="date"
                        className="form-control"
                        name="fecha_pago"
                        value={fecha_pago}
                        onChange={onChangePago}
                    />
                </div>

                </div>


                {/**TERCERA**/}
                
                
                <input 
                    type="submit"
                    className="btn  btn-block"
                    value="Agregar Pago"
                />

            </form>
                

            { errorformulario ? <p className="mensaje error">Todos los campos son Obligatorios</p>  : null }
            

             {/* Fin del recuadro */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Salir
          </Button>
          
        </DialogActions>
      </Dialog>

    </Fragment> 
    
    );
}
 
export default NuevoPago;
import React, {Fragment, useState, useContext} from 'react';
import notaContext from '../../context/notas/notaContext';
import styled from '@emotion/styled';



// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AlertaContext from '../../context/alertas/alertaContext';



const TituloP = styled.p`
    font-size: 1.2rem;
`;


const NuevaNota = () => {

    // extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    // Ventana Emergente UI
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const notasContext = useContext(notaContext);
    const {  
        errorformulario,
        registrarNotaCredito,
        mostrarError    
    } = notasContext;

    // State para nota
    const [nota, guardarNota] = useState({
        num_notaCredito: '',
        rut_clienteNotaCredito: '',
        monto_notaCredito: '',
        estado_notaCredito: true,
        fecha_notaCredito: '',
        /* devol_nota: {
            tipo_devol: '',
            ref_devol: '',
            fecha_devol: '',
            usuario_devol: ''
        } */
      
    });

    // Extraer datos del nota
    const {
      num_notaCredito,
      rut_clienteNotaCredito,
      monto_notaCredito,
      fecha_notaCredito,
      /* devol_nota, */
      
        } = nota;

      // Lee los contenidos del input
      const onChangeNota = e => {
        guardarNota({
            ...nota,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario envia un nota
    const onSubmitNota = e => {
        e.preventDefault();

        // Validar el nota
        if( num_notaCredito === '' )  {
            mostrarError();
            return;
        }
        console.log(nota);

          // agregar al state
          registrarNotaCredito(nota)

          // Reiniciar el form
          guardarNota({
            num_notaCredito: '',
            rut_clienteNotaCredito: '',
            monto_notaCredito: '',
            fecha_notaCredito: '',
            /* devol_nota: {
                tipo_devol: '',
                ref_devol: '',
                fecha_devol: '',
                usuario_devol: ''
            } */
            
          })

          handleClose();

      }

    return ( 

    <Fragment>
    <Button variant="contained" onClick={handleClickOpen}>Registrar Nueva Nota</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle><h4>Rellene los Campos</h4></DialogTitle>
        <DialogContent>
          {/* Inicio del recuadro */}

          <form
              className="formulario-nuevo-pedido"
              onSubmit={onSubmitNota}
          >
              
            {/**PRIMERA**/}
            <div class="form-row">

              <div className="form-group col-md-auto margin_personal">
              <TituloP># Nota Credito:</TituloP>
              <input 
                    type="number"
                    className="form-control"
                    placeholder="# pedido"
                    name="num_notaCredito"
                    value={num_notaCredito}
                    onChange={onChangeNota}
                  />
              </div>

              <div className="form-group col-md-4 margin_personal">
              <TituloP>Rut Cliente:</TituloP>
              <input 
                    type="text"
                    className="form-control"
                    placeholder="Ingrese Rut sin puntos ni guíon"
                    name="rut_clienteNotaCredito"
                    value={rut_clienteNotaCredito}
                    onChange={onChangeNota}
                  />
              </div>

              <div className="form-group col-md-6 margin_personal">
              <TituloP>Monto NC:</TituloP>
              <input 
                    type="number"
                    className="form-control"
                    placeholder="Monto"
                    name="monto_notaCredito"
                    value={monto_notaCredito}
                    onChange={onChangeNota}
                  />
              </div>

              

            </div>

          {/**SEGUNDA**/}
          <div class="form-row"> 


          <div className="form-group col-md-auto margin_personal">
              <TituloP>Fecha de Nota Cedito:</TituloP>
              <input 
                      type="date"
                      className="form-control"
                      name="fecha_notaCredito"
                      value={fecha_notaCredito}
                      onChange={onChangeNota}
                  />
              </div>

              </div>


              {/**TERCERA**/}
              
              
              <input 
                  type="submit"
                  className="btn  btn-block"
                  value="Agregar NC"
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
 
export default NuevaNota;
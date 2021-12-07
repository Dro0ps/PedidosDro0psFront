import React, {useState, useContext} from 'react';
import revisionContext from '../../context/revisiones/revisionContext';
import styled from '@emotion/styled';


// UI personalizado
import { Formulario } from '../ui/Formulario';
import Boton from '../ui/Boton';

// Material UI

/* import AlertaContext from '../../context/alertas/alertaContext'; */



const TituloP = styled.p`
    font-size: 1.2rem;
`;


const NuevaRevision = () => {

    // extraer los valores del context
/*     const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext; */

    // Ventana Emergente UI
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const revisionesContext = useContext(revisionContext);
    const {  
        errorformulario,
        registrarRevision,
        mostrarError    
    } = revisionesContext;

    // State para revision
    const [revision, guardarRevision] = useState({
        doc_revisado: '',
        revisado: false,
        fecha_revisado: '',
        revisado_por: '',
    });

    // Extraer datos del revision
    const {
      doc_revisado,
      fecha_revisado,
      revisado_por
      
        } = revision;

      // Lee los contenidos del input
      const onChangeRevision = e => {
        guardarRevision({
            ...revision,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario envia un revision
    const onSubmitRevision = e => {
        e.preventDefault();

        // Validar el revision
        if( doc_revisado === '' )  {
            mostrarError();
            return;
        }
        console.log(revision);

          // agregar al state
          registrarRevision(revision)

          // Reiniciar el form
          guardarRevision({
            doc_revisado: '',
            fecha_revisado: '',
            revisado_por: '',
          })

          handleClose();

      }
    
    return ( 
      <>
        <Formulario
          className="formulario-nuevo-pedido"
          onSubmit={onSubmitRevision}
        >

          <div className="Formulario-group col-md-auto margin_personal">
            <TituloP>Numero de Documento:</TituloP>
            <input 
                type="number"
                className="form-control"
                placeholder="#Fact/Boleta"
                name="doc_revisado"
                value={doc_revisado}
                onChange={onChangeRevision}
            />
          </div>

          <div className="form-group col-md-auto margin_personal">
            <TituloP>Fecha:</TituloP>
            <input 
                type="date"
                className="form-control"
                name="fecha_revisado"
                value={fecha_revisado}
                onChange={onChangeRevision}
            />
          </div>

          <div className="form-group col-md-auto margin_personal">
            <TituloP>Quien Revisa:</TituloP>
            <input 
                type="text"
                className="form-control"
                placeholder="Encargado de Revisar"
                name="revisado_por"
                value={revisado_por}
                onChange={onChangeRevision}
            />
          </div>

          <input 
                    type="submit"
                    className="btn  btn-block"
                    value="Registrar"
                />



        </Formulario>

      
      </>
    );
}
 
export default NuevaRevision;
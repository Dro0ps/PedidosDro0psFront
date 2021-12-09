import React, {useState, useContext} from 'react';
import revisionContext from '../../context/revisiones/revisionContext';
import styled from '@emotion/styled';
import moment from 'moment';




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
        fecha_verificado: '',
        comentarios: [{
          body: '',
          date: ''
        }]
    });

    // Extraer datos del revision
    const {
      doc_revisado,
      fecha_revisado,
      revisado_por,
      fecha_verificado,
      comentarios
      
        } = revision;

      
      

        

      // Lee los contenidos del input
      const onChangeRevision = e => {
        guardarRevision({
            ...revision,
            [e.target.name] : e.target.value,
            fecha_revisado: `${moment().format('L')}, ${moment().format('LTS')}`
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
        
        

        // agregar al state
        registrarRevision(revision)

        // Reiniciar el form
        guardarRevision({
          doc_revisado: '',
          revisado_por: '',
          fecha_verificado: '',
          comentarios: [{
            body: '',
            date: ''
          }]
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
            <TituloP>Quien Revisa:</TituloP>
            <select
                className="form-control"
                name="revisado_por"
                value={revisado_por}
                onChange={onChangeRevision}
            >
                <option value="">-- Seleccione --</option>
                <option value="Mauricio Bravo">Mauricio Bravo</option>
                <option value="Manuel">Manuel</option>
                <option value="Enrique">Enrique</option>
                <option value="Dilia">Dilia</option>
                
            </select>
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
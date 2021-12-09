import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import AuthContext from '../../context/autenticacion/authContext';
import revisionContext from '../../context/revisiones/revisionContext';
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

const Revision = ({revision}) => {

    const revisionesContext = useContext(revisionContext);
    const {actualizarRevision} = revisionesContext;

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

    console.log(revision);

    

    return (
        
        <div className="row">
            <div className="col-md-6">
                <div className="disflex"><span className="t4">Documento: </span><span>{revision.doc_revisado}</span></div>
                <div className="disflex"><span className="t4">Fecha Registro: </span><span>{revision.fecha_revisado}</span></div>
            </div>
            
            <div className="col-md-6">
                <div className="disflex"><span className="t4">Revisado Por: </span><span>{revision.revisado_por}</span></div>
                <div className="disflex"><span className="t4">Fecha Verificado: </span><span>{revision.fecha_verificado}</span></div>
            </div>
            
        </div>


    )
}

export default Revision

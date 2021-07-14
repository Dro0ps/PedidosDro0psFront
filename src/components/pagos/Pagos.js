import React, { useContext, useEffect, Fragment } from 'react';
import Barra from '../layout/Barra';
import NuevoPago from './NuevoPago';
import AuthContext from '../../context/autenticacion/authContext';
import TablaPagos from './TablaPagos';


const Pagos = () => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

    return (

    <Fragment>
        <Barra/>
        
        <NuevoPago/>
        <TablaPagos/>
    </Fragment>
    
    
    );
}
 
export default Pagos;
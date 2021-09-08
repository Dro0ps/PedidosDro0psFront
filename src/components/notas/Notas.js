import React, { useContext, useEffect, Fragment } from 'react';
import Barra from '../layout/Barra';
import NuevaNota from './NuevaNota';
import AuthContext from '../../context/autenticacion/authContext';
import TablaNotas from './TablaNotas';



const Notas = () => {

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
        <NuevaNota/>
        <TablaNotas/>
    </Fragment>
    
    
    );
}
 
export default Notas;
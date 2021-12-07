import React, { useContext, useEffect, Fragment } from 'react';
import Barra from '../layout/Barra';
import NuevaRevision from './NuevaRevision';
import AuthContext from '../../context/autenticacion/authContext';
import TablaRevisiones from './TablaRevisiones';



const Revisiones = () => {

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
        <NuevaRevision/>
        <div className="container w-75 p-3 ">
            <TablaRevisiones />
        </div>
        
    </Fragment>
    
    
    );
}
 
export default Revisiones;
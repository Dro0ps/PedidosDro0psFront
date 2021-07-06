import React, {useState} from 'react';
import { Fragment } from 'react';
import clienteAxios from '../../config/axios';


const Imagen = () => {

const [archivo, guardarArchivo] = useState(null);

const subirArchivos = e => {
    guardarArchivo(e);
}

const insertarArchivos = async()=>{
    const f = new FormData();

    await clienteAxios.post('/api/imagen/uploads', f, {headers: {'content-type': 'multipart/form-data'}})
    .then(response=>{
        console.log(response.data);
    }).catch(error=>{console.log(error);})

}

    return ( 
        <Fragment>
            
            <br /> <br />
            
            <input type="file" name="image" onChange={(e) => subirArchivos(e.target.image)}/>
            <br /> <br />
            <button className="btn btn-primary" onClick={() => insertarArchivos()}>Insertar Archivos</button>
            
        </Fragment>
               
        );
}
 
export default Imagen;
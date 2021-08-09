import React, { useContext, Fragment, useEffect, Component } from 'react';
import pedidoContext from '../../context/pedidos/pedidoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import tareaContext from '../../context/tareas/tareaContext';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Pedido from '../pedidos/Pedido';


const RegistroPedidos  = () => {

     // Extrar pedidos de state inicial
     const pedidosContext = useContext(pedidoContext);
     const { mensaje, pedidos, pedidoActual, obtenerPedidos } = pedidosContext;

     // obtener la función del context de tarea
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas} = tareasContext;
 
     const alertaContext = useContext(AlertaContext);
     const { alerta, mostrarAlerta } = alertaContext;

     const seleccionarPedido = id => {
        
        pedidoActual(id); // Fijar un pedido actual
        obtenerTareas(id); // Filtrar las tareas cuando se de click
        
    }


     // Obtener pedidos cuando carga el componente
     useEffect(() => {
         // si hay un error
         if(mensaje) {
             mostrarAlerta(mensaje.msg, mensaje.categoria); 
         }
 
         obtenerPedidos();
         
         // eslint-disable-next-line
     }, [mensaje]);
 
     // revisar si pedidos tiene contenido
     if(pedidos.length === 0 ) return <h1>No hay pedidos Registrados</h1>
     
     

    const columnas = [
        {
            name: 'ID',
            selector: '_id',
            sortable: true,
            omit: true,
            
        },

        {
            name: 'Numero de Pedido',
            selector: 'num_pedido',
            sortable: true,
            /** Boton para llamar el Pedido **/
            cell: row => <button
            className='btn btn-blank'
            raised primary onClick={() => seleccionarPedido(row._id)}>
            {row.num_pedido}
            </button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,

        },
        {
            name: 'Nombre del Cliente',
            selector: 'nombre_cliente',
            sortable: true,
            grow: 2.2
            
        },
        {
            name: 'Monto del Pedido',
            selector: 'monto_pedido',
            sortable: true,
            
        },
        {
            name: 'Medio de Pago',
            selector: 'medio_pago',
            sortable: true,
            
        },
        {
            name: 'Banco',
            selector: 'banco',
            sortable: true,
            
        },
        {
            name: 'Fecha de Deposito',
            selector: 'fecha_deposito',
            sortable: true,
            
        },
        
        {
            name: 'Tipo de Documento',
            selector: 'tipo_documento',
            sortable: true,
            
        },
        {
            name: 'N° Identificador',
            selector: 'num_transaccion',
            sortable: true,
            
        },
        {
            name: 'N° Documento',
            selector: 'num_documento',
            sortable: true,
            
        },
        {
            name: 'Fecha de Entrega',
            selector: 'fecha_entrega',
            sortable: true,
            
        },
        {
            name: 'Lugar de Entrega',
            selector: 'lugar_entrega',
            sortable: true,
            
        },
        {
            name: 'Confirmación',
            selector: 'confirma_pago',
            cell: row => <div className="estado">{row.confirma_pago 
                ?  
                    (
                        <button
                        className="completo"
                        >CONFIRMADO</button>
                    )
                : 
                    (
                        <button 
                        className=""
                        >SIN CONFIRMAR</button>
                    )
                }
            
            </div>,
            sortable: true,
            grow: 0.9
            
        },
       
        {
            name: 'Facturación',
            selector: 'estado_pedido',
            cell: row => <div className="estado">{row.estado_pedido 
                ?  
                    (
                        <button
                        className="completo"
                        >FACTURADO</button>
                    )
                : 
                    (
                        <button 
                        className=""
                        >SIN FACTURAR</button>
                    )
                }
            
            </div>,
            sortable: true,
            grow: 1
            
        },

        {
            name: 'Entrega',
            selector: 'estado_pedido',
            cell: row =>  <div className="estado">
            {row.estado_despacho 
            ?  
                (
                    <button
                        type="button"
                        className="completo"
                    >ENTREGADO</button>
                )
            : 
                (
                    <button
                        type="button"
                        className="incompleto"
                    >PENDIENTE POR ENTREGAR</button>
                )
            }
            </div>,
            sortable: true,
            grow: 1
            
        },
       
    ];

    const pagOpciones = {
        rowsPerPageText: 'Filas por pagina',
        rangeSeparatorText: ' de ',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }

    class Tabla extends Component{
        
        //Buscador
        state={
            busqueda:'',
            pedidos: [],
            
        }

        onChange= async e=>{
            e.persist();
            await this.setState({busqueda: e.target.value});
            this.filtrarElementos();
        }

        filtrarElementos=()=>{
            var search=pedidos.filter(item=>{
                if(
                item.num_pedido.toLowerCase().includes(this.state.busqueda) ||
                item.nombre_cliente.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(this.state.busqueda) ||
                item.monto_pedido.toLowerCase().includes(this.state.busqueda) ||
                item.medio_pago.toLowerCase().includes(this.state.busqueda) ||
                item.banco.toLowerCase().includes(this.state.busqueda) ||
                item.fecha_deposito.toLowerCase().includes(this.state.busqueda) ||
                item.tipo_documento.toLowerCase().includes(this.state.busqueda) ||
                item.num_transaccion.toLowerCase().includes(this.state.busqueda) ||
                item.num_documento.toLowerCase().includes(this.state.busqueda) ||
                item.fecha_entrega.toLowerCase().includes(this.state.busqueda) ||
                item.lugar_entrega.toLowerCase().includes(this.state.busqueda)
                
                ){
                    return item;
                }
                
            });
            this.setState({pedidos: search});
        }

        componentDidMount(){
            this.setState({pedidos: pedidos });
        }

        render(){
            return (
                <Fragment>


                    {/* Campo BUSCADOR */}
                    <div className="barraBusqueda">
                        <input
                        type="text"
                        placeholder="Buscar"
                        className="textField"
                        name="busqueda"
                        value={this.state.busqueda}
                        onChange={this.onChange}
                        />

                        <button type="button" className="btnBuscar" /*onClick={onClear}*/>
                            {" "}
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                
                    {/* MUESTRA TABLA */}
                    <div className= "table-responsive" >
                        <DataTable
                            columns={columnas}
                            /* data={pedidos} */
                            data={this.state.pedidos}
                            title="Listado de Pedidos"
                            pagination
                            paginationComponentOptions={pagOpciones}
                            fixedHeader
                            fixedHeaderScrollHeight="600px"
 
                            noDataComponent={<p>No se encontro ningún elemento</p>}
                        />
                    </div>
                </Fragment>
            )
        }
    }
 
     return ( 
        <Fragment>

           
         <ul className="listado-pedidos">

             { alerta   ? ( <div className={`alerta ${alerta.categoria} `}>{alerta.msg}</div>  ) : null  }

         </ul>      

            <Tabla />
        

        </Fragment>
     );
}
 
export default RegistroPedidos;
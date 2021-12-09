import React, { useContext, Fragment, useEffect, Component } from 'react';
import pedidoContext from '../../context/pedidos/pedidoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import tareaContext from '../../context/tareas/tareaContext';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice, faTruck, faDollarSign } from "@fortawesome/free-solid-svg-icons";

import styled from '@emotion/styled';
import Boton from '../ui/Boton';




const Encabezado = styled.p`
    font-family: 'PT Sans', sans-serif;
    color: var(--gris2);
    font-weight: bold;
    font-size: 1.5rem;
`;

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
     /* if(pedidos.length === 0 ) return <h1>Cargando listado de Pedidos...</h1> */
     if(pedidos.length === 0 ) return (
     
            <div><h1>Cargando listado de Pedidos...</h1><div class="d-flex justify-content-center">
            <div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></div>
     
     ) 

     

    const columnas = [
        {
            name: 'ID',
            selector: '_id',
            sortable: false,
            omit: true,
        },
        {
            name: 'Creado',
            selector: 'creado',
            sortable: true,
            omit: true,
        },
        {
            name: <Encabezado>#Pedido</Encabezado>,
            selector: 'num_pedido',
            sortable: false,
            /** Boton para llamar el Pedido **/
            cell: row => <button
            className='btn'
            raised primary onClick={() => seleccionarPedido(row._id)}>
            {row.num_pedido}
            </button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            grow: 0

        },
        {
            name: <Encabezado>Nombre del Cliente</Encabezado>,
            selector: 'nombre_cliente',
            sortable: false,
            grow: 0.5
            
        },
        {
            name: <Encabezado>Monto$</Encabezado>,
            selector: 'monto_pedido',
            sortable: false,
            grow: 0
        },
        /* {
            name: 'Medio de Pago',
            selector: 'medio_pago',
            sortable: true,
            grow: 0
        }, */
        {
            name: <Encabezado>Banco</Encabezado>,
            selector: 'banco',
            sortable: false,
            grow: 0
        },
        {
            name: <Encabezado>Fecha Deposito</Encabezado>,
            selector: 'fecha_deposito',
            sortable: false,
            grow: 0
        },
        
        /* {
            name: 'Tipo de Documento',
            selector: 'tipo_documento',
            sortable: true,
            grow: 0
        }, */
        {
            name: <Encabezado>N° Identificador</Encabezado>,
            selector: 'num_transaccion',
            sortable: false,
            grow: 0.3
            
        },
        {
            name: <Encabezado>Fecha Confirmado</Encabezado>,
            selector: 'fecha_confirmacion',
            sortable: false,
            grow: 0.2
        },
        {
            name: <Encabezado>Creador por:</Encabezado>,
            selector: 'creador.nombre',
            sortable: false,
            grow: 0.1
        },
        
        /* {
            name: 'N° Documento',
            selector: 'num_documento',
            sortable: false,
            grow: 0
        },
        {
            name: 'Fecha de Entrega',
            selector: 'fecha_entrega',
            sortable: false,
            grow: 0
        },
        {
            name: 'Lugar de Entrega',
            selector: 'lugar_entrega',
            sortable: false,
            grow: 0
        }, */
        {
            name: <Encabezado>Pago</Encabezado>,
            selector: 'confirma_pago',
            cell: row => <div className="estado">{row.confirma_pago 
                ?  
                    (
                        <button
                        className="iconoCompleto"
                        ><FontAwesomeIcon icon={faDollarSign} /></button>
                        
                    )
                : 
                    (
                        <button 
                        className="iconoIncompleto"
                        ><FontAwesomeIcon icon={faDollarSign} /></button>
                    )
                }
            
            </div>,
            sortable: true,
            grow: 0
            
            
        },
       
        {
            name: <Encabezado>Fact</Encabezado>,
            selector: 'estado_pedido',
            cell: row => <div className="estado">{row.estado_pedido 
                ?  
                    (
                        <button
                        className="iconoCompleto"
                        ><FontAwesomeIcon icon={faFileInvoice} /></button>
                    )
                : 
                    (
                        <button 
                        className="iconoIncompleto"
                        ><FontAwesomeIcon icon={faFileInvoice} /></button>
                    )
                }
            
            </div>,
            sortable: true,
            grow: 0
            
            
        },

        {
            name: <Encabezado>Ent</Encabezado>,
            selector: 'estado_despacho',
            cell: row =>  <div className="estado">
            {row.estado_despacho 
            ?  
                (
                    <button
                        type="button"
                        className="iconoCompleto"
                    ><FontAwesomeIcon icon={faTruck} /></button>
                )
            : 
                (
                    <button
                        type="button"
                        className="iconoIncompleto"
                    ><FontAwesomeIcon icon={faTruck} /></button>
                )
            }
            </div>,
            sortable: true,
            grow: 0
        
            
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
                item.banco.toLowerCase().includes(this.state.busqueda) ||
                item.fecha_deposito.toLowerCase().includes(this.state.busqueda) ||
                item.creador.nombre.toLowerCase().includes(this.state.busqueda) ||
                item.num_transaccion.toLowerCase().includes(this.state.busqueda) 
                /* item.num_documento.toLowerCase().includes(this.state.busqueda) ||
                item.fecha_entrega.toLowerCase().includes(this.state.busqueda) ||
                item.lugar_entrega.toLowerCase().includes(this.state.busqueda) */
                
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

                    <nav class="navbar navbar-light bg-light justify-content-between mt-5">
                        <form>
                        <button class="btn " type="submit"><Encabezado>Actualizar Listado</Encabezado></button>

                        </form>
                        <form class="form-inline">
                        
                        <input
                                type="text"
                                placeholder="Buscar"
                                className="border border-primary rounded"
                                name="busqueda"
                                value={this.state.busqueda}
                                onChange={this.onChange}
                            />
                            
                        </form>
                    </nav>
                    
                
                    {/* MUESTRA TABLA */}
                    
                        <DataTable
                            expandibleRows
                            columns={columnas}
                            data={this.state.pedidos}
                            pagination
                            paginationComponentOptions={pagOpciones}
                            fixedHeader
                            fixedHeaderScrollHeight="1000px"
                            noDataComponent={<p>No se encontro ningún elemento</p>}
                        />
                   
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
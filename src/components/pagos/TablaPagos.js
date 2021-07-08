import React, { useContext, Fragment, useEffect, Component } from "react";
import pagoContext from "../../context/pagos/pagoContext";
import AlertaContext from "../../context/alertas/alertaContext";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import VistaPago from "./VistaPago";

const TablaPagos = () => {
  // Extraer pagos del state inicial
  const PagosContext = useContext(pagoContext);
  const { pagos, obtenerPagos, pagoActual } = PagosContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta } = alertaContext;

  const seleccionarPago = (id) => {
    pagoActual(id);
  };

  useEffect(() => {
    obtenerPagos();
    // eslint-disable-next-line
  }, []);

  // revisar si pagos tiene contenido
  if (pagos.length === 0) return <h1>No hay pagos Registrados</h1>;

  const columnas = [
    {
      name: "ID",
      selector: "_id",
      sortable: true,
      omit: true,
    },

    {
      name: "#Pedido",
      selector: "num_pedido_pago",
      sortable: true,
      grow: 1,
      /** Boton para llamar el Pedido **/
      cell: (row) => (
        <button
          className="btn btn-blank"
          raised
          primary
          onClick={() => seleccionarPago(row._id)}
        >
          {row.num_pedido_pago}
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },

    {
      name: "Cliente",
      selector: "nombre_cliente",
      sortable: true,
      grow: 2,
    },
    {
      name: "Monto",
      selector: "monto_pedido",
      sortable: true,
    },
    {
      name: "Medio de pago",
      selector: "medio_pago",
      sortable: true,
    },
    {
      name: "Banco",
      selector: "banco",
      sortable: true,
    },
    {
      name: "Fecha del Pago",
      selector: "fecha_pago",
      sortable: true,
    },
    {
      name: 'Estado',
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
      grow: 1
      
  },
    {
      name: "Confirmado Por",
      selector: "confirmado_por",
      sortable: true,
    },
    
  ];

  const pagOpciones = {
    rowsPerPageText: "Filas por pagina",
    rangeSeparatorText: " de ",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  class Tabla extends Component {
    //Buscador
    state = {
      busqueda: "",
      pagos: [],
    };

    onChange = async (e) => {
      e.persist();
      await this.setState({ busqueda: e.target.value });
      this.filtrarElementos();
    };

    filtrarElementos = () => {
      var search = pagos.filter((item) => {
        if (
          item.num_pedido_pago.toLowerCase().includes(this.state.busqueda) ||
          item.nombre_cliente
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(this.state.busqueda) ||
          item.monto_pedido.toLowerCase().includes(this.state.busqueda) ||
          item.medio_pago.toLowerCase().includes(this.state.busqueda) ||
          item.banco.toLowerCase().includes(this.state.busqueda) ||
          item.fecha_pago.toLowerCase().includes(this.state.busqueda)
          
        ) {
          return item;
        }
      });
      this.setState({ pagos: search });
    };

    componentDidMount() {
      this.setState({ pagos: pagos });
    }

    render() {
      return (
        <Fragment>
          <VistaPago />

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
          <div className="table-responsive">
            <DataTable
              columns={columnas}
              /* data={pagos} */
              data={this.state.pagos}
              title="Listado de Pagos"
              pagination
              paginationComponentOptions={pagOpciones}
              fixedHeader
              fixedHeaderScrollHeight="600px"
              noDataComponent={<p>No se encontro ningún elemento</p>}
            />
          </div>
        </Fragment>
      );
    }
  }

  return (
    <Fragment>
      <ul className="listado-pedidos">
        {alerta ? (
          <div className={`alerta ${alerta.categoria} `}>{alerta.msg}</div>
        ) : null}
      </ul>

      <Tabla />
    </Fragment>
  );
};

export default TablaPagos;

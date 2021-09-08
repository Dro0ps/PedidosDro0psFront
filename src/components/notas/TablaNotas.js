import React, { useContext, Fragment, useEffect, Component } from "react";
import notaContext from "../../context/notas/notaContext";
import AlertaContext from "../../context/alertas/alertaContext";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import VistaNota from "./VistaNota";

const TablaNotas = () => {
  // Extraer notas del state inicial
  const NotasContext = useContext(notaContext);
  const { notas, obtenerNotas, notaActual } = NotasContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta } = alertaContext;

  const seleccionarNota = (id) => {
    notaActual(id);
  };

  useEffect(() => {
    obtenerNotas();
    // eslint-disable-next-line
  }, []);

  // revisar si notas tiene contenido
  if (notas.length === 0) return <h1>No hay notas Registrados</h1>;

  const columnas = [
    {
      name: "ID",
      selector: "_id",
      sortable: true,
      omit: true,
    },

    {
      name: "#Nota",
      selector: "num_notaCredito",
      sortable: true,
      grow: 1,
      /** Boton para llamar el Nota **/
      cell: (row) => (
        <button
          className="btn btn-blank"
          raised
          primary
          onClick={() => seleccionarNota(row._id)}
        >
          {row.num_notaCredito}
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },

    {
      name: "Cliente",
      selector: "rut_clienteNotaCredito",
      sortable: true,
      grow: 2,
    },
    {
      name: "Monto",
      selector: "monto_notaCredito",
      sortable: true,
    },
    {
      name: "Fecha de NC",
      selector: "fecha_notaCredito",
      sortable: true,
    },
    {
      name: 'Estado',
      selector: 'estado_notaCredito',
      cell: row => <div className="estado">{row.estado_notaCredito 
          ?  
              (
                  <button
                  className="completo"
                  >PENDIENTE</button>
              )
          : 
              (
                  <button 
                  className=""
                  >COBRADA</button>
              )
          }
      
      </div>,
      sortable: true,
      grow: 1
      
  }
    
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
      notas: [],
    };

    onChange = async (e) => {
      e.persist();
      await this.setState({ busqueda: e.target.value });
      this.filtrarElementos();
    };

    filtrarElementos = () => {
      var search = notas.filter((item) => {
        if (
          item.num_notaCredito.toLowerCase().includes(this.state.busqueda) ||
          item.rut_clienteNotaCredito
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(this.state.busqueda) 
          
        ) {
          return item;
        }
      });
      this.setState({ notas: search });
    };

    componentDidMount() {
      this.setState({ notas: notas });
    }

    render() {
      return (
        <Fragment>
          <VistaNota />

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
              /* data={notas} */
              data={this.state.notas}
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

export default TablaNotas;

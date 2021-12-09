import React, { useContext, Fragment, useEffect, Component } from "react";
import revisionContext from "../../context/revisiones/revisionContext";
import AlertaContext from "../../context/alertas/alertaContext";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import VistaRevision from "./VistaRevision";


const TablaRevisiones = () => {
  // Extraer revisiones del state inicial
  const RevisionesContext = useContext(revisionContext);
  const { revisiones, obtenerRevisiones, revisionActual } = RevisionesContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta } = alertaContext;

  const seleccionarRevision = (id) => {
    revisionActual(id);
  };

  useEffect(() => {
    obtenerRevisiones();
    // eslint-disable-next-line
  }, []);

  // revisar si revisiones tiene contenido
  if (revisiones.length === 0) return <h1>No hay revisiones Registrados</h1>;

  const columnas = [
    {
      name: "ID",
      selector: "_id",
      sortable: true,
      omit: true,
    },

    {
      name: "#Documento",
      selector: "doc_revisado",
      sortable: true,
      grow: 1,
      /** Boton para llamar la Revision **/
      cell: (row) => (
        <button
          className="btn btn-blank"
          raised
          primary
          onClick={() => seleccionarRevision(row._id)}
        >
          {row.doc_revisado}
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },

    {
      name: "Fecha de Revisión",
      selector: "fecha_revisado",
      sortable: true,
      grow: 2,
    },
    {
      name: "Revisado Por:",
      selector: "revisado_por",
      sortable: true,
      grow: 2,
    },
    
    {
      name: 'Estado',
      selector: 'revisado',
      cell: row => <div className="estado">{row.revisado 
          ?  
              (
                  <button
                  className="completo"
                  >Revisado</button>
              )
          : 
              (
                  <button 
                  className=""
                  >Pendiente</button>
              )
          }
      
      </div>,
      sortable: true,
      grow: 0
      
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
      revisiones: [],
    };

    onChange = async (e) => {
      e.persist();
      await this.setState({ busqueda: e.target.value });
      this.filtrarElementos();
    };

    filtrarElementos = () => {
      var search = revisiones.filter((item) => {
        if (
          item.doc_revisado.toLowerCase().includes(this.state.busqueda) ||
          item.fecha_revisado
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(this.state.busqueda) ||
          item.revisado_por
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(this.state.busqueda) 
          
        ) {
          return item;
        }
      });
      this.setState({ revisiones: search });
    };

    componentDidMount() {
      this.setState({ revisiones: revisiones });
    }

    render() {
      return (
        <Fragment>
          <VistaRevision />

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
              /* data={revisiones} */
              data={this.state.revisiones}
              title="Pedidos Revisados"
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

export default TablaRevisiones;

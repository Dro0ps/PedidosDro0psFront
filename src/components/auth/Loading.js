import React from "react";
import { Spinner } from "reactstrap";

const Loading = () => {
  return (
    <div className="container marginP">
      {/* <Spinner color="dark"/> */}
      <div>
      <h1>HOMAR <span>Pedidos</span></h1>
      <div class="d-flex justify-content-center ">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default Loading;

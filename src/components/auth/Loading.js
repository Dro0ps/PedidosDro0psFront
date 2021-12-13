import React from "react";


const Loading = () => {
  return (
    <div className="container marginP">
      {/* <Spinner color="dark"/> */}
      <div>
      <h1>HOMAR <span>Pedidos</span></h1>
      <div class="d-flex justify-content-center ">
      <div class="spinner-border"></div>
      </div>
      </div>
      
    </div>
  );
};

export default Loading;

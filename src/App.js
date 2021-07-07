import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Pedidos from './components/pedidos/Pedidos';
import EditarPedido from './components/pedidos/editar/EditarPedido';
import Loading from './components/auth/Loading';

import PedidoState from './context/pedidos/pedidoState';
import TareaState from './context/tareas/tareaState';
import PagoState from './context/pagos/pagoState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';
import RegistroPedidos from './components/tablas/RegistroPedidos';
import Pagos from './components/pagos/Pagos';


// Revisar si tenemos un token
const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}

function App() {
  return (
    <PedidoState>
      <TareaState>
        <PagoState>
        <AlertaState>
          <AuthState>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/nueva-dro0ps" component={NuevaCuenta} />
                    <Route exact path="/Loading" component={Loading} />
                    <RutaPrivada exact path="/pedidos" component={Pedidos} />
                    <RutaPrivada exact path="/registros" component={RegistroPedidos} />
                    <RutaPrivada exact path="/edita" component={EditarPedido} />
                    <RutaPrivada exact path="/pagos" component={Pagos} />
                </Switch>
            </Router>
          </AuthState>
        </AlertaState>
        </PagoState>
      </TareaState>
    </PedidoState>
  );
}

export default App;

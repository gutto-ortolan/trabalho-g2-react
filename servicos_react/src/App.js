import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Menu from './pages/Menu'
import Perfil from './pages/Perfil'
import MeusServicos from './pages/profissional/MeusServicos'
import ServicosContratadosProfissional from './pages/profissional/ServicosContratadosProfissional'
import PesquisarProfissional from './pages/cliente/PesquisarProfissional'
import ServicosContratadosCliente from './pages/cliente/ServicosContratadosCliente'



export default function App() {

  const PrivateRoute = ({ component: Component}) => {

    return <Route
      render={(props => {
        let isAuthenticated = sessionStorage.getItem("uuid")
        if (isAuthenticated) {
          return <Component {...props} />
        } else {
          return <Redirect to={{ pathname: "/" }} />
        }
      })}

    />
  }


  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/cadastrar" component={Cadastro} />
        <PrivateRoute path="/menu" component={Menu} />
        <PrivateRoute path="/meus-servicos" component={MeusServicos} />
        <PrivateRoute path="/servicos-contratados-profissional" component={ServicosContratadosProfissional} />
        <PrivateRoute path="/perfil" component={Perfil} />
        <PrivateRoute path="/pesquisar-profissional" component={PesquisarProfissional} />
        <PrivateRoute path="/servicos-contratados-cliente" component={ServicosContratadosCliente} />
      </Switch>

    </HashRouter>
  )
}

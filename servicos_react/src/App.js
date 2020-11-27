import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Menu from './pages/Menu'


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

      </Switch>

    </HashRouter>
  )
}

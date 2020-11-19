import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import { useSelector } from 'react-redux'
import { UI } from './redux'
import './App.css'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import ProtectedRoute from './util/ProtectedRoute'
import { Dark, Light } from './util/Themes/Theme'


import Dashboard from './pages/Dashboard'
import Reservations from './pages/Reservations'
import Products from './pages/Products'
import Orders from './pages/Orders'

import Nav from './layout/Nav'
import Login from './pages/Login'

import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL

function App() {
  let theme = useSelector(UI.Selectors.isDarkTheme)
  React.useEffect(() => {
    if (theme) {
      localStorage.setItem('dark', theme)
    }
  }, [theme])

  return (
    <MuiThemeProvider theme={theme ? Dark : Light}>
      <CssBaseline />
      <Router basename="/backoffice">
        <Nav />
        <div className="container">
          <Switch>
            <ProtectedRoute exact path="/" component={Dashboard} />
            <ProtectedRoute exact path="/reserveringen" component={Reservations} />
            <ProtectedRoute exact path="/producten" component={Products} />
            <ProtectedRoute exact path="/orders" component={Orders} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  )
}

export default App

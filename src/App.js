import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Movies from './components/movies'
import Customers from './components/customers'
import Rentals from './components/rental';
import NotFound from './components/notFound';
import NavBar from './components/common/navBar';
import MovieForm from './components/movieForm'
import LoginForm from './components/common/loginForm';
import RegisterForm from './components/common/RegisterForm'
import './App.css';


class App extends Component {
 
  render() {
    return (
      <div>
        <NavBar />
        <div className="content">
            <Switch>
              <Route path="/register" component={RegisterForm}/>
              <Route path="/login" component={LoginForm}/>
              <Route path="/movies/:id"  component={MovieForm}/>
              <Route path="/movies"  component={Movies}/>
              <Route path="/customers" component={Customers}/>
              <Route path="/rental" component={Rentals}/>
              <Route path="/notFound"  component={NotFound}/>
              <Redirect from="/" exact to="/movies" />
              <Redirect to="/notFound" />
            </Switch>      
        </div>
      </div>
    )
  }
}

export default App;


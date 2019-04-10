import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Movies from './components/movies'
import Customers from './components/customers'
import Rentals from './components/rental';
import NotFound from './components/notFound';
import NavBar from './components/common/navBar';
import MovieForm from './components/movieForm'
import LoginForm from './components/common/loginForm';
import LogOut from './components/logout';
import RegisterForm from './components/common/RegisterForm'
import auth from './services/authService'
import 'react-toastify/dist/ReactToastify.css'
import './App.css';


class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user })
  }
  
  render() {
    const {user} = this.state;
    return (
      <div>
        <ToastContainer />
        <NavBar user={user} />
        <div className="content">
            <Switch>
              <Route path="/register" component={RegisterForm}/>
              <Route path="/login" component={LoginForm}/>
              <Route path="/logout" component={LogOut}/>
              <Route 
                path="/movies/:id"  
                render={props => {
                  if(!user) return <Redirect to="/login" />;
                  return <MovieForm {...props} />
                }}/>
              <Route 
                path="/movies"  
                render={props => <Movies {...props} user={this.state.user}/>}
              />
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


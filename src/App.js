// React & Styling.
import React, { Component } from 'react';

// Switch & Route
import { Route, Switch, BrowserRouter } from "react-router-dom";

// App Styling.
import './App.css';

// Redux & Actions
import { connect } from 'react-redux';

// Components
import Login from './components/login/login';
import System from './components/system/system';

// Actions
import { Retrieving_information_from_server } from './store/actions/monitoring';



class App extends Component {
  componentDidMount() {
    this.props.device_information()
  }


  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div className="App">
            <div>
              <Switch>
              {/* Checking the connection status */}
                {
                  this.props.login.login_mode ? 
                    <Route path='/' component={System} />
                    : 
                    <Route path='/' component={Login} />
                }
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = dispatch => {
  return {
      device_information: () => dispatch(Retrieving_information_from_server())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

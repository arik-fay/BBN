// React 
import React from 'react';

// Styling
import './system.css';

// Import from antd


// Route - Link
// Switch & Route
import { Route, Switch, Link } from "react-router-dom";

// Redux & Actions
import { connect } from 'react-redux';
// import { input_change_action, user_authentication } from '../../store/actions/system';

// Components
import Home from './home/home';
import Monitoring from './monitoring/monitoring';
import Configure from './configure/configure';



const system = (props) => {
    // Variables Reducer (Store)

    return (
        <div id='system'>
            <div id='menu'>
                <ul>
                    <li><a href="#Logout" id='menu_tab'><Link to="/Logout">Logout</Link></a></li>
                    <li><a href="#Home" id='menu_tab'><Link to="/Home">Home</Link></a></li>
                    <li><a href="#Monitoring" id='menu_tab'><Link to="/Monitoring">Monitoring</Link></a></li>
                    <li><a href="#Configure" id='menu_tab'><Link to="/Configure">Configure</Link></a></li>
                </ul>
            </div>
            <div id='system_container'>
                <div id='system_content'>
                    <Switch>
                        <Route exact path='/Home' component={Home} />
                        <Route  path='/Monitoring' component={Monitoring} />
                        <Route  path='/Configure' component={Configure} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        system: state.system
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(system);
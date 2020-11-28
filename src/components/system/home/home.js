// React 
import React from 'react';

// Styling
import './home.css';

// Import from antd

// Route - Link
import { Link } from "react-router-dom";

// Redux & Actions
import { connect } from 'react-redux';
import { Switch } from '@material-ui/core';
// import { input_change_action, user_authentication } from '../../store/actions/home';


const home = (props) => {
    // Variables Reducer (Store)

    return (
        <div id='home'>
            Home
        </div>
    )
}

const mapStateToProps = state => {
    return {
        home: state.home
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(home);
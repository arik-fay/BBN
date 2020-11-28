// React 
import React from 'react';

// Styling
import './configure.css';

// Import from antd

// Route - Link
import { Link } from "react-router-dom";

// Redux & Actions
import { connect } from 'react-redux';
import { Switch } from '@material-ui/core';
// import { input_change_action, user_authentication } from '../../store/actions/configure';


const configure = (props) => {
    // Variables Reducer (Store)

    return (
        <div id='configure'>
            configure
        </div>
    )
}

const mapStateToProps = state => {
    return {
        configure: state.configure
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(configure);
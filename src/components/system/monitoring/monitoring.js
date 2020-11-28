// React 
import React, { Component } from 'react';

// Styling
import './monitoring.css';

// Import from antd

// Route - Link
import { Link } from "react-router-dom";

// Redux & Actions
import { connect } from 'react-redux';
import { Retrieving_information_from_server } from '../../../store/actions/monitoring';

// Components
import List from './list/list';
import Details from './details/details';
import Statistics from './statistics/statistics';




class monitoring extends Component {
    componentDidMount() {
        this.props.device_information()
      }
    render() {
        return (
            <div id='monitoring'>
                <div id="grid-container">
                    <div className="list_area grid_devices_style"><List /></div>
                    <div className="device_details grid_devices_style"><Details /></div>
                    <div className="device_statistics grid_devices_style"><Statistics /></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        monitoring: state.monitoring
    }
}

const mapDispatchToProps = dispatch => {
    return {
        device_information: () => dispatch(Retrieving_information_from_server())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(monitoring);
// React 
import React, { useState } from 'react';

// Styling
import './details.css';

// Import from antd
import { Progress } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';


// Image import
import router_image from '../../../../accessories/router logo.png';
import switch_image from '../../../../accessories/Network-Switch-icon.png';


// Route - Link
import { Link } from "react-router-dom";

// Redux & Actions
import { connect } from 'react-redux';


const details = (props) => {

    // Variables Reducer (Store)
    const { component_displayed } = props.monitoring;

    if (component_displayed != null) {
        if (component_displayed.cpu > 70) {
            var cpu_id = 'exception'
        }
        else var cpu_id = 'active'
        if (component_displayed.memory > 70) {
            var memory_id = 'exception'
        }
        else var memory_id = 'active'
        if (component_displayed.storage > 70) {
            var storage_id = 'exception'
        }
        else var storage_id = 'active'
    }

    return (
        <div id="details_container">
            <div id='possible_actions'>
                <h3 className='control_btn'>Inspect Component</h3>
                <h3 className='buffer_line'> | </h3>
                <h3 className='control_btn'>CLI</h3>
                <h3 className='buffer_line'> | </h3>
                <h3 className='control_btn'>Reset</h3>
                <h3 className='buffer_line'> | </h3>
                <h3 className='control_btn'>Interface Satistics</h3>
            </div>
            { component_displayed ?
                <img id='router_image' src={router_image} alt="router_image" />
                : null}
            { component_displayed ?
                <div id='router_details'>
                    <h3 >{component_displayed.host_name}</h3>
                    <div id='shortened_details' ><h3 id='details_title'>IP Address:   </h3> <title id='details_title'>{component_displayed.ip_address}</title></div>
                    <div id='shortened_details' ><h3 id='details_title'>Version:   </h3>    <title id='details_title'>{component_displayed.version}</title></div>
                    <div id='shortened_details' ><h3 id='details_title'>Up Time:   </h3>    <title id='details_title'>{component_displayed.uptime}</title></div>
                </div>
                : null}
            { component_displayed ?
                <div id='extensive_details'>
                    <h3 id='extensive_progress'>cpu:</h3>
                    <Progress  percent={component_displayed.cpu} status={cpu_id} />
                    <h3 id='extensive_progress'>memory:</h3>
                    <Progress  percent={component_displayed.memory} status={memory_id}/>
                    <h3 id='extensive_progress'>storage:</h3>
                    <Progress  percent={component_displayed.storage} status={storage_id } />
                </div>
                : null}
        </div>

    )
}

const mapStateToProps = state => {
    return {
        monitoring: state.monitoring
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(details);
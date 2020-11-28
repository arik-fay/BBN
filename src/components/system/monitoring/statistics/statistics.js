// React 
import React, { useState } from 'react';

// Styling
import './statistics.css';

// Import from antd


// Route - Link
import { Link } from "react-router-dom";

// Redux & Actions
import { connect } from 'react-redux';
// import { Retrieving_component_information } from '../../../../store/actions/monitoring';

// Components
import Topology from './topology/topology';


const Statistics = (props) => {
    // Variables Reducer (Store)
    const { component_displayed } = props.monitoring;
    var flag_ospf_neighbors = false;
    var flag_bgp_neighbors = false;
    for (var i in component_displayed){
        if(i === 'ospf_neighbors')
            flag_ospf_neighbors = true
        if(i === 'bgp_neighbors')
            flag_bgp_neighbors = true
    }


    return (
        <div id='statistics'>
        <div id="statistics_container">
            {flag_ospf_neighbors === true ?
            <div className='ospf_neighbors details_windows'>
                <h3 id="neighbor">OSPF Neighbor</h3>   
                <ul id="neighbors_list">
                    {
                    component_displayed.ospf_neighbors.map(neighbor =>
                    <li>{neighbor}</li>
                        ) 
                    }
                </ul>
            </div>
            : null}
            {flag_bgp_neighbors === true ?
            <div className='bgp_neighbors details_windows'>
                <h3 id="neighbor">BGP Neighbor</h3>
                <ul id="neighbors_list">
                    {
                    component_displayed.bgp_neighbors.map(neighbor =>
                    <li>{neighbor}</li>
                        ) 
                    }
                </ul>
            </div>
            : null}
            <div className='topology'><Topology/></div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
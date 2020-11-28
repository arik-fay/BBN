// React & Styling
import React from 'react';
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";

import './topology.css';
import { connect } from 'react-redux';


import Draggable from 'react-draggable';

// need to import the vis network css in order to show tooltip

const topology = (props) => {
    const { component_displayed } = props.monitoring;
    var flag_ospf_neighbors = false;
    var flag_bgp_neighbors = false;
    for (var i in component_displayed){
        if(i === 'ospf_neighbors')
            flag_ospf_neighbors = true
        if(i === 'bgp_neighbors')
            flag_bgp_neighbors = true
    }

    const graph = {
        nodes: [
            { id: "RTR-DST-1-100R", label: "RTR-DST-1-100R", color: "#A4C7E6", ip: "192.168.1.1", shape : 'circle'  },
            { id: "RTR-DST-2-100R", label: "RTR-DST-2-100R", color: "#A4C7E6", ip: "192.168.1.2", shape: 'circle' },
            { id: "RTR-DST-1-169", label: "RTR-DST-1-169", color: "#A4C7E6", ip: "192.168.2.1", shape: 'circle' },
            // { id: "RTR-DST-2-169", label: "RTR-DST-2-169", color: "#A4C7E6", ip: "192.168.2.2", shape: 'circle' },
            { id: "RTR-DST-1-350R", label: "RTR-DST-1-350R", color: "#A4C7E6", ip: "192.168.3.1", shape: 'circle' },
            // { id: "RTR-DST-2-350R", label: "RTR-DST-2-350R", color: "#A4C7E6", ip: "192.168.3.2", shape: 'circle' },
            { id: "RTR-DST-1-400R", label: "RTR-DST-1-400R", color: "#A4C7E6", ip: "192.168.4.1", shape: 'circle' },
            // { id: "RTR-DST-2-400R", label: "RTR-DST-2-400R", color: "#A4C7E6", ip: "192.168.4.2", shape: 'circle' }
        ],
        edges: [
            { from: "RTR-DST-1-100R", to: "RTR-DST-2-100R" , color: 'green' },
            { from: "RTR-DST-1-100R", to: "RTR-DST-1-169" , color: 'green' },
            { from: "RTR-DST-1-100R", to: "RTR-DST-1-350R" , color: 'green' },
            { from: "RTR-DST-1-100R", to: "RTR-DST-1-400R" , color: 'green' },
        ]
    };

    const options = {
        layout: {
            hierarchical: false
        },
        edges: {
            color: "#000000"
        }
    };

    const events = {
        select: function (event) {
            var { nodes, edges } = event;
            for (var i in graph.nodes){
                var node_click = JSON.stringify(graph.nodes[i].id).replace(/(^"|"$)/g, '');;
                if ( nodes[0] == node_click){
                    console.log(`i : ${JSON.stringify(graph.nodes[i])}`) 
                }
            }
        }
    };
    return (
        <div className='topology'>
            {flag_ospf_neighbors && flag_bgp_neighbors ?
            <div id='topology_Container'>
                <Graph graph={graph} options={options} events={events} style={{ height: "100%" }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(topology);
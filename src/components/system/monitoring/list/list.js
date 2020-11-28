// React 
import React, { useState } from 'react';

// Styling
import './list.css';

// Import from antd
import { Tree, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';





// Route - Link
import { Link } from "react-router-dom";

// Redux & Actions
import { connect } from 'react-redux';
import { Retrieving_component_information, update_items_to_delete_action, delete_items_action } from '../../../../store/actions/monitoring';


window.onload = console.log('refresh');

const List = (props) => {

    // Variables Reducer (Store)
    var { devices_information, sites_to_delete, items_to_delete } = props.monitoring;
    var x; var y; var z;
    var data_core = [];
    var data_access = [];
    var tree_data = [];


    for (x = 0; x < devices_information.core_sites.length; x++) {
        var site_data = []
        for (y in devices_information.core_sites[x]) {
            site_data.push({ "site_number": y })
            for (z = 0; z < devices_information.core_sites[x][y].length; z++) {
                site_data.push(devices_information.core_sites[x][y][z])
            }
        }
        data_core.push(site_data)
    }


    for (x = 0; x < devices_information.core_sites.length; x++) {
        for (y in devices_information.core_sites[x]) {
            tree_data.push({
                title: y,
                key: y,
                children: []
            })
            for (z = 0; z < devices_information.core_sites[x][y].length; z++) {
                tree_data[x].children.push({
                    title: devices_information.core_sites[x][y][z].host_name,
                    key: devices_information.core_sites[x][y][z].host_name,
                })
            }
        }
    }

    for (x = 0; x < devices_information.access_sites.length; x++) {
        var site_data = []
        for (y in devices_information.access_sites[x]) {
            site_data.push({ "site_number": y })
            for (z = 0; z < devices_information.access_sites[x][y].length; z++) {
                site_data.push(devices_information.access_sites[x][y][z])
            }
        }
        data_access.push(site_data)
    }


    for (x = 0; x < devices_information.access_sites.length; x++) {
        for (y in devices_information.access_sites[x]) {
            tree_data.push({
                title: y,
                key: y,
                children: []
            })
            for (z = 0; z < devices_information.access_sites[x][y].length; z++) {
                tree_data[x + devices_information.core_sites.length].children.push({
                    title: devices_information.access_sites[x][y][z].host_name,
                    key: devices_information.access_sites[x][y][z].host_name,
                })
            }
        }
    }

    
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
    
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
      };
    
      const onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        setCheckedKeys(checkedKeys);
    //     var include_item_in_site_flag = false;
    //     for (var i=0 ; i < checkedKeys.length ; i++ ){
    //         console.log('i', checkedKeys[i])
    //         if ( !(checkedKeys[i].includes('RTR') || checkedKeys[i].includes('SW')) ){
    //             console.log(`site number ${checkedKeys[i]} for deletion`);
    //             // sites_to_delete.push(checkedKeys[i])
    //             props.update_items_to_delete('sites_to_delete',checkedKeys[i] )
    //         }
    //     }
    //     for (var i=0 ; i < checkedKeys.length ; i++ ){
    //         for ( var x=0 ; x < sites_to_delete.length ; x++ ){
    //             if( checkedKeys[i].includes(sites_to_delete[x]) )
    //                 {
    //                     include_item_in_site_flag=true;
    //                     continue;
    //                 }
    //         }
    //         if (include_item_in_site_flag === false){
    //             // items_to_delete.push(checkedKeys[i])
    //             props.update_items_to_delete('items_to_delete',checkedKeys[i] )
    //         }
    //         include_item_in_site_flag = false;
    //     }

    //     console.log('items_to_delete',items_to_delete)
    //     console.log('sites_to_delete',sites_to_delete)
      };

      const onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        console.log(`hostname router ${info.node.title} checked`);
        for ( var i=0 ; i<data_core.length ; i++ ){
            for( x=1  ; x < data_core[i].length ; x++){
                if(info.node.title === data_core[i][x].host_name){
                    props.post_component_information( data_core[i][x]);
                }
            }
        }
        for ( var i=0 ; i<data_access.length ; i++ ){
            for( x=1  ; x < data_access[i].length ; x++){
                if(info.node.title === data_access[i][x].host_name){
                    props.post_component_information( data_access[i][x]);
                }
            }
        }
      };

      const { confirm } = Modal;

      const showDeleteConfirm = () => {
        confirm({
          title: 'Are you sure delete this items?',
          icon: <ExclamationCircleOutlined />,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            console.log('OK');
            props.delete_items(checkedKeys);
          },
          onCancel() {
            console.log('Cancel');
          },
        })};



    return (
        <div id="list_container">
            <div id='titles'>
                <h3 className='list_title'>Monitoring</h3>
                <h3 className='list_title'>List Items</h3>
            </div>
            <div id='list_items'>
                <Tree
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={onSelect}
                    selectedKeys={selectedKeys}
                    treeData={tree_data}
                />
            </div>
            <div id='actions_buttons'>
                <div className='add_items sharing_button'><PlusOutlined id='sharing_button_font' /></div>
                <div  className='delete_items sharing_button' onClick={showDeleteConfirm}><DeleteOutlined id='sharing_button_font'/></div>
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
        post_component_information: (component_info) => dispatch(Retrieving_component_information(component_info)),
        delete_items: (checkedKeys) => dispatch(delete_items_action(checkedKeys)),
        // update_items_to_delete: (type,item) => dispatch(update_items_to_delete_action(type,item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
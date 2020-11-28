// ====== monitoring Related Actions ===== // 

import { PLACING_DEVICES_INFORMATION, DISPALYS_COMPONENT_INFORMATION, UPDATE_ITEMS_TO_DELETE } from './constants';


export const Retrieving_information_from_server = () => {
  return dispatch => {
    fetch('/devices_information', {
      method: 'POST',
    }).then(res => res.json()).then(answer => {
      var data = {
        'core_sites': Object.values(answer.core_site),
        'access_sites': Object.values(answer.access_site)
      }
      { dispatch({ type: PLACING_DEVICES_INFORMATION, payload: data }); }
    });

  }
}

export const Retrieving_component_information = (component_info) => {
  return dispatch => {
    { dispatch({ type: DISPALYS_COMPONENT_INFORMATION, payload: component_info }) }
  }
}

export const delete_items_action = (checkedKeys) => {
  console.log('action checked_keys_to_delete', checkedKeys)

  var items_to_delete = []; var sites_to_delete = [];
  var include_item_in_site_flag = false;
  for (var i = 0; i < checkedKeys.length; i++) {
    console.log('i', checkedKeys[i])
    if (!(checkedKeys[i].includes('RTR') || checkedKeys[i].includes('SW'))) {
      console.log(`site number ${checkedKeys[i]} for deletion`);
      sites_to_delete.push(checkedKeys[i])
    }
  }
  for (var i = 0; i < checkedKeys.length; i++) {
    for (var x = 0; x < sites_to_delete.length; x++) {
      if (checkedKeys[i].includes(sites_to_delete[x])) {
        include_item_in_site_flag = true;
        continue;
      }
    }
    if (include_item_in_site_flag === false) {
      items_to_delete.push(checkedKeys[i])
    }
    include_item_in_site_flag = false;
  }
  console.log('items_to_delete', items_to_delete)
  console.log('sites_to_delete', sites_to_delete)

  return dispatch => {
    fetch('/delete_items', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([items_to_delete, sites_to_delete])
    }).then(res => res.json()).then(answer => {
      var data = {
        'core_sites': Object.values(answer.core_site),
        'access_sites': Object.values(answer.access_site)
      }
      { dispatch({ type: PLACING_DEVICES_INFORMATION, payload: data }); }
    });
  }


  // return dispatch => {
  //   { dispatch({ type: UPDATE_ITEMS_TO_DELETE, payload: checkedKeys }) }
  // }
}


// export const delete_items_action = (items_to_delete, sites_to_delete) => {
//   console.log('items_to_delete, sites_to_delete', items_to_delete, sites_to_delete)
//   var delete_items = [items_to_delete, sites_to_delete];
//   return dispatch => {
//       fetch('/delete_items', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify( delete_items )
//       }).then(res => res.json()).then(answer => {
//         var data = JSON.parse(JSON.stringify(answer));
//         { dispatch({ type: PLACING_DEVICES_INFORMATION, payload: data }); }
//       });
//     }
// }


// ===== monitoring Reducer ====== // 

// Relevant Constants
import { PLACING_DEVICES_INFORMATION, DISPALYS_COMPONENT_INFORMATION, UPDATE_ITEMS_TO_DELETE } from '../../actions/monitoring/constants';

// Initial State
const initState = {
    // Information received from a server.
    devices_information: null,
    component_displayed: null,
    items_to_delete: [], 
    sites_to_delete: [],
    checked_keys_to_delete: []
}

export default (state = initState, { type, payload }) => {
    switch (type) {
        // Placing the devices information from the server.
        
        case PLACING_DEVICES_INFORMATION :
            return {
                ...state,
                devices_information: payload
            }

        case DISPALYS_COMPONENT_INFORMATION:
            return {
                ...state,
                component_displayed: payload
            }

        case UPDATE_ITEMS_TO_DELETE:
            console.log('payload', payload)


        default:
            return state;
    }
}
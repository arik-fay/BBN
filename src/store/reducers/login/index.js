// ===== Login Reducer ====== // 

// Relevant Constants
import { INPUT_CHANGE, PLACING_USER_INFORMATION, LOGIN_FAILED, USER_LOGOUT } from '../../actions/login/constants';

// Initial State
const initState = {
    // user form input fields.
    login_input: {
        username: '',
        password: ''
    },
    // Login mode.
    login_mode: false,
    // Information received from a server.
    // after user logged in, use its id to perform actions.
    user_information: {
        user_id: null,
        name: null,
        password: null,
        full_name: null,
        admin: null
    }
}

export default (state = initState, { type, payload }) => {
    switch (type) {

        // Login input value change
        case INPUT_CHANGE:
            return {
                ...state,
                login_input:   {
                    ...state.login_input,
                    [payload.field]: payload.value
                }
            }



        // User successfully Authenticated.
        // Placing the user information from the server.
        case PLACING_USER_INFORMATION :
            return {
                ...state,
                login_input: {
                    username: '',
                    password: ''
                },
                // Login mode.
                login_mode: true,
                // Information received from a server.
                // after user logged in, use its id to perform actions.
                user_information: {
                    user_id: null,
                    name: payload.username,
                    password: payload.password,
                    full_name: payload.full_name,
                    admin: payload.admin
                }
            }
        
        case LOGIN_FAILED:
            return {
                ...state,
                // Login mode.
                login_mode: false,
            }

        case USER_LOGOUT:
            {
                return {
                    ...state,
                    // Deleting variable values
                    login_input: {
                        username: null,
                        password: null
                    },
                    // User mode is offline.
                    login_mode: false,
                    // Deleting user information
                    user_information: {
                        user_id: null,
                        name: null,
                        password: null,
                        full_name: null,
                        admin: null
                    }
                }
            }

        default:
            return state;
    }
}
// ====== Login Related Actions ===== // 

import { INPUT_CHANGE, PLACING_USER_INFORMATION, LOGIN_FAILED, USER_LOGOUT } from './constants';

import { message, Space } from 'antd';


const error = () => {
    message.error('Login failed!');
  };


export const input_change_action = (e) => {
    return { type : INPUT_CHANGE, payload : { field : e.target.name, value : e.target.value }}
}

export const user_authentication = (user_data) => {
    return dispatch => {
        fetch('/user_authentication', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( user_data )
        }).then(res => res.json()).then(answer => {
          user_data = JSON.parse(JSON.stringify(answer));
          if (user_data.answer === "Verification failed!"){
                error()
                dispatch({type: LOGIN_FAILED })
            }
          else {dispatch({ type: PLACING_USER_INFORMATION, payload: user_data  });}
        });
      }
}


export const user_logout = () => {
    return dispatch => {
        dispatch({type: USER_LOGOUT})
    }
}
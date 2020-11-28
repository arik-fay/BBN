// React 
import React from 'react';

// Styling
import './login.css';

// Import from antd
import { Input, Button  } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// Route - Link
import { Link } from "react-router-dom";


// Redux & Actions
import { connect } from 'react-redux';
import { input_change_action, user_authentication } from '../../store/actions/login';


// import video background
import video_background from '../../accessories/BBN login cover.mp4';


const Login = (props) => {
    // Variables Reducer (Store)
    const { username, password } = props.login.login_input;
    if ( props.login.login_mode === true){
        <Link to='/system' />
    }
    return (
        <div id='login'>
            <video autoPlay muted >
                <source src={video_background} type='video/mp4' />
            </video>
            <div id='login_container'>
                <div id='form'>
                    <div id='input_container'>
                        <title>User name</title>
                        <Input 
                            prefix={<UserOutlined />}
                            id='input_value'
                            name='username'
                            value={username}
                            onChange={(e) => props.input_change(e)}
                        />
                    </div>
                    <div id='input_container'>
                        <title>Password</title>
                        <Input.Password
                            type='password'
                            id='input_value'
                            name='password'
                            value={password}
                            onChange={(e) => props.input_change(e)}
                        />
                    </div>
                    <Button
                        type="primary"
                        id='sumbit_button'
                        onClick={() => props.submit(props.login.login_input)}
                    >
                        <h3 id='login_btn'>login</h3>
                    </Button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        input_change: (e) => dispatch(input_change_action(e)),
        submit: (user_data) => dispatch(user_authentication(user_data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
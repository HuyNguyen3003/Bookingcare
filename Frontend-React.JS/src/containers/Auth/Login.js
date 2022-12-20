import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from "../../services/userService"
import { reverse } from 'lodash';




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: '',
            isShowPassword: false,
            errMessage: "",
        }
    }
    handleOnchangeInput = (event) => {
        this.setState({
            userName: event.target.value
        })
    }
    handleOnchangePassword = (event) => {
        this.setState({
            passWord: event.target.value
        })

    }
    handOnchangeHidePassword = () => {
        this.setState({

            isShowPassword: !this.state.isShowPassword
        })

    }
    handleLogin = async () => {
        this.setState({
            errMessage: '',
        })
        try {
            let data = await handleLogin(this.state.userName, this.state.passWord);

            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                })

            }

            if (data && data.errCode === 0) {
                //this.props.userLoginSuccess(data.user);
                this.props.userLoginSuccess(data.userData)
            }


        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    })
                }

            }
        }

    }

    handleOnKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin()
        }
    }





    render() {
        //jsx


        return (
            <div className='login-backgroud'>
                <div className='login-container'>
                    <div className='login-content row' >
                        <div className='col-12  text-login'>Login</div>
                        <div className='col-12 form-group login-input '>
                            <label>Username</label>
                            <input type='text' className='form-control' placeholder='Enter your name'
                                value={this.state.userName} onChange={(event) => this.handleOnchangeInput(event)}
                            >

                            </input>
                        </div>
                        <div className='col-12 form-group login-input '>
                            <label>Password</label>
                            <div >
                                <input
                                    className='form-control'
                                    placeholder='Enter your password'
                                    value={this.state.passWord}
                                    onChange={(event) => this.handleOnchangePassword(event)}
                                    type={this.state.isShowPassword ? "text" : "password"}
                                    onKeyDown={(event) => this.handleOnKeyDown(event)}
                                ></input>
                                <span
                                    onClick={this.handOnchangeHidePassword}
                                ><i class={this.state.isShowPassword ? "fa fa-eye-slash" : "far fa-eye eyse"}></i>
                                </span>

                            </div>



                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={(event) => this.handleLogin(event)}>Login</button>
                        </div>

                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your Password ?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className='text-other-login'>Or login with:</span>
                        </div>
                        < div className=" col-12 social-login mt-3 " >
                            <i className="fab fa-google-plus-g google"> </i>
                            <i className="fab fa-facebook-f facebook" > </i>
                        </div>

                    </div>
                </div>
            </div >
        )

    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)), /// mẫu
        // userLoginFail: (userInfo) => dispatch(actions.userLoginFail(userInfo)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))


    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

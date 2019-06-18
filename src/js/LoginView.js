import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DashBoardView from './DashBoardView';
import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';
import { Input } from '@material-ui/core';
import firebase from '../config/Fire';


var globalProps = "";
const logo = require('../img/Logo3.png');
const parentDiv = {
    paddingTop: "50px",
    paddingBottom: "50px"
}
const logoStyle = {
    width: "150px",
    height: "150px",
    display: "table",
    margin: "0 auto",
    marginTop: "50px"
}
const panelStyle = {
    background: "rgba(0,0,0,0)",
    border: "0 none",
    borderRadius: "10px",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
    padding: "20px 30px",
    boxSizing: "border-box",
    margin: "auto",
    position: "relative",
    width: "350px",
    height: "600px",
}
const inputStyle = {
    display: "table",
    margin: "0 auto",
    marginTop: "30px",
    
}

const inputPWstyle = {
    display: "table",
    margin: "0 auto",
    marginTop: "30px",
    borderWidth: "0 0 1px",
    outline: "none",
    borderColor: "#C5D2E0",
    fontSize: "15.5px",
    height: "2em",
    width: "210px"
    // marginRight: "41px"
}
const loginButtonStyle = {
    margin: "0 auto",
    display: "table",
    marginTop: "80px",
    width: "150px"

}

class LoginView extends Component { 
    constructor(props) {
        super(props);
        globalProps = props; 
        this.state = {
            inputPhoneNum: "",
            inputPassword: ""
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);
    }


    handlePasswordChange(event) {
        this.setState({inputPassword: event.target.value});
    }

    login() {
        globalProps.loginUser(this.state.inputPhoneNum, this.state.inputPassword)
    }

    render() {
        return(
            <div style={parentDiv}>
                <div style={panelStyle}>
                    <img src={logo} style={logoStyle} alt="logo"></img>
                    <PhoneInput country="US" style={inputStyle} 
                    placeholder="Enter phone number" value={this.state.inputPhoneNum} 
                    onChange={inputPhoneNum => this.setState({inputPhoneNum})}>

                    </PhoneInput>
                    <input type="password" style={inputPWstyle} placeholder="Enter password" value={this.state.inputPassword}
                    onChange={this.handlePasswordChange}>
                    </input>

                    <Button style={loginButtonStyle} variant="contained" color="secondary" 
                    onClick={this.login}>
                        Login
                    </Button>
                </div>
            </div>
        )
    }
}

export default LoginView;
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase"
import Button from '@material-ui/core/Button';
import SignUpView from './SignUpView';
const logo = require("../img/Logo3.png")

const landingParentDiv = {
    paddingTop: "50px",
    paddingBottom: "50px",
}

const landingChildDiv = {
    
    margin: "0 auto",
    display: "table",
}
const landingButtonDiv = {
    margin: "0 auto",
    display: "table"
}
const landingLogo = {
    width: "200px",
    height: "200px"
}

const welcomeMessage = {
    margin: "0 auto",
    display: "table",
    marginBottom: "20px"
}

class LandingPageView extends React.Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
    }

    changePage(direction) {
        this.props.segueToView(direction)
    }

    render() {
        return (
            // <div>
            //     <SignUpView
            //         handlePhoneEntry = {this.props.handlePhoneEntry}
            //     />
            // </div>

            <div style={landingParentDiv}>
                <div style={landingChildDiv}>
                    <img style={landingLogo} src={logo} alt="logo"></img>
                    
                </div>
                
                <div style={welcomeMessage}>
                    <h1>Welcome to TravelFam</h1>
                </div>


                <div style={landingButtonDiv}>
                    <Button style={{marginRight: "20px", width: "150px"}} variant="contained" color="secondary" 
                    >Login</Button>
                    <Button style={{width: "150px"}} variant="outlined" onClick = {() => this.props.segueToView("SignUpView")
                    }>Register</Button>
                </div>
            </div>
        );
    }
}

export default LandingPageView;
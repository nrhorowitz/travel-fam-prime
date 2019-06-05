import React, { Component } from 'react';

import '../css/App.css';

import LandingPageView from './LandingPageView.js';
import EditProfileView from './EditProfileView.js';
import DashBoardView from './DashBoardView.js';
import SMSVerificationView from './SMSVerificationView.js';
import LoginWithPasswordView from './LoginWithPasswordView.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentView: "LandingPageView",
            currentUser: null,
            phoneEntry: ""
        };

        this.segueToView = this.segueToView.bind(this);
        this.authenticateNewUser = this.authenticateNewUser.bind(this);
        this.setNewUser = this.setNewUser.bind(this);
    }

    componentDidMount() {

    }

    segueToView(direction) {
        this.setState({currentView: direction});
    }

    authenticateNewUser(phone) {
        this.setState({phoneEntry: phone});
    }

    setNewUser(user) {
        this.setState({currentUser: user});
        console.log("CURRENTUSER: ");
        console.log(this.state.currentUser);
        //alert(this.state.currentUser);
    }



    currentPage() {
        if (this.state.currentView === "LandingPageView") {
            return (
                <LandingPageView
                    segueToView = {this.segueToView}
                    setNewUser = {this.setNewUser}
                />
            )
        } else if (this.state.currentView === "EditProfileView") {
            return (
                <EditProfileView
                    segueToView = {this.segueToView}
                />
            )
        } else if (this.state.currentView === "DashBoardView") {
            return (
                <DashBoardView
                    segueToView = {this.segueToView}
                />
            )
        } else if (this.state.currentView === "SMSVerificationView") {
            return (
                <SMSVerificationView
                    segueToView = {this.segueToView}
                    phoneEntry = {this.state.phoneEntry}
                />
            )
        } else if (this.state.currentView === "LoginWithPasswordView") {
            return (
                <LoginWithPasswordView
                    segueToView = {this.segueToView}
                    phoneEntry = {this.state.phoneEntry}
                />
            )
        }
    }

    render() {
        return (
            <div>
                {this.currentPage()}
            </div>
        );
    }
}

export default App;

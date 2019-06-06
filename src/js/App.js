import React, { Component } from 'react';

import '../css/App.css';

import LandingPageView from './LandingPageView.js';
import EditProfileView from './EditProfileView.js';
import DashBoardView from './DashBoardView.js';
import SMSVerificationView from './SMSVerificationView.js';
import LoginWithPasswordView from './LoginWithPasswordView.js';
import InvitedByView from './InvitedByView.js';
import CreateNameView from './CreateNameView.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentView: "SMSVerificationView",
            currentUser: null,
            newUserEntry: {
                phone: "",
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            }
        };

        this.segueToView = this.segueToView.bind(this);
        this.addNewUserInfo = this.addNewUserInfo.bind(this);
        this.setNewUser = this.setNewUser.bind(this);
    }

    componentDidMount() {

    }

    segueToView(direction) {
        this.setState({currentView: direction});
    }

    addNewUserInfo(pair) {
        var tempUserEntry = this.state.newUserEntry;
        var key = pair[0];
        var val = pair[1];
        if (key == "phone") {
            tempUserEntry.phone = val;
        } else if (key == "firstName") {
            tempUserEntry.firstName = val;
        } else if (key == "lastName") {
            tempUserEntry.lastName = val;
        } else if (key == "email") {
            tempUserEntry.email = val;
        } else if (key == "password") {
            tempUserEntry.password = val;
        }
        this.setState({newUserEntry: tempUserEntry});
        //console.log(this.state.newUserEntry);
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
                    setNewUser = {this.setNewUser}
                />
            )
        } else if (this.state.currentView === "LoginWithPasswordView") {
            return (
                <LoginWithPasswordView
                    segueToView = {this.segueToView}
                    phoneEntry = "6666666666" ///TEMP - call from database
                />
            )
        } else if (this.state.currentView === "InvitedByView") {
            return (
                <InvitedByView
                    segueToView = {this.segueToView}
                    phoneEntry = {this.state.phoneEntry}
                />
            )
        } else if (this.state.currentView === "CreateNameView") {
            return (
                <CreateNameView
                    segueToView = {this.segueToView}
                    addNewUserInfo = {this.addNewUserInfo}
                />
            )
        } else if (this.state.currentView === "CreateEmailView") {
            return (
                <div>
                    CreatePasswordView
                </div>
            )
        } else if (this.state.currentView === "CreatePasswordView") {
            return (
                <div>
                    CreatePasswordView
                </div>
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

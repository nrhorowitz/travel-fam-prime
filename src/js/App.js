import React, { Component } from 'react';

import '../css/App.css';

import LandingPageView from './LandingPageView.js';
import EditProfileView from './EditProfileView.js';
import DashBoardView from './DashBoardView.js';
import SMSVerificationView from './SMSVerificationView.js';
import LoginWithPasswordView from './LoginWithPasswordView.js';
import InvitedByView from './InvitedByView.js';
import CreateNameView from './CreateNameView.js';
import CreateEmailView from './CreateEmailView.js';
import CreatePasswordView from './CreatePasswordView.js';

import firebase from 'firebase';

const db = firebase.firestore();

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentView: "SMSVerificationView",
            currentUserId: null
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
        var key = pair[0];
        var val = pair[1];
        db.collection('users').doc(this.state.currentUserId).update({
            [key]: val
        }).catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    setNewUser(user) {
        console.log(user);
        this.setState({currentUserId: user.uid});
        db.collection('users').doc(this.state.currentUserId).update({
            "phone": user.phoneNumber
        }).catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    existingUser(id) {

    }



    currentPage() {
        if (this.state.currentView === "LandingPageView") {
            return (
                <LandingPageView
                    segueToView = {this.segueToView}
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
                    firebase = {firebase}
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
                <CreateEmailView
                    segueToView = {this.segueToView}
                    addNewUserInfo = {this.addNewUserInfo}
                />
            )
        } else if (this.state.currentView === "CreatePasswordView") {
            return (
                <CreatePasswordView
                    segueToView = {this.segueToView}
                    addNewUserInfo = {this.addNewUserInfo}
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

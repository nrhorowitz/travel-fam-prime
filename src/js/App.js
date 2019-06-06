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
import LoadingPageView from './LoadingPageView.js';

import firebase from 'firebase';
import 'firebase/auth';

const db = firebase.firestore();

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentUserId: "",
            currentView: "LoadingPageView"
        };
        this.segueToView = this.segueToView.bind(this);
        this.addNewUserInfo = this.addNewUserInfo.bind(this);
        this.setNewUser = this.setNewUser.bind(this);
        this.existingUser = this.existingUser.bind(this);
        this.handlePhoneEntry = this.handlePhoneEntry.bind(this);
        this.updateViewToId = this.updateViewToId.bind(this);
    }

    componentDidMount() {
        this.listener = firebase.auth().onAuthStateChanged(
            authUser => {
                this.setState({currentUserId: authUser.uid})
                this.updateViewToId();
                return;
            },
        );
        //this.segueToView("LandingPageView");
        this.segueToView("SMSVerificationView");
    }

    componentWillUnmount() {
        this.listener();
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

    existingUser(phone) {
        db.collection('users').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                if (doc.data().phone == phone) {
                    return doc.id;
                }
            });
        }).catch((err) => {
            console.log('Error getting documents', err);
        });
        return "None"
    }

    handlePhoneEntry(phone) {
        var id = this.existingUser(phone);
        if (id == "None") {
            //TODO: send phone number so you dont need to retype
            this.segueToView("SMSVerificationView");
        } else {
            this.setState({currentUserId: id});
            this.segueToView("LoginWithPasswordView");
        }
    }

    updateViewToId() {
        alert(this.state.currentUserId);
        if (this.state.currentUserId.length > 8) {
            this.segueToView("DashBoardView");
        } else {
            this.segueToView("LandingPageView");
        }
    }

    currentPage() {
        if (this.state.currentView === "LandingPageView") {
            return (
                <LandingPageView
                    handlePhoneEntry = {this.handlePhoneEntry}
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

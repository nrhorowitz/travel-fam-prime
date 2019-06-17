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
import SignUpView from './SignUpView';
import firebase from 'firebase';
import 'firebase/auth';
import ProfileView from './ProfileView.js';

const db = firebase.firestore();

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentUserId: "",
            currentView: "LoadingPageView",
        };
        this.segueToView = this.segueToView.bind(this);
        this.addNewUserInfo = this.addNewUserInfo.bind(this);
        this.setNewUser = this.setNewUser.bind(this);
        this.setNewCredential = this.setNewCredential.bind(this);
        this.existingUser = this.existingUser.bind(this);
        this.handlePhoneEntry = this.handlePhoneEntry.bind(this);
        this.updateViewToId = this.updateViewToId.bind(this);
    }

    componentDidMount() {

        // this.segueToView("LandingPageView");
        this.segueToView("DashBoardView");
        //this.segueToView("SMSVerificationView");
        // this.segueToView("SignUpView");
        //this.segueToView("ProfileView");
    }

    // componentWillUnmount() {
    //     this.listener();
    // }

    segueToView(direction) {
        this.setState({currentView: direction});
    }

    addNewUserInfo(pair) {
        var key = pair[0];
        var val = pair[1];
        db.collection('users').doc(this.state.currentUserId).update({
            [key]: val
        }).then(() => {
            return;
        }).catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    setNewUser(user, credential, email, firstName, lastName) {
        // alert(firebase.currentUser);
        console.log("setnewuser's credential here")
        console.log(credential);
        console.log(user.password);

        var jsonCredential = JSON.stringify(credential);
        console.log("this is user uid", user.uid);
        this.setState({currentUserId: user.uid});
        //erroring because user id is null when called
        //for some reason this.state.currenUserId is null even when setting it in line 75 ???
        console.log(this.state.currentUserId);
        db.collection('users').doc(user.uid).set({
            phone: user.phoneNumber,
            email: email,
            firstName: firstName,
            lastName: lastName

            //"credential": user.c
        }).catch(function(error) {
            console.error("Error writing document: ", error);
        });


        // db.collection('credentials').doc(this.state.currentUserId).set({
        //     credential: jsonCredential,
        //     // password: user.password
        // }).catch(function(error) {
        //     console.error("Error storing credential and password: ", error);
        // })



        this.setNewCredential(user, jsonCredential);
    }

    setNewCredential(user, jsonCred) {
        console.log("SETNEWTNOIW JSONCRED");
        console.log(jsonCred);

        //when reading credential from firebase, need to use JSON.parse(credential) to unparse it from JSON format

        // const cred = credential.map((obj) => {return Object.assign({}, obj)});
        db.collection('credentials').doc(user.uid).set({
            credential: jsonCred,
            password: user.password


        }).catch(function(error) {
            console.error("Error storing credential and password: ", error);
        })
    }


    existingUser(phone) {
        db.collection('users').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                if (doc.data().phone == phone) {
                    return doc.id;
                }
            }).then(() => {
                var a = 1; //FILLER
            });
        }).catch((err) => {
            console.log('Error getting documents', err);
        });
        return "None";
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
        if (this.state.currentUserId.length > 8) {
            this.segueToView("DashBoardView");
        } else {
            this.segueToView("LandingPageView");
        }
    }

    currentPage() {
        if (this.state.currentView === "ProfileView") {
            return (
                <ProfileView segueToView = {this.segueToView}>

                </ProfileView>
            )
        }
        if (this.state.currentView === "LandingPageView") {
            return (
                <LandingPageView
                    handlePhoneEntry = {this.handlePhoneEntry}
                />
            )
        } else if (this.state.currentView === "SignUpView") {
            return (
                <SignUpView
                    segueToView = {this.segueToView}
                    setNewUser = {this.setNewUser}
                    firebase = {firebase}
                    addNewUserInfo = {this.addNewUserInfo}
                >

                </SignUpView>
            )
        }

        else if (this.state.currentView === "EditProfileView") {
            return (
                <EditProfileView
                    segueToView = {this.segueToView}
                />
            )
        } else if (this.state.currentView === "DashBoardView") {
            return (
                <DashBoardView
                    segueToView = {this.segueToView}
                    db = {db}
                />
            )
        } else if (this.state.currentView === "SMSVerificationView") {
            return (
                <SMSVerificationView
                    segueToView = {this.segueToView}
                    setNewUser = {this.setNewUser}
                    firebase = {firebase}
                    addNewUserInfo = {this.addNewUserInfo}
                />
            )
        } else if (this.state.currentView === "LoginWithPasswordView") {
            return (
                <LoginWithPasswordView
                    segueToView = {this.segueToView}
                    id = {this.state.currentUserId}
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

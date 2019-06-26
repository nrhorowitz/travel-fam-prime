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
import LoginView from './LoginView';
import ProfileView from './ProfileView.js';
import MessageBase from './MessageBase';

const db = firebase.firestore();

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentUserId: "",
            currentView: "LoadingPageView",
            viewId: ""
        };
        this.segueToView = this.segueToView.bind(this);
        this.addNewUserInfo = this.addNewUserInfo.bind(this);
        this.setNewUser = this.setNewUser.bind(this);
        this.setNewCredential = this.setNewCredential.bind(this);
        this.existingUser = this.existingUser.bind(this);
        this.handlePhoneEntry = this.handlePhoneEntry.bind(this);
        this.updateViewToId = this.updateViewToId.bind(this);

        this.loginUser = this.loginUser.bind(this);
        this.setViewId = this.setViewId.bind(this);
    }

    componentDidMount() {
        console.log('APP COMPONENT RENDER');
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              //if ((user.displayName !== undefined) && (user.email !== undefined) && (user.password !== undefined)) {
              if (user.displayName !== null) {
                  this.segueToView("DashBoardView");
              } else {
                  this.segueToView("SignUpView");
              }
            // User is signed in.
          } else {
              this.segueToView("SignUpView");
            // No user is signed in.
          }
        });

        // this.segueToView("LandingPageView");
        // this.segueToView("DashBoardView");
        //this.segueToView("SMSVerificationView");
        // this.segueToView("SignUpView");
        // this.segueToView("ProfileView");
        // this.segueToView("LoginView");
        this.segueToView("MessageBase");
    }

    // componentWillUnmount() {
    //     this.listener();
    // }

    segueToView(direction, forceUpdate=false) {
        if (forceUpdate) {
            this.setState({currentView: direction});
            //this.forceUpdate();
        } else {
            this.setState({currentView: direction});
        }
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
        console.log("setnewuser's credential here")
        console.log(credential);
        console.log(user.password);
        console.log(user);

        console.log("this is user uid", user.uid);
        this.setState({currentUserId: user.uid});
        //erroring because user id is null when called
        //for some reason this.state.currenUserId is null even when setting it in line 75 ???
        console.log(this.state.currentUserId);
        db.collection('users').doc(user.uid).set({
            phone: user.phoneNumber,
            email: email,
            firstName: firstName,
            lastName: lastName,
            imageUrl: "default-profile-image.png",
            rawImage: "https://firebasestorage.googleapis.com/v0/b/travelfamprime.appspot.com/o/images%2Fdefault%2Fdefault-profile-image.png?alt=media&token=dcbab95f-7953-47bf-9cb9-548211a78a75"
        }).catch(function(error) {
            console.error("Error writing document: ", error);
        });


        // db.collection('credentials').doc(this.state.currentUserId).set({
        //     credential: jsonCredential,
        //     // password: user.password
        // }).catch(function(error) {
        //     console.error("Error storing credential and password: ", error);
        // })



        this.setNewCredential(user, credential);
    }

    setNewCredential(user, credential) {
        console.log("SETNEWTNOIW JSONCRED");
        console.log(credential);

        //when reading credential from firebase, need to use JSON.parse(credential) to unparse it from JSON format

        // const cred = credential.map((obj) => {return Object.assign({}, obj)});
        db.collection('credentials').doc(user.phoneNumber).set({
            password: user.password,
            userId: user.uid


        }).then(() => {
            this.segueToView("DashBoardView");
        }).catch(error => {
            console.error("Error storing credential and password: ", error);
        })
    }

    loginUser(phoneNumber, password) {
        // var cred = JSON.parse(jsonCred);

        var docRef = db.collection("credentials").doc(phoneNumber);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                if (password === doc.data().password) {
                    this.state.currentUserId = doc.data().userId;
                    const cred = doc.data().credential
                    const pw = doc.data().password
                    console.log("User Credential Data:", cred);
                    console.log("User password data", pw)
                    firebase.auth().signInWithCredential(cred);
                    console.log("user logged in successfully");
                } else {
                    alert("incorrect password");
                }
            } else {
                console.log("No such user");
                alert("incorrect phone number")
            }
        }.bind(this)).catch(function(error) {
            console.log("Error getting user data:", error);
        });
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

    setViewId(id) {
        this.setState({viewId: id});
    }

    currentPage() {
        if (this.state.currentView === "ProfileView") {
            return (
                <ProfileView
                    segueToView = {this.segueToView}
                    firebase = {firebase}
                    viewId = {this.state.viewId}
                    currentUser = {firebase.auth().currentUser}
                    setViewId = {this.setViewId}
                >
                </ProfileView>
            )
        } else if (this.state.currentView === "MessageBase") {
            return ( 
                <MessageBase
                    segueToView = {this.segueToView}
                >

                </MessageBase>
            )
        }
        
        else if (this.state.currentView === "LoginView"){
            return (
                <LoginView
                    segueToView = {this.segueToView}
                    firebase = {firebase}
                    loginUser = {this.loginUser}
                >
                </LoginView>
            )
        }
        else if (this.state.currentView === "LandingPageView") {
            return (
                <LandingPageView
                    handlePhoneEntry = {this.handlePhoneEntry}
                    segueToView = {this.segueToView}
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
                    currentUser = {firebase.auth().currentUser}
                    setViewId = {this.setViewId}
                    firebase = {firebase}
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

import React, { Component } from "react"
import "../css/SMSVerificationView.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebaseui from 'firebaseui'

import Typography from '@material-ui/core/Typography';

var globalProps = "";

firebase.initializeApp({
    apiKey: "AIzaSyAtrvGB8pwYWmyRwG02svHpAkh5QWzh9yk",
    authDomain: "travelfamprime.firebaseapp.com",
    //databaseURL: "https://travelfamprime.firebaseio.com",
    //projectId: "travelfamprime",
    //storageBucket: "travelfamprime.appspot.com",
    //messagingSenderId: "33000924700",
    //appId: "1:33000924700:web:6a94b73ffb29331e"

    //apiKey: "AIzaSyDLoqcbTDMFuurtAyDgVEKZ6qwo0j0Osjk",
    //authDomain: "fir-auth-tutorial-ed11f.firebaseapp.com"
})

/**
 * @return {!Object} The FirebaseUI config.
 */
function getUiConfig() {
    return {
        'callbacks': {
            // Called when the user has been successfully signed in.
            'signInSuccess': function(user, credential, redirectUrl) {
                handleSignedInUser(user);
                // Do not redirect.
                return false;
            }
        },
        // Opens IDP Providers sign-in flow in a popup.
        'signInFlow': 'popup',
        'signInOptions': [
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    //size: getRecaptchaMode()
                    type: 'image',
                    size: 'invisible',
                    badge: 'bottomleft'
                }
            }
        ],
        // Terms of service url.
        'tosUrl': 'https://www.google.com'
    };
}

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

/**
 * Displays the UI for a signed in user.
 * @param {!firebase.User} user
 */
var handleSignedInUser = function(user) {
    globalProps.setNewUser(user);
    globalProps.segueToView("InvitedByView");
};

/**
 * Displays the UI for a signed out user.
 */
var handleSignedOutUser = function() {
    document.getElementById('user-signed-in').style.display = 'none';
    document.getElementById('user-signed-out').style.display = 'block';
    ui.start('#firebaseui-container', getUiConfig());
};

// Listen to change in auth state so it displays the correct UI for when
// the user is signed in or not.
firebase.auth().onAuthStateChanged(function(user) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('loaded').style.display = 'block';
    user ? handleSignedInUser(user) : handleSignedOutUser();
});

/**
 * Deletes the user's account.
 */
var deleteAccount = function() {
    firebase.auth().currentUser.delete().catch(function(error) {
        if (error.code == 'auth/requires-recent-login') {
            // The user's credential is too old. She needs to sign in again.
            firebase.auth().signOut().then(function() {
                // The timeout allows the message to be displayed after the UI has
                // changed to the signed out state.
                setTimeout(function() {
                    alert('Please sign in again to delete your account.');
                }, 1);
            });
        }
    });
};

/**
 * Initializes the app.
 */
/*
var initApp = function() {
    document.getElementById('sign-out').addEventListener('click', function() {
        firebase.auth().signOut();
    });
    document.getElementById('delete-account').addEventListener(
        'click', function() {
            deleteAccount();
        });
};

window.addEventListener('load', initApp);*/


class SMSVerificationView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
        globalProps = props;
        //globalProps = this.props;
    }

    render() {
        return (
            <div id="container">
                <h3>TRAVELFAMPRIME</h3>
                <div id="loading">Loading...</div>
                <div id="loaded" className="hidden">
                    <div id="main">
                        <div id="user-signed-in" className="hidden">
                            <div id="user-info">
                                <div id="photo-container">
                                    <img id="photo"></img>
                                </div>
                                <div id="name"></div>
                                <div id="email"></div>
                                <div id="phone"></div>
                                <div className="clearfix"></div>
                            </div>
                            <p>
                                <button id="sign-out">Sign Out</button>
                                <button id="delete-account">Delete account</button>
                            </p>
                        </div>
                        <div id="user-signed-out" className="hidden">
                            <Typography variant="h2" component="h2" gutterBottom>
                                Get started with TravelFam
                            </Typography>
                            <div id="firebaseui-spa">
                                <div id="firebaseui-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SMSVerificationView
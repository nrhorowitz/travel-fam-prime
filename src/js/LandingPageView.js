import React, { Component } from "react"
import "../css/LandingPageView.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

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

class LandingPageView extends Component {
    state = { isSignedIn: false }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
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
        callbacks: {
            signInSuccess: () => false //go to dashboardview
        },
        'tosUrl': 'https://www.google.com'
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            console.log("user", user)
        })
    }

    render() {
        return (
            <div className="LandingPageView">
                {this.state.isSignedIn ? (
                    <span>
                        <div>Signed In!</div>
                        <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
                        <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                        <img
                            alt="profile picture"
                            src={firebase.auth().currentUser.photoURL}
                        />
                    </span>
                ) : (
                    <StyledFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth={firebase.auth()}
                    />
                )}
            </div>
        )
    }
}

export default LandingPageView
import React, { Component } from 'react';
import 'firebase/auth';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DashBoardView from './DashBoardView.js';
import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/react-responsive-ui';
import 'react-phone-number-input/style.css'
import firebase from '../config/Fire';

var globalProps = "";
//Initializing firebase with sms-verification database
// firebase.initializeApp({
//   apiKey: "AIzaSyAtrvGB8pwYWmyRwG02svHpAkh5QWzh9yk",
//   authDomain: "travelfamprime.firebaseapp.com",
//   databaseURL: "https://travelfamprime.firebaseio.com",
//   projectId: "travelfamprime",
//   storageBucket: "travelfamprime.appspot.com",
//   messagingSenderId: "33000924700",
//   appId: "1:33000924700:web:6a94b73ffb29331e"
// })


// //telling firebase to use device's default langauge
// firebase.auth().useDeviceLanguage();


// firebase.auth().settings.appVerificationDisabledForTesting = true;
const logo = require('../img/Logo3.png');
const backArrow = require('../img/back.svg');
const fsParentDiv = {
  paddingTop: "50px",
  paddingBottom: "50px"
}

const backArrowStyle = {
  width: "40px",
  height: "40px",
}
const backArrowButtonStyle = {
  border: "none",
  outline: "none",
  padding: "0"
}
const logoStyle = {
  width: "150px",
  height: "150px",
  display: "table",
  margin: "0 auto",
  marginTop: "50px"

}
const headerOneStyle = {
  fontSize: "28px",
  display: "table",
  margin: "0 auto",
  marginTop: "25px",
  textAlign: "center"
}
const headerThreeStyle = {
  fontSize: "28px",
  display: "table",
  margin: "0 auto",
  marginTop: "50px",
  textAlign: "center"
}

const headerTwoStyle = {
  fontSize: "28px",
  display: "table",
  margin: "0 auto",
  marginTop: "60px",
  textAlign: "center"
}

const pStyle = {
  fontSize: "20px",
  display: "table",
  margin: "0 auto",
  marginTop: "50px",
  textAlign: "center",
  marginBottom: "50px"
}

const inputStyle = {
  display: "table",
  margin: "0 auto",
  marginTop: "30px",

}

const buttonStyle = {
  display: "table",
  margin: "0 auto",
  marginTop: "20px"
}
const fieldsetStyle = {
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

var handleSignedInUser = function(user, credential, email, firstName, lastName) {
  console.log("this is the user");
  console.log(user);
  console.log("this is the credential from handleSignedInUser");
  console.log(credential);
  globalProps.setNewUser(user, credential, email, firstName, lastName);
  console.log(firebase.currentUser);
  firebase.auth().currentUser.updateProfile({
      displayName: firstName + " " + lastName + "/(default location)/(default description)",
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
      // Update successful.
      console.log(firebase.auth().currentUser);
    }).catch(function(error) {
      // An error happened.
    });
  // console.log("ADNAKLALKSDNAKLDNLAKDNALKDASNKLALKNDALKD")
  // console.log("just added to firebase");

}

var settingState = function(user, credential) {
  this.setState({user: user});
  this.setState({credential: credential});
}


class SignUpView extends Component {
  constructor(props) {
    super(props);
    globalProps = props;
    this.state = {hideCongrats: false,
                  hideSMS: false,
                  step: 1,
                  pNum: '',
                  smsCode: '',
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  credential: '',
                  user: ''};

    this.handleStepChange = this.handleStepChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSignUpSubmit = this.onSignUpSubmit.bind(this);
    // this.register = this.register.bind(this);
    this.verify = this.verify.bind(this);
  }

  handleStepChange() {
    var step = this.state.step + 1;
    console.log(step);

    if (step == 2) {
      this.setState({hideCongrats: false});
      this.setState({hideSMS: true});

    } else if (step == 3) {
      this.setState({hideCongrats: true});
      this.setState({hideSMS: false});
    } else if (step == 6) {
      var user = this.state.user;
      var credential = this.state.credential;
      user.password = this.state.password;

      handleSignedInUser(user, credential, this.state.email, this.state.firstName, this.state.lastName);
    }

    this.setState({step: step});


  }
  //updates state of phone number as you type
  handleChange(event) {
    this.setState({pNum: event.target.value});
  }

  //updates state of smsCode number as you type
  handleCodeChange(event) {
    this.setState({smsCode: event.target.value});
  }

  handleFirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  //prevents screen flash on form submission
  handleSubmit(event) {
    event.preventDefault();
  }




  //initializes recaptcha and sends sms to phone number
  onSignUpSubmit() {

    this.setState({hideCongrats: true});
    this.setState({hideSMS: false});

    var phoneNum = this.state.pNum;
    console.log(phoneNum);
    document.getElementById("phoneNumPrompt").innerHTML = "Please enter the 6-digit code we just texted to " + phoneNum;

    var appVerifier = new firebase.auth.RecaptchaVerifier("recaptchaContainer", {'size':'invisible'});
    firebase.auth().signInWithPhoneNumber(phoneNum, appVerifier)
      .then(function(confirmationResult) {

        //sets confirmationResult to global variable so you can access it in verify()
        window.confirmationResult = confirmationResult;
        console.log("this is the confimanrasrnaalr");
        console.log(confirmationResult);
      })
      .catch(function(error) {
        console.log("Error: sms not sent" + error);
      })
  }

  //verifies inputted sms code and outputs user credential into console
  verify() {
    const confirmationResult = window.confirmationResult;
    var smsCode = this.state.smsCode;


    if (smsCode) {

      //this creates a credential even if the user doesn't sign in correctly.

      console.log("this is confirmationRESULT")
      console.log(confirmationResult);
      //signs the user in with the smsCode.
      confirmationResult.confirm(smsCode).then(function (result) {
        console.log("Successful login!")
        var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, smsCode);
        // firebase.auth().signInWithCredential(credential);
        // console.log("yeet")
        // console.log(credential);
        var user = result.user;

        //user and credential are being updated to state here
        this.setState({credential: credential});
        this.setState({user: user});

      }.bind(this)).catch(function (error) {
        console.log('Error while checking the verification code', error);

        //if user is not able to sign in correctly, need to null the credential created because it is the wrong credential

      });
    }

  }


  render(){
    const congratsStepStyle = this.state.hideCongrats ? {
      display: 'none',

    } : {

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
    };
    const smsStepStyle = this.state.hideSMS ? {
      display: 'none',

    } : {

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
    };

    var fieldsetStep = this.state.step;
    // if (this.state.hideCongrats) {
    //   congratsStepStyle.display = "none";
    // }
    // if (this.state.hideSMS) {
    //   smsStepStyle.display = "none";
    // }






    if (fieldsetStep == 1){
      return(
        <div style={fsParentDiv}>

          <fieldset id="phoneNumberStep" style={fieldsetStyle}>

            <img src={logo} style={logoStyle} alt="logo"></img>
            <h1 style={headerOneStyle}>Please enter your phone number to continue</h1>
            {/* <TextField style={inputStyle} variant="outlined" type="tel" label="Phone Number" value={this.state.pNum} onChange={this.handleChange} /> */}
            <PhoneInput country="US" style={inputStyle} placeholder="Enter phone number" value={this.state.pNum} onChange={pNum => this.setState({pNum})}></PhoneInput>

            <Button style={buttonStyle} variant="contained" color="secondary" onClick={this.handleStepChange}>Next</Button>
          </fieldset>
        </div>
      )
    } else if (fieldsetStep == 2) {
      return(
        <div style={fsParentDiv}>
        {/* smsCodeStep fieldset is hidden right now */}
        <fieldset id="congratsStep" style={congratsStepStyle}>
          <button style={backArrowButtonStyle}><img src={backArrow} style={backArrowStyle} alt="backArrow" /></button>
          <h1 style={headerTwoStyle}>Congrats! You've been invited to TravelFam</h1>
          <p style={pStyle}>TravelFam is an invitation only private network of verified travelers. Your account is ready to be set up</p>
          <Button style={buttonStyle} variant="contained" color="secondary" type="submit" onClick={this.onSignUpSubmit}>Sign Up Now</Button>

        </fieldset>

        {/* congratsStep fieldset gets hidden, smsCodeStep fieldstep gets shown */}
        {/* TODO: minor error: uncaught promise timeout happens because this fieldset gets removed. i think */}
        <fieldset id="smsCodeStep" style={smsStepStyle}>
          <button style={backArrowButtonStyle}><img src={backArrow} style={backArrowStyle} alt="backArrow" /></button>
          <h1 style={headerTwoStyle} id="phoneNumPrompt"></h1>

          <TextField style={inputStyle} variant="outlined" label="SMS Code" value={this.state.smsCode} onChange={this.handleCodeChange} />
          <Button style={buttonStyle} variant="contained" color="secondary" type="submit" onClick={() => {this.verify(); this.handleStepChange()}} id="recaptchaContainer">Verify</Button>
        </fieldset>
        </div>
      )

    } else if (fieldsetStep == 3) {
      return(

        <div style={fsParentDiv}>

          <fieldset id="nameStep" style={fieldsetStyle}>
            <button style={backArrowButtonStyle}><img src={backArrow} style={backArrowStyle} alt="backArrow" /></button>
            <h1 style={headerOneStyle}>What's your name?</h1>
            <TextField style={inputStyle} variant="outlined" label="First Name" value={this.state.firstName} onChange={this.handleFirstNameChange} />
            <TextField style={inputStyle} variant="outlined" label="Last Name" value={this.state.lastName} onChange={this.handleLastNameChange} />
            <Button style={buttonStyle} variant="contained" color="secondary" type="submit" onClick={this.handleStepChange}>Next</Button>
            <p style={pStyle}><b>Please us your full and real name!</b> Our community built on civility and real identity. No fake names.</p>
          </fieldset>
        </div>
      )
    } else if (fieldsetStep == 4) {
      return(
        <div style={fsParentDiv}>
          <fieldset id="emailStep" style={fieldsetStyle}>
            <button style={backArrowButtonStyle}><img src={backArrow} style={backArrowStyle} alt="backArrow" /></button>
            <h1 style={headerOneStyle}>So that we can contact you. What's your email?</h1>

            <TextField style={inputStyle} variant="outlined" label="email" value={this.state.email} onChange={this.handleEmailChange} />
            <Button style={buttonStyle} variant="contained" color="secondary" type="submit" onClick={this.handleStepChange}>Next</Button>
          </fieldset>
        </div>
      )
    } else if (fieldsetStep == 5) {
      return(
        <div style={fsParentDiv}>
          <fieldset id="passwordStep" style={fieldsetStyle}>
            <button style={backArrowButtonStyle}><img src={backArrow} style={backArrowStyle} alt="backArrow" /></button>
            <h1 style={headerThreeStyle}>Last step...Create a password</h1>

            <TextField style={inputStyle} variant="outlined" label="Password" value={this.state.password} onChange={this.handlePasswordChange} />
            <Button style={buttonStyle} variant="contained" color="secondary" type="submit" onClick={this.handleStepChange}>Complete</Button>
          </fieldset>
        </div>
      )
    }
    else {
      return null
    }
  }
}

export default SignUpView;

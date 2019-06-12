import React, { Component } from 'react';
import firebase from 'firebase'; 
import 'firebase/auth';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DashBoardView from './DashBoardView.js';

//Initializing firebase with sms-verification database
firebase.initializeApp({
  apiKey: "AIzaSyAtrvGB8pwYWmyRwG02svHpAkh5QWzh9yk",
  authDomain: "travelfamprime.firebaseapp.com",
  databaseURL: "https://travelfamprime.firebaseio.com",
  projectId: "travelfamprime",
  storageBucket: "travelfamprime.appspot.com",
  messagingSenderId: "33000924700",
  appId: "1:33000924700:web:6a94b73ffb29331e"
})


//telling firebase to use device's default langauge
firebase.auth().useDeviceLanguage();


// firebase.auth().settings.appVerificationDisabledForTesting = true;
const logo = require('../img/Logo3.png');
const fsParentDiv = {
  paddingTop: "80px"
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


class SignUpView extends Component { 
  constructor(props) {
    super(props);
    this.state = {hideCongrats: false, hideSMS: false, step: 1, pNum: '', smsCode: '', firstName: '', lastName: '', email: '', password: ''};
    
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
      //GO TO DASHBOARD VIEW HERE
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

      

      //signs the user in with the smsCode.
      confirmationResult.confirm(smsCode).then(function (result) {
        console.log("Successful login!")
        var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, smsCode); 
        console.log(credential);
        var user = result.user;
        console.log(user);
        
        
      }).catch(function (error) {
        console.log('Error while checking the verification code', error);

        //if user is not able to sign in correctly, need to null the credential created because it is the wrong credential 
          
      });
    }
    
  }
  

  render(){
    const congratsStepStyle = this.state.hideCongrats ? {
      display: 'none',
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
            <TextField style={inputStyle} variant="outlined" type="tel" label="Phone Number" value={this.state.pNum} onChange={this.handleChange} />
            <Button style={buttonStyle} variant="contained" color="secondary" onClick={this.handleStepChange}>Next</Button>
          </fieldset>
        </div>
      )
    } else if (fieldsetStep == 2) {
      return(
        <div style={fsParentDiv}>
        {/* smsCodeStep fieldset is hidden right now */}
        <fieldset id="congratsStep" style={congratsStepStyle}>
          <h1 style={headerTwoStyle}>Congrats! You've been invited to TravelFam</h1>
          <p style={pStyle}>TravelFam is an invitation only private network of verified travelers. Your account is ready to be set up</p>
          <Button style={buttonStyle} variant="contained" color="secondary" type="submit" onClick={this.onSignUpSubmit}>Sign Up Now</Button>
          
        </fieldset>
        
        {/* congratsStep fieldset gets hidden, smsCodeStep fieldstep gets shown */}
        {/* TODO: minor error: uncaught promise timeout happens because this fieldset gets removed. i think */}
        <fieldset id="smsCodeStep" style={smsStepStyle}>
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

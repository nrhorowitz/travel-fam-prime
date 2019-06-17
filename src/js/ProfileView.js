import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import AppNavBar from './components/AppNavBar.js';
import ContentContainer from './components/ContentContainer.js';
import TextField from '@material-ui/core/TextField';

import '../css/App.css';

const facebookLogo = require('../img/facebook.svg');
const instagramLogo = require('../img/instagram.svg');
const linkedinLogo = require('../img/linkedin.svg');
const snapchatLogo = require('../img/snapchat.svg');
const twitterLogo = require('../img/twitter.svg');
const editButton = require('../img/EditButton.svg');
const parentDiv = {
    paddingTop: "80px",
    marginTop: "15px"
}
const editButtonLogoStyle = {
    width: "15px",
    height: "15px"
}
const footerLogoStyle = {
    width: "20px",
    height: "20px"
}
const editButtonStyle = {
    border: "none",
    outline: "none",
    cursor: "pointer",
    fontsize: "14px",
    color: "#5F5F5F",
    display: "table",
    margin: "0 auto"
}
const footerButtonStyle = {
    border: "none",
    outline: "none",
    cursor: "pointer",  
}
const footerButtonGroup = {
    position: "absolute",
    bottom: "0",
    marginBottom: "40px",
    left: "50%",
    marginLeft: "-85px", 
}
const buttonStyle = {
    display: "table",
    margin: "0 auto",
    marginBottom: "10px",
    width: "150px"
}
const updateButtonStyle = {
    
    display: "table",
    margin: "0 auto",
    marginTop: "30px"

}
const nameLocationContainer = {
    margin: "0 auto", 
    display: "table", 
    textAlign: "center", 
    lineHeight: "0.5",
    marginBottom: "20px"
}
const nameStyle = {
    fontSize: "25px",
}
const locationStyle = {
    color: "#a9a9a9",
    fontSize: "15px",
    marginBottom: "10px"
}
const containerStyle = {
    background: "rgba(0,0,0,0)",
    border: "0 none",
    borderRadius: "10px",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
    padding: "40px 30px",
    boxSizing: "border-box",   
    margin: "auto",
    marginTop: "20px",
    marginBottom: "30px",
    position: "relative", 
    width: "350px",
    height: "700px",
}
const profilePicture = {
    width: "100px",
    height: "100px",
    display: "table",
    margin: "auto",
    marginTop: "50px",
    top:"50%",
    left: "50%"
}
const profilePictureBorder = {
    borderRadius: "50%",
    width: "150px",
    height: "150px",
    backgroundColor: "#EDEDED",
    textAlign: "center",
    verticalAlign: "middle",
    display: "table",
    margin: "0 auto"
}

const textAreaContainer = {
    display: "table",
    margin: "0 auto",
    
}
const editViewLocationTextStyle = {
    width: "100%",
    marginBottom: "15px",
    backgroundColor: "#EDEDED",
    border: "none",
    borderRadius: "10px",
    padding: "10px",
    outline: "none",
    fontSize: "15px"
}
const editViewDescribeTextStyle = {
    width: "100%",
    
    height: "250px",
    resize: "none",
    backgroundColor: "#EDEDED",
    border: "none",
    borderRadius: "10px",
    padding: "10px",
    outline: "none",
    fontSize: "15px",
    overflow: "auto",
    
}
const editViewSocialMedia = {
    display: "flex",
    margin: "0 auto",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: "20px"
    
}
const editViewSmButtonStyle = {
    border: "none",
    outline: "none",
    cursor: "pointer",  
    marginBottom: "10px"
}
class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.createNewButton = this.createNewButton.bind(this);
        this.handleDescribeChange = this.handleDescribeChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.state = {
            describeText: "",
            hideDescribeText: false,
            editState: false,
            locationText: ""
        }
    }

    handleDescribeChange(event) {
        this.setState({describeText: event.target.value})
    }

    handleLocationChange(event) {
        this.setState({locationText: event.target.value})
    }

    componentDidMount() {
        if (this.state.editState === false) {
            if (this.state.describeText === "") {
                this.setState({hideDescribeText: true})
            } else {
                this.setState({hideDescribeText: false})
                document.getElementById("describe").innerHTML = this.state.describeText;
            }
        }
        document.getElementById.locationText = this.state.locationText;
    }

    changePage(direction) {
        this.props.segueToView(direction)
    }

    createNewButton(name, direction) {
        return (
            <Button
                name={name}
                direction={direction}
                color="primary"
                onClick={() => this.changePage(direction)}>
                {name}
            </Button>
        );
    }

    render() {
        const describeContainer = this.state.hideDescribeText ? {
            display: 'none',
          } : {
            display: "table",
            margin: "0 auto",
            width: "220px",
            height: "250px",
            marginTop: "10px",
            textAlign: "center",
            fontSize: "14px"
          }

        if (this.state.editState === false) {
            return(
                <div>
                    
                    <AppNavBar></AppNavBar>
                    
                    <div style={parentDiv}>
                        <div id="profile" style={containerStyle}>

                            <div style={profilePictureBorder}>
                                {/* user profile picture here */}
                            </div>

                            <div style={nameLocationContainer}>
                                <h1 style={nameStyle}>Travelfam Bot</h1>
                                <p style={locationStyle}>{this.state.locationText}</p>
                                <button style={editButtonStyle} onClick={() => {
                                    this.setState({editState: true, hideDescribeText: true})
                                }}><img style={editButtonLogoStyle} src={editButton} alt="Edit"/> Edit Profile</button>
                            </div>
                            
                            <div id="describe" style={describeContainer}>{this.state.describeText}</div>

                            <Button style={buttonStyle} variant="contained" color="secondary">Vouch</Button>
                            <Button style={buttonStyle} variant="contained" color="primary">Message</Button>

                            {/* <div style={footerButtonGroup}>
                                <button style={footerButtonStyle}><img style={footerLogoStyle} src={instagramLogo} alt="instagram"></img></button>
                                <button style={footerButtonStyle}><img style={footerLogoStyle} src={facebookLogo} alt="facebook"></img></button>
                                <button style={footerButtonStyle}><img style={footerLogoStyle} src={snapchatLogo} alt="snapchat"></img></button>
                                <button style={footerButtonStyle}><img style={footerLogoStyle} src={twitterLogo} alt="twitter"></img></button>
                                <button style={footerButtonStyle}><img style={footerLogoStyle} src={linkedinLogo} alt="linkedin"></img></button>
                            </div> */}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <AppNavBar></AppNavBar>

                    <div style={parentDiv}>
                        <div id="profile" style={containerStyle}>

                            <div style={profilePictureBorder}>
                                {/* user profile picture here */}
                            </div>

                            <div style={nameLocationContainer}>
                                <h1 style={nameStyle}>Travelfam Bot</h1>
                            
                            </div>

                            <div style={describeContainer}></div>
                            <div style={textAreaContainer}>
                                <input id="newLocationText" placeholder="City, State..." style={editViewLocationTextStyle} onChange={this.handleLocationChange}></input>
                                <textarea id="newDescribeText" placeholder="Introduce yourself..." style={editViewDescribeTextStyle} onChange={this.handleDescribeChange}></textarea>
                            </div>
                            
                            {/* <div style={editViewSocialMedia}>
                                <div style={editViewSmButtonStyle}><img style={footerLogoStyle} src={instagramLogo} alt="instagram"></img><Switch>Link</Switch></div>
                                <div style={editViewSmButtonStyle}><img style={footerLogoStyle} src={facebookLogo} alt="facebook"></img></div>
                                <div style={editViewSmButtonStyle}><img style={footerLogoStyle} src={snapchatLogo} alt="snapchat"></img></div>
                                <div style={editViewSmButtonStyle}><img style={footerLogoStyle} src={twitterLogo} alt="twitter"></img></div>
                                <div style={editViewSmButtonStyle}><img style={footerLogoStyle} src={linkedinLogo} alt="linkedin"></img></div>
                            </div> */}


                            <Button style={updateButtonStyle} variant="contained" color="secondary" onClick={() => {
                                this.setState({
                                    editState: false, hideDescribeText: false, 
                                    })
                            }}>Update Profile</Button>



                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ProfileView;
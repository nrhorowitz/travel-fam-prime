import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import AppNavBar from './components/AppNavBar.js';
import ContentContainer from './components/ContentContainer.js';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import '../css/App.css';

const facebookLogo = require('../img/facebook.svg');
const instagramLogo = require('../img/instagram.svg');
const linkedinLogo = require('../img/linkedin.svg');
const snapchatLogo = require('../img/snapchat.svg');
const twitterLogo = require('../img/twitter.svg');
const editButton = require('../img/EditButton.svg');
const parentDiv = {
    paddingTop: "60px",
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
        this.state = {
            locationText: "",
            descriptionText: "",
            hideDescribeText: false,
            editState: false,
            displayState: "ViewOther" //ViewOther
        }
        console.log(this.props.firebase.auth().currentUser);

        this.profileHeader = this.profileHeader.bind(this);
        this.profileText = this.profileText.bind(this);
        this.profileButtons = this.profileButtons.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.resolveSaveChanges = this.resolveSaveChanges.bind(this);
    }

    componentDidMount() {
        if (this.props.firebase.auth().currentUser.uid === this.props.viewId) {
            this.setState({displayState: "ViewSelf"});
        } else {
            this.setState({displayState: "ViewOther"});
        }
    }

    changePage(direction) {
        this.props.segueToView(direction)
    }

    profileHeader() {
        return (
            <div style={profilePictureBorder}>
                {/* user profile picture here */}
            </div>
        )
    }

    handleFieldChange(label) {
        if (label === "Location") {
            return ((e) => this.setState({locationText: e.target.value}));
        } else if (label === "Description") {
            return ((e) => this.setState({descriptionText: e.target.value}));
        }
    }

    resolveSaveChanges() {
        console.log(this.state.displayState);
        var displayArray = this.props.firebase.auth().currentUser.displayName.split("/");
        var name = displayArray[0];
        var location = displayArray[1];
        var description = displayArray[2];
        var newDisplayName = name + "/" + this.state.locationText + "/" + this.state.descriptionText;
        //TODO (maybe) loading circle for changes to profile
        this.props.firebase.auth().currentUser.updateProfile({
            displayName: newDisplayName,
        }).then(() => {
            // Update successful.
            this.setState({displayState: "ViewSelf"});
        }).catch((error) => {
            // An error happened.
        });
    }

    profileText() {
        var displayArray = this.props.firebase.auth().currentUser.displayName.split("/");
        var name = displayArray[0];
        var location = displayArray[1];
        var description = displayArray[2];
        if (this.state.displayState === "ViewSelf") {
            return (
                <div style={nameLocationContainer}>
                    <Typography variant="h4">{name}</Typography>
                    <p style={locationStyle}>{location}</p>
                    <Typography variant="subtitle1">{description}</Typography>
                </div>

            )
        } else {
            return (
                <div style={nameLocationContainer}>
                    <Typography variant="h4">{name}</Typography>
                    <TextField
                        id="outlined-textarea"
                        label="Location"
                        placeholder="City, State"
                        multiline
                        margin="normal"
                        variant="outlined"
                        defaultValue={location}
                        onChange={this.handleFieldChange("Location")}
                    />
                    <TextField
                        id="outlined-textarea"
                        label="Description"
                        placeholder="Tell your TravelFam about yourself..."
                        multiline
                        margin="normal"
                        variant="outlined"
                        defaultValue={description}
                        onChange={this.handleFieldChange("Description")}
                    />
                </div>

            )
        }
    }

    //<img style={editButtonLogoStyle} src={editButton} alt="Edit"/>
    profileButtons() {
        if (this.state.displayState === "ViewSelf") {
            return (
                <div>
                    <Button style={buttonStyle} variant="contained" color="secondary" onClick={() => this.setState({displayState: "EditSelf"})}>
                        Edit Profile
                    </Button>
                </div>
            )
        } else if (this.state.displayState === "EditSelf") {
            return (
                <div>
                    <Button style={buttonStyle} variant="contained" color="primary" onClick={this.resolveSaveChanges}>
                        Save Changes
                    </Button>
                </div>
            )
        } else { //viewother
            return (
                <div>
                    <Button style={buttonStyle} variant="contained" color="secondary">Vouch</Button>
                    <Button style={buttonStyle} variant="contained" color="primary">Message</Button>
                </div>
            )
        }
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

        return (
            <div style={parentDiv}>
                <AppNavBar
                    segueToView = {this.props.segueToView}
                ></AppNavBar>
                <div id="profile" style={containerStyle}>
                    {this.props.viewId}
                    {this.profileHeader()}
                    {this.profileText()}
                    {this.profileButtons()}
                </div>
            </div>
        )
    }
}

export default ProfileView;
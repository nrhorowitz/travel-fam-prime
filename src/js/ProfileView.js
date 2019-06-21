import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import AppNavBar from './components/AppNavBar.js';
import ContentContainer from './components/ContentContainer.js';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReactUploadFile from 'react-upload-file';
import ImageChooseButton from './components/ImageChooseButton.js';
import UploadForm from './components/UploadForm.js';

import '../css/App.css';
import axios, { post} from 'axios';

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
    marginBottom: "20px",
    minHeight: "380px"
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
const bottomBox = {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
}
const uuidv1 = require('uuid/v1');

class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.state = {
            locationText: "",
            descriptionText: "",
            hideDescribeText: false,
            editState: false,
            displayState: "ViewOther",
            imageUrl: "default-profile-image.png"
        }
        console.log(this.props.firebase.auth().currentUser);

        this.profileHeader = this.profileHeader.bind(this);
        this.profileText = this.profileText.bind(this);
        this.profileButtons = this.profileButtons.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.resolveSaveChanges = this.resolveSaveChanges.bind(this);
        this.pullImage = this.pullImage.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
    }

    componentDidMount() {
        this.pullImage();
        if (this.props.firebase.auth().currentUser.uid === this.props.viewId) {
            this.setState({displayState: "ViewSelf"});
        } else {
            this.setState({displayState: "ViewOther"});
        }
    }

    changePage(direction) {
        this.props.segueToView(direction)
    }

    pullImage() {
        var profileRef = this.props.firebase.storage().ref().child('images/profile/' + this.props.viewId + "/" + this.state.imageUrl);
        // Get the download URL
        profileRef.getDownloadURL().then((url) => {
            // Insert url into an <img> tag to "download"
            console.log(url);
            this.setState({imageUrl: url});
        }).catch((error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    break;
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
            }
        });
    }

    profileHeader() {
        if (this.state.displayState === "EditSelf") {
            return (
                <div>
                    <div style={profilePictureBorder}>
                        <img src={this.state.imageUrl} width="150px" height="150px"></img>
                    </div>
                    <div>
                        <input type="file" name="file" onChange={(e)=>this.onFileUpload(e)} />
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div style={profilePictureBorder}>
                        <img src={this.state.imageUrl} width="150px" height="150px"></img>
                    </div>
                </div>
            )
        }
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
        if (this.state.locationText.length > 0) {
            location = this.state.locationText;
        }
        if (this.state.descriptionText.length > 0) {
            description = this.state.descriptionText;
        }
        var newDisplayName = name + "/" + location + "/" + description;
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

    onFileUpload(e) {
        let files = e.target.files;
        let reader = new FileReader();
        var file = files[0]; // use the Blob or File API
        var id = uuidv1();
        this.props.firebase.storage().ref().child("images/profile/" + this.props.viewId + "/" + id).put(file).then((snapshot) => {
            this.setState({imageUrl: id});
            console.log('Uploaded a blob or file!');
            this.componentDidMount();
        });

        /*
        reader.readAsDataURL(files[0]);
        reader.onload=(e)=>{
            const url = "http://localhost:3000/";
            var formData = {file:e.target.result};

            console.log(typeof files[0]);


            //var realFile = post(url, formData).then(response => console.warn('result', response));
            //console.log(realFile);
        }*/
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
                <Box alignSelf="flex-end">
                    <Button style={buttonStyle} variant="contained" color="secondary" onClick={() => this.setState({displayState: "EditSelf"})}>
                        Edit Profile
                    </Button>
                </Box>
            )
        } else if (this.state.displayState === "EditSelf") {
            return (
                <div class="align-self-end">
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

        if (this.state.imageUrl.length === 0) {
            return (
                <div style={parentDiv}>
                    <AppNavBar
                        segueToView = {this.props.segueToView}
                    ></AppNavBar>
                    <div>
                        TODO: LOADING CIRCLE
                    </div>
                </div>
            )
        } else {
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
}

export default ProfileView;
import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import AppNavBar from './components/AppNavBar.js';
import ContentContainer from './components/ContentContainer.js';
import '../css/App.css';

const logo = require("../img/Logo3.png");
const parentDiv = {
    paddingTop: "80px"
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
    height: "600px",
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

class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.createNewButton = this.createNewButton.bind(this);
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

        return(
            <div>
                
                <AppNavBar></AppNavBar>
                
                <div style={parentDiv}>
                    <div id="profile" style={containerStyle}>

                        <div style={profilePictureBorder}>
                            {/* to be replaced with personal profile picture */}
                            <img style={profilePicture} src={logo} alt="logo"/>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default ProfileView;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { flexbox } from '@material-ui/system';

const logo = require('../../img/Logo3.png');
const useStyles = makeStyles(theme => ({

    profilePicture: {
        width:"30px",
        height:"30px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"


    },
    profilePictureBorder: {
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        float: "left",
        backgroundColor: "#EDEDED",
        textAlign: "center",
        verticalAlign: "middle",
        position: "relative",
    },
    profileName: {
        fontSize: "18px",
        color: "#000000",




    },
    profileLocation: {
        fontSize: "16px",
        color: "#AAAAAA",


    },
    commentLine: {
        borderLeft: "2px solid #FD6D6E",
        marginRight: "5px",
        height: "100%"
    }



}));

export default function AccountTag() {
    const classes = useStyles();
    return (
        <div>
            <div style={{alignItems: "center", marginBottom: "30px"}}>


                <div className={classes.profilePictureBorder}>

                        <img className={classes.profilePicture} src={logo} alt="logo"/>

                </div>

                <div style={{marginLeft: "60px", paddingTop: "5px"}}>
                    <div className={classes.profileName}>TravelFam</div>
                    <div className={classes.profileLocation}>Berkeley, CA</div>
                </div>

            </div>
        </div>


    );
}
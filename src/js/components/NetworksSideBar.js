import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../../css/App.css'


const useStyles = makeStyles(theme => ({
    
    nw_sidebar: {
        padding: "15px",
        backgroundColor: "#C4C4C4",
        width: "flex",
        maxWidth: "20vw",
        minWidth: "15vw",
        
        height: "100vh",
        position: "-webkit-sticky",
        position: "sticky",
        top: "0",
        // boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)",
        // borderRadius: "0px 5px 5px 0px",
        zIndex: "0"
        
    },

    
}));

export default function NetworksSideBar() {
    const classes = useStyles();
    return (
        <div className={classes.nw_sidebar}>

            <h1 style={{fontSize: "20px"}}>Public Networks</h1>
            <ul>
                <li>New York Comic-con</li>
                <li>Event #2</li>
                <li>Event #3</li>
                <li>Event #4</li>
                <li>Event #5</li>

            </ul>



        </div>
            
        
    );
}
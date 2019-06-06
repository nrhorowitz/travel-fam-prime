import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
    
    feed: {
        
        // backgroundColor: "#EDEDED",
        width: "100%",
        height: "100%",
        
        top: "0",
        // boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)",
        // borderRadius: "5px",
        float: "left"
    },

    
}));

export default function FeedHeader() {
    const classes = useStyles();
    return (
        
            <div>
                <h1 style={{lineHeight:"normal"}}>Comic-Con International: San Diego 2019</h1>
                <p style={{lineHeight:"80%"}}>July 18 - 21, 2019</p>
                <p style={{lineHeight:"80%"}} >San Diego, CA</p>
            </div>
            
            
        
    );
}
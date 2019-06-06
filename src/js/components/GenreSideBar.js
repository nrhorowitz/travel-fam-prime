import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Genre from './Genre';
import '../../css/App.css'


const useStyles = makeStyles(theme => ({
    
    sidebar: {
        padding: "15px",
        backgroundColor: "#777777",
        width: "flex",
        maxWidth: "10vw",
        minWidth: "10vw",
        height: "100vh",
        position: "-webkit-sticky",
        position: "sticky",
        top: "0",
        // boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)",
        // borderRadius: "5px 0px 0px 5px",
        
        overflowY: "hidden"
    },

}));

export default function GenreSideBar() {
    const classes = useStyles();
    return (
    
        
        <div className={classes.sidebar}>
            <Genre></Genre>
            
        </div>
        
        
        
        
    );
}
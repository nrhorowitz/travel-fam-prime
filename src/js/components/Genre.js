import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import '../../css/App.css'
import MusicNote from '@material-ui/icons/MusicNote';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    
    genreButton: {
        padding: "15px",
        backgroundColor: "#C4C4C4",
        borderRadius: "5px",
        marginBottom: "10px", 
        width:"100%",
        display: "flex",
        height: "100%"
        
    },

}));

export default function Genre() {
    const classes = useStyles();
    return(
        
        <div>
            <Button className={classes.genreButton}>
                Music Festivals
            </Button>  
            <Button className={classes.genreButton}>
                Comic-Cons
            </Button>  
            <Button className={classes.genreButton}>
                Ski & Snowboard
            </Button>  
            <Button className={classes.genreButton}>
                Private Group  
            </Button>  
            <Button className={classes.genreButton}>
                Add+ 
            </Button> 
            
        </div>
        
        
    );
}
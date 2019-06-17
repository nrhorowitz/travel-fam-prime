import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import FaceIcon from '@material-ui/icons/Face';

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
        zIndex: "0",

        root: {
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        },
        chip: {
          margin: theme.spacing(1),
        },

    },


}));

function createSingleButton(changeChannel, channelData, classes) {
    var channelDataArray = channelData.split("/");
    var pathTo = channelDataArray[0];
    var channelTitle = channelDataArray[1];
    return (
        <ListItem disableGutters={true}>
            <Button variant="contained" color="secondary" className={classes.button} fullWidth={true} onClick={() => changeChannel(pathTo)}>
                #
                {channelTitle}
            </Button>
        </ListItem>
    )
}

export default function NetworksSideBar(props) {
    const classes = useStyles();
    var data = props.channelMap.get(props.category);
    //TODO: order to data??
    var range = [];
    for (var i = 0; i < data.length; i += 1) {
        range.push(i);
    }
    return (
        <div className={classes.nw_sidebar}>
            <Typography variant="h5">
                NETWORK LIST
            </Typography>

            <List dense={true}>
                {range.map((index) => (
                    createSingleButton(props.changeChannel, data[index], classes)
                ))}
            </List>
        </div>
    );
}
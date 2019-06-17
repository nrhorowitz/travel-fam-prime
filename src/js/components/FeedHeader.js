import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


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

export default function FeedHeader(props) {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h4">
                {props.channel}
            </Typography>
        </div>
    );
}
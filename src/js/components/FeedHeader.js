import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';


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
    const data = props.channelMap.get(props.category);
    var currentDataArray = [];
    for (var i = 0; i < data.length; i += 1) {
        var dataArray = data[i].split("/");
        if (dataArray[0] === props.channel) {
            currentDataArray = dataArray;
            break;
        }
    }
    var date = '';
    date += currentDataArray[2];
    date += currentDataArray[3];
    return (
        <div>
            <Typography variant="h3">
                {currentDataArray[1]}
            </Typography>
            <Typography variant="h4">
                {date}
            </Typography>
            <Typography variant="h4">
                {currentDataArray[5]}
            </Typography>
            <Grid container spacing={24}>
                <Grid item xs={3}>
                    <Button fullWidth={true} variant="contained" color="secondary" onClick={() => props.segueToView("CreateListingView")}>CREATE A LISTING</Button>
                </Grid>
            </Grid>
        </div>
    );
}
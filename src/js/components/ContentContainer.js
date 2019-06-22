import React from 'react';
import Container from '@material-ui/core/Container';
import { isAbsolute } from 'path';
import { fade, makeStyles } from '@material-ui/core/styles';
import GenreSideBar from './GenreSideBar';
import NetworkSideBar from './NetworksSideBar';
import FeedHeader from './FeedHeader';
import FeedBody from './FeedBody';
// import FeedContent from './FeedContent'
import '../../css/App.css'

const useStyles = makeStyles(theme => ({
    container: {

        top:"0",
        left:"0",
        right:"0",
        minWidth: "",
        backgroundColor:"#EDEDED",
        // EDEDED
        width: "90vw",
        margin: "105px auto",
        padding: "20px",
        paddingBottom: "40px",
        // boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)",
        // borderRadius: "5px"
    },
    wrapper: {
        display: "flex",
        justifyContent: "space-between"
    },
    rowSideBar: {
        display: "flex",
        flexDirection: "row",
        float: "left",
        position: "sticky",
        // boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)",

    },
    feed: {

        // backgroundColor: "#EDEDED",
        width: "100%",
        height: "100%",
        marginLeft: "40px",

        display: "inline-block",
        top: "0",
        // boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)",
        // borderRadius: "5px",
        float: "left"
    },

}));

function refreshData() {
    alert('refresh');
}

export default function ContentContainer(props) {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <div className={classes.wrapper}>

                <div className={classes.rowSideBar}>
                    <GenreSideBar style={{ marginTop: "20px"}}></GenreSideBar>
                    <NetworkSideBar
                        style={{ marginTop: "20px"}}
                        db = {props.db}
                        category = {props.category}
                        channel = {props.channel}
                        channelMap = {props.channelMap}
                        changeCategory = {props.changeCategory}
                        changeChannel = {props.changeChannel}
                    ></NetworkSideBar>
                </div>
                <div className={classes.feed}>
                    <FeedHeader
                        category = {props.category}
                        channel = {props.channel}
                        channelMap = {props.channelMap}
                    ></FeedHeader>
                    <FeedBody
                        db = {props.db}
                        category = {props.category}
                        channel = {props.channel}
                        channelMap = {props.channelMap}
                        firebase = {props.firebase}
                    ></FeedBody>

                </div>

            </div>
        </Container>
    );
}
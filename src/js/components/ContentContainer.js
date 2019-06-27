import React from 'react';
import Container from '@material-ui/core/Container';
import { isAbsolute } from 'path';
import { fade, makeStyles } from '@material-ui/core/styles';
import GenreSideBar from './GenreSideBar';
import NetworkSideBar from './NetworksSideBar';
import FeedHeader from './FeedHeader';
import FeedBody from './FeedBody';
import CreateListingPage from './CreateListingPage';
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

var createListing = false;

function renderBody(props) {
    if (createListing) {
        return (
            <div>
                CREATE LISTING
            </div>
        )
    } else {
        return (
            <div>
                <FeedHeader
                    category = {props.category}
                    channel = {props.channel}
                    channelMap = {props.channelMap}
                    segueToView = {props.segueToView}
                ></FeedHeader>
                <FeedBody
                    db = {props.db}
                    category = {props.category}
                    channel = {props.channel}
                    channelMap = {props.channelMap}
                    firebase = {props.firebase}
                    segueToView = {props.segueToView}
                    setViewId = {props.setViewId}
                    writeToDatabase = {props.writeToDatabase}
                ></FeedBody>
            </div>
        )
    }
}

//  <GenreSideBar style={{ marginTop: "20px"}}></GenreSideBar>
export default function ContentContainer(props) {
    const classes = useStyles();
    if (props.type === "dashboard") {
        return (
            <Container className={classes.container}>
                <div className={classes.wrapper}>

                    <div className={classes.rowSideBar}>
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
                        {renderBody(props)}
                    </div>

                </div>
            </Container>
        );
    } else if (props.type === "createlisting") {
        return (
            <Container className={classes.container}>
                <div className={classes.wrapper}>
                    <CreateListingPage></CreateListingPage>
                </div>
            </Container>
        );
    }

}
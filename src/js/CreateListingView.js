import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppNavBar from './components/AppNavBar.js';
import ContentContainer from './components/ContentContainer.js';
import Container from '@material-ui/core/Container';
import { fade, makeStyles } from '@material-ui/core/styles';
import '../css/App.css';

var uniqid = require('uniqid');

class CreateListingView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //hardcoding posts for now
            category: 'music-festival',
            channel: 'twitchcon-2019', //TODO: REMEMBER STATE
            channelMap: 'None',
        }
        this.changePage = this.changePage.bind(this);
        this.createNewButton = this.createNewButton.bind(this);
        this.pullFromDatabase = this.pullFromDatabase.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changeChannel = this.changeChannel.bind(this);
        this.writeToDatabase = this.writeToDatabase.bind(this);
    }

    componentDidMount() {
        this.pullFromDatabase();
    }

    changePage(direction) {
        this.props.segueToView(direction)
    }

    createNewButton(name, direction) {
        return (
            <Button
                name={name}
                direction={direction}
                color="primary"
                onClick={() => this.changePage(direction)}>
                {name}
            </Button>
        );
    }

    changeCategory(category) {
        //TODO: REMEMBER IN USER TOKEN
        this.setState({category: category});
    }

    changeChannel(channel) {
        //TODO: REMEMBER IN USER TOKEN
        this.setState({channel: channel});
        this.pullFromDatabase();
    }

    pullFromDatabase() {
        this.props.db.collection("category").get().then(querySnapshot => {
            this.setState({channelMap: 'None'});
            var channelMap = new Map();
            querySnapshot.forEach(doc => {
                // TODO: insert sort by alphanumeric??
                var category = doc.id;
                var channels = doc.data().channels;
                channelMap.set(category, channels);
            });
            this.setState({channelMap: channelMap});
        }).catch(err => {
            console.log('Error getting document', err);
        });
    }

    /**
     * globalpath category/music-festival/twitchcon-2019/{uniqueID}/replies
     * twitchcon (collection) --> uniqueID (document)
     * Each first level document represents a listing - contains information:
     * creationDate: timestamp
     * currentDate: max timestamp of self and all children
     * id: id of user who posted
     * replyString: string of replies --
     *
     * @param  {[type]} input      contains all parts of listing in string form
     * @param  {[type]} prefixPath [description]
     * @return {[type]}            [description]
     */
    writeToDatabase(input, prefixPath="") {
        var today = new Date();
        var currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var currentRef = this.props.db.collection("category").doc(this.state.category).collection(this.state.channel).doc("feedData");
        //TODO: FIX TIMESTAMP

        //Read database
        var currentFeed = currentRef.get().then(doc => {
            var feed = doc.data().feedData;
            if (prefixPath === "") {
                //postId<I>userId<I>currentDate<I>creationDate<I>content
                var newListing = uniqid() + "<I>" + this.props.firebase.auth().currentUser.uid + "<I>" + currentDate + "<I>" + currentDate + "<I>0<I>" + input + "<P>";
                if (feed.length === 0) {
                    feed.push(newListing);
                } else {
                    //TODO: sort by SOMETHING (for now just time, because most recent always at front)
                    feed.push(newListing);
                }
            } else {

            }
            //Write Database
            currentRef.update({
                feedData: feed
            }).then(() => {

            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        if (this.state.channelMap === 'None') {
            return (
                <div>
                    TODO: SPINNING CIRCLE
                </div>
            )
        } else {
            console.log(this.props.currentUser);
            return(
                <div>
                    <AppNavBar
                        segueToView = {this.props.segueToView}
                        setViewId = {this.props.setViewId}
                        currentUser = {this.props.currentUser}
                    ></AppNavBar>
                    <ContentContainer
                        db = {this.props.db}
                        category = {this.state.category}
                        channel = {this.state.channel}
                        channelMap = {this.state.channelMap}
                        changeCategory = {this.changeCategory}
                        changeChannel = {this.changeChannel}
                        firebase = {this.props.firebase}
                        segueToView = {this.props.segueToView}
                        setViewId = {this.props.setViewId}
                        writeToDatabase = {this.writeToDatabase}
                        type = "createlisting"
                    ></ContentContainer>
                </div>
            )
        }
    }
}





export default CreateListingView;
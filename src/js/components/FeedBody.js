import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AccountTag from './AccountTag';
import TextField from '@material-ui/core/TextField';
import uuid from 'uuid';
import { textAlign } from '@material-ui/system';
import ReplyBox from './ReplyBox';

const postBox = {
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
    // boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)",
    marginTop: "30px",
    height: "190px",
    padding: "20px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#FD6D6E"
}
const postArea = {
    border: "none",
    width: "100%",
    height: "70%",
    resize: "none",
    fontSize: "15px",
    outline: "none"
}
const postButton = {
    //backgroundColor: "#FD6D6E",
    borderRadius: "5px",
    marginBottom: "10px",
    //height: "30px",
    color: "#FFFFFF",
    fontSize: "16px",
    float: "right",
    marginTop:"0px",
}
const feed = {
    backgroundColor: "#FFFFFF",
    // borderRadius: "20px",
    // boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)",
    marginTop: "30px",
    minHeight: "1000vh",
    padding: "20px"
}
const emptyFeed = {
    marginTop: "30px",
    padding: "20px",
    height: "30vh"
}
const postedBox = {
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    // boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)",
    marginTop: "30px",
    minHeight: "20vh",
    display: "flex",
    position: "relative",
    borderLeft: "15px solid red"
    // borderStyle: "solid",
    // borderWidth: "1px",
    // borderColor: "#FD6D6E"
}
const outputPost = {
    marginLeft: "20px",
    height: "flex",
    width: "flex",
    overflowWrap: "break-word",
    flex: "1"

}
const footerImages = {
    width: "15px",
    height: "15px",
    paddingTop: "2px"
}
const footerText = {
    fontSize: "14px",
    color: "#9B9B9B",
    flexDirection: "column",
    marginRight: "16px",
    border: "none",
    cursor: "pointer",
    outline: "none",


}
const footerGroup = {
    position: "absolute",
    bottom: "0",
    margin: "15px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
}
const interested_svg = require("../../img/star.svg");
const reply_svg = require("../../img/reply.svg");
const share_svg = require("../../img/share.svg");

class FeedBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //hardcoding posts for now
            items: [],
            userMap: []
        }
        this.readBody = this.readBody.bind(this);
        this.readPosts = this.readPosts.bind(this);
        this.readSinglePost = this.readSinglePost.bind(this);
        this.readSinglePostRecursive = this.readSinglePostRecursive.bind(this);
        this.pullFromDatabase = this.pullFromDatabase.bind(this);
        this.writeToDatabase = this.writeToDatabase.bind(this);
        this.toggleReplyBoxVisible = this.toggleReplyBoxVisible.bind(this);
        this.getVisibleFromPath = this.getVisibleFromPath.bind(this);
        this.showReplyBox = this.showReplyBox.bind(this);
        this.pushItemSorted = this.pushItemSorted.bind(this);
    }

    componentDidMount() {
        this.pullFromDatabase([], "users", "");
        this.pullFromDatabase([], "feed", this.props.category + "/" + this.props.channel);
    }

    writeToDatabase(input, prefixPath) {
        var currentRef = this.props.db.collection("category");
        var pathArray = prefixPath.split("/");
        var itemsRef = this.state;
        for (var i = 0; i < pathArray.length; i += 1) {
            if (i % 2 === 0) {
                currentRef = currentRef.doc(pathArray[i]);
            } else {
                currentRef = currentRef.collection(pathArray[i]);
            }
        }
        //UPDATE REPLIES ON COMMENTED
        currentRef.get().then(querySnapshot => {
            var prevReplyCount = querySnapshot.data().replies;
            currentRef.update({replies: prevReplyCount+1});
        }).catch(err => {
            console.log('Error getting document', err);
        });

        var today = new Date();
        var currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        currentRef.collection("reply").add({
            id: '0RHvET4AUXlPGr3Ug921',
            message: input,
            replies: 0,
            creationDate: currentDate + "/" + currentTime,
            date: currentDate + "/" + currentTime,
        }).then(() => {
            console.log('added');
        }).catch(err => {
            console.log('Error getting document', err);
        });
        this.pullFromDatabase([], "feed", this.props.category + "/" + this.props.channel);
    }

    pushItemSorted(list, id, data) {
        var date = data.date;
        //list is a sorted list by timestamp with most recent (largest data/time) at the front
        for (var i = 0; i < list.length; i += 1) {
            var currentDate = list[i].data.date;
            if (date >= currentDate) {
                list.splice(i, 0, {id: id, data: data, replyBox: false});
                return;
            }
        }
        list.push({id: id, data: data, replyBox: false});
    }

    pullFromDatabase(items, content, prefixPath) {
        console.log('call');
        if (content === "users") {
            console.log('users');
            this.props.db.collection("users").get().then(querySnapshot => {
                var userMap = new Map();
                querySnapshot.forEach(doc => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    userMap.set(doc.id, doc.data());
                });
                this.setState({userMap: userMap});
            }).catch(err => {
                console.log('Error getting document', err);
            });
        } else if (content === "feed") {
            var currentRef = this.props.db.collection("category");
            var pathArray = prefixPath.split("/");
            var itemsRef = this.state;
            if (items.length === 0) { //RESET IF FIRST
                itemsRef.items = [];
            }
            for (var i = 0; i < pathArray.length; i += 2) {
                currentRef = currentRef.doc(pathArray[i]);
                currentRef = currentRef.collection(pathArray[i + 1]);
                for (var j = 0; j < itemsRef.length; j += 1) {
                    if (itemsRef[j].id === pathArray[i]) {
                        itemsRef = itemsRef[j].data;
                        break;
                    }
                }
                if (itemsRef.items === undefined) {
                    itemsRef.items = [];
                }
                itemsRef = itemsRef.items;
            }
            currentRef.get().then(querySnapshot => {
                console.log(querySnapshot);
                querySnapshot.forEach(doc => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());

                    this.pushItemSorted(itemsRef, doc.id, doc.data()); //TODO: remove other
                    //itemsRef.push({id: doc.id, data: doc.data(), replyBox: false}); //timestamp is the max time of all elements in tree - deleting new reply will cause post to go back down
                    if (doc.data().replies > 0) {
                        this.pullFromDatabase(doc.data(), "feed", prefixPath + "/" + doc.id + "/reply");
                    }
                });
                this.setState({items: this.state.items}); //*****
            }).catch(err => {
                console.log('Error getting document', err);
            });
        }
    }

    readSinglePostRecursive(id, data, path) {
        if (data !== undefined) {
            return (
                <List>
                    {data.map(({id, data}) => (
                        this.readSinglePost(data.id, data, path + "/reply/" + id)
                    ))}
                </List>
            )
        } else {
            return (
                <div>
                </div>
            )
        }
    }

    toggleReplyBoxVisible(id) {
        //GO TO PATH TOGGLE IN STATE
        var pathArray = id.split("/");
        var itemsRef = this.state;
        for (var i = 0; i < pathArray.length - 1; i += 2) {
            for (var j = 0; j < itemsRef.length; j += 1) {
                if (itemsRef[j].id === pathArray[i]) {
                    itemsRef = itemsRef[j].data;
                    break;
                }
            }
            if (itemsRef.items === undefined) {
                itemsRef.items = [];
            }
            itemsRef = itemsRef.items;
        }
        for (var j = 0; j < itemsRef.length; j += 1) {
            if (itemsRef[j].id === pathArray[pathArray.length-1]) {
                itemsRef[j].replyBox = !itemsRef[j].replyBox;
                break;
            }
        }
        this.setState({items: this.state.items});
    }

    getVisibleFromPath(id) {
        var pathArray = id.split("/");
        var itemsRef = this.state;
        for (var i = 0; i < pathArray.length - 1; i += 2) {
            for (var j = 0; j < itemsRef.length; j += 1) {
                if (itemsRef[j].id === pathArray[i]) {
                    itemsRef = itemsRef[j].data;
                    break;
                }
            }
            if (itemsRef.items === undefined) {
                itemsRef.items = [];
            }
            itemsRef = itemsRef.items;
        }
        for (var j = 0; j < itemsRef.length; j += 1) {
            if (itemsRef[j].id === pathArray[pathArray.length-1]) {
                return itemsRef[j].replyBox;
            }
        }
    }

    showReplyBox(id, data, path) {
        if (this.getVisibleFromPath(path)) {
            return (
                <ReplyBox id={path} writeToDatabase={this.writeToDatabase} visible={(() => (this.getVisibleFromPath(path)))} toggleReplyBoxVisible={this.toggleReplyBoxVisible}></ReplyBox>
            )
        } else {
            return (
                <div>
                </div>
            )
        }
    }

    readSinglePost(id, data, path) {
        var replyString = "";
        if (data.replies === 0) {
            replyString = " Comment";
        } else {
            replyString = " " + data.replies + " Comments";
        }
        return (
            <ListItem style={postedBox}>
                <div style={{marginBottom: "70px"}}>
                    <AccountTag id={data.id} userMap={this.state.userMap} data={data}></AccountTag>
                    <div id="outputPost" style={outputPost}>
                        {data.message}
                    </div>
                    <div style={footerGroup}>
                        <div style={footerText}><img style={footerImages} src={interested_svg} alt="star"/> Interested</div>
                        <button onClick={(() => (this.toggleReplyBoxVisible(path)))} style={footerText}><img style={footerImages} src={reply_svg} alt="reply"/>{replyString}</button>
                        <div style={footerText}><img style={footerImages} src={share_svg} alt="reply"/> Share</div>
                    </div>
                    {this.showReplyBox(id, data, path)}
                    {this.readSinglePostRecursive(data.id, data.items, path)}
                </div>
            </ListItem>
        )
    }

    readPosts() {
        if (this.state.items.length == 0) {
            return (
                <div>LOADING SPINNING CIRCLE</div>
            );
        } else {
            var path = this.props.category + "/" + this.props.channel;
            return (
                <List>
                    {this.state.items.map(({id, data}) => (
                        this.readSinglePost(id, data, path + "/" + id)
                    ))}
                </List>
            )
        }

    }

    readBody() {
        return(
            <div>

                {/* Make a post textarea */}
                <div style={postBox}>
                    <TextField id="inputPost" style={postArea} label="CREATE POST" rows="5" multiline></TextField>

                    {/* Post Button */}
                    <Button style={postButton} variant="contained" color="secondary" onClick={() => {
                        var input = document.getElementById("inputPost").value
                        //reset post area to nothing after posting
                        document.getElementById("inputPost").value="";
                        //if post had text, add new post to state
                        var today = new Date();
                        var currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                        var currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        if (input !== '') {
                            this.props.db.collection("category").doc(this.props.category).collection(this.props.channel).add({
                                id: '0RHvET4AUXlPGr3Ug921',
                                message: input,
                                replies: 0,
                                creationDate: currentDate + "/" + currentTime,
                                date: currentDate + "/" + currentTime
                            }).then(() => {
                                console.log('added');
                            }).catch(err => {
                                console.log('Error getting document', err);
                            });
                            this.componentDidMount();
                            //this.pullFromDatabase([], "feed", this.state.category + "/" + this.state.channel);
                        }
                    }}>

                        POST

                    </Button>
                </div>
                {this.readPosts()}
            </div>
        );
    }

    render() {
        return(
            this.readBody()
        );
    }
}

export default FeedBody;
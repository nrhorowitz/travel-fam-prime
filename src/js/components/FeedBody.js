import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AccountTag from './AccountTag';
import uuid from 'uuid';
import { textAlign } from '@material-ui/system';

const hSeparator = {
    borderColor: "#C4C4C4",
    opacity: "0.2"
}
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
    backgroundColor: "#FD6D6E",
    // borderRadius: "5px",
    marginBottom: "10px",
    height: "30px",
    color: "#FFFFFF",
    fontSize: "12px",
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
    borderRadius: "20px",
    // boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)",
    marginTop: "30px",
    minHeight: "20vh",
    display: "flex",
    position: "relative"
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
            category: 'music-festival',
            channel: 'edc-la-2019',
            items: [
                {id: uuid(), post: 'Hihihii', replies: {id: uuid(), reply: 'Byebyebye'}},
                {id: uuid(), post: "raveraverave"},
                {id: uuid(), post: 'travelfaaaaam'}
            ],
            message: 'log',
            loading: 'dog'
        }
        this.readBody = this.readBody.bind(this);
        this.readPosts = this.readPosts.bind(this);
        this.readSinglePost = this.readSinglePost.bind(this);
    }

    componentDidMount() {
        this.setState({loading: 'true'});

        this.props.db.collection("category").doc(this.state.category).collection(this.state.channel).get().then(querySnapshot => {
            if (querySnapshot) {
                alert("dog");
            } else {
                alert("notdog");
            }
            querySnapshot.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                //items.push({id: doc.id, data: "hi"});
                alert(doc.id);
                if (this.state.loading == 'true') {
                    this.setState({message: doc.id});
                }
            });
            //this.setState({loading: 'troggers'});
            alert('done');
        }).catch(err => {
            console.log('Error getting document', err);
        });


        //alert('loading');

    }

    componentWillUnmount() {
        this.setState({loading: 'false'});
        alert('done');
    }

    replyToPost() {
        alert("REPLY!")
    }

    readSinglePost(id, data) {
        alert(id);
        alert(data);
        return (
            <ListItem style={postedBox}>
                <div style={{marginBottom: "70px"}}>
                    <AccountTag></AccountTag>
                    <div id="outputPost" style={outputPost}>
                        {data}
                    </div>
                    <div style={footerGroup}>

                        <div style={footerText} ><img style={footerImages} src={interested_svg} alt="star"/> Interested</div>
                        <button onClick={this.replyToPost} style={footerText}><img style={footerImages} src={reply_svg} alt="reply"/> Reply</button>
                        <div style={footerText}><img style={footerImages} src={share_svg} alt="reply"/> Share</div>


                    </div>
                </div>
            </ListItem>
        )
    }

    readPosts() {
        return (
            /*<List>
                {items2.map(({id, data}) => (
                    this.readSinglePost(id, data)
                ))}
            </List>*/
            <div>{this.state.message}</div>
        );
    }

    readBody() {
        //const { items } = this.state;
        return(
            <div>

                {/* Make a post textarea */}
                <div style={postBox}>
                    <textarea id="inputPost" style={postArea} placeholder="Type Message..."></textarea>
                    <hr style={hSeparator}></hr>

                    {/* Post Button */}
                    <Button style={postButton} variant="contained" color="secondary" onClick={() => {
                        var input = document.getElementById("inputPost").value
                        //reset post area to nothing after posting
                        document.getElementById("inputPost").value="";
                        //if post had text, add new post to state
                        if (input !== '') {
                            this.setState(state => ({
                                items: [{id: uuid(), post: input}, ...state.items]
                            }));
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
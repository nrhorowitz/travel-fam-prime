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
    position: "relative",
    
    // borderStyle: "solid",
    // borderWidth: "1px",
    // borderColor: "#FD6D6E"
}
const commentLine = {
    borderLeft: "2px solid #FD6D6E",
    marginLeft: "10px",
    marginRight: "20px",
    marginTop: "10px",
    marginBottom: "15px",
    height: "flex"
    
    
    
    

}
const outputPost = {
    marginLeft: "5px",
    height: "flex",
    width: "30vw",
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
    marginBottom: "15px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
}
const testing = {
    backgroundColor: "#4286f4",
    borderRadius: "20px", 
    // boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)",
    
}

class FeedBody extends Component { 
    constructor(props) {
        super(props);
        this.state={
            //hardcoding posts for now
            items: [
                {id: uuid(), post: "oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"},
                {id: uuid(), post: 'Hihihii', replies: {id: uuid(), reply: 'Byebyebye'}},
                {id: uuid(), post: "raveraverave"},
                {id: uuid(), post: 'travelfaaaaam'},
                
            ]
        }
        this.addElement = this.addElement.bind(this);
        this.removeElement = this.removeElement.bind(this);
        this.replyToPost = this.replyToPost.bind(this); 
    }

    addElement(parentId, elementTag, elementId, html) {
        var p = document.getElementById(parentId);
        var newElement = document.createElement(elementTag);
        newElement.setAttribute('id', elementId);
        newElement.innerHTML = html;
        newElement.setAttribute("style", testing);
        p.appendChild(newElement);
    }

    removeElement(elementId) {
        var element = document.getElementById(elementId);
        element.parentNode.removeChild(element); 
    }

    replyToPost() {
        var html = "<div> <AccountTag></AccountTag> </div>"
        this.addElement('postedBox', 'div', 'testing', html);
    }
    
    render() {
        const { items } = this.state;
        const interested_svg = require("../../img/star.svg");
        const reply_svg = require("../../img/reply.svg");
        const share_svg = require("../../img/share.svg");
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
                
                {/* Existing posts timeline */}
                <List>
                    {items.map(({id, post}) => (
                        
                        <ListItem id="postedBox" style={postedBox}>
                            <div style={commentLine}>
                                <div style={{marginBottom: "70px", marginLeft: "20px"}}>
                                    
                                        <AccountTag></AccountTag>
                                    
                                    
                                        <div id="outputPost" style={outputPost}>
                                            
                                                {post}
                                            
                                        </div>
                                        
                                        
                                        {/* Interested, Reply, Share post footers */}
                                        <div style={footerGroup}>
                                            
                                            <div style={footerText} ><img style={footerImages} src={interested_svg} alt="star"/> Interested</div>
                                            <button onClick={this.replyToPost} style={footerText}><img style={footerImages} src={reply_svg} alt="reply"/> Reply</button>
                                            <div style={footerText}><img style={footerImages} src={share_svg} alt="reply"/> Share</div>
                                            
                                        </div>

                                        {/* need to add reply comment ui here  */}
                                </div>
                                    
                            </div>
                            
                        </ListItem>
                        
                    ))}
                </List>
            </div>
        );
    }
}

export default FeedBody; 
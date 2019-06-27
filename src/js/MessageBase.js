import React, { Component } from 'react';
import firebase from '../config/Fire';
import uuid from 'uuid';
import AppNavBar from './components/AppNavBar.js';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import hashtag from '@material-ui/icons/HdSharp';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import searchBar from './components/searchBar';



var database = firebase.database();
var groupLogo = require('../img/groupChat.svg')
var dmLogo = require('../img/directChat.svg')
var groupAddIcon = require('../img/groupAdd.svg')
var personAddIcon = require('../img/personAdd.svg')
const addIcon = require('../img/addCircle.svg')


const wrapper = {
    margin: "auto",
}
const sidebarLabels = {
    marginLeft: "15px",
    marginBottom: "0px", 
    marginTop: "30px"
}
const sidebarStyle = {
    // display: "flex",
    // flexDirection: "row",
    // float: "left",
    // position: "sticky",
    // backgroundColor: "#C4C4C4",
    backgroundColor: "#EDEDED",
    height: "80vh",
    width: "20vw",
    maxWidth: "22vw",
    float: "left",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    overflow: "auto"
    // paddingLeft: "15px"
}
const containerStyle = {
    // backgroundColor:"#EDEDED",
    backgroundColor: "#FFFFFF",
    width: "90vw",
    height: "90vh",
    display: "table",
    margin: "10px auto",
    marginBottom: "5px",
    // padding: "15px"
    
}
const chatBoxHeader = {
    borderRadius: "10px 10px 0px 0px",
    width: "70vw",
    height: "80px",
    backgroundColor:"#ffffff",
    position: "absolute",
    top: "0",
    borderBottom: "2px solid #EDEDED"
}
const nameOfChat = {
    marginLeft: "20px"
}
const chatBoxStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    width: "70vw",
    height: "80vh",
    marginLeft: "21vw",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)",
    position: "relative"
}
const chat = {
    backgroundColor: "#FFFFFF",
    width: "70vw",
    paddingLeft: "15px",
    paddingRight: "15px",
    // border: "2px solid black",
    height: "60vh",
    position: "absolute",
    marginTop: "82px",
    overflowWrap: "break-word",
    overflowY: "auto",
    paddingBottom: "70px"
    
}
const chatBoxFooter = {
    borderRadius: "0px 0px 10px 10px",
    bottom: "0",
    width: "70vw",
    height: "80px",
    backgroundColor: "#ffffff",
    position: "absolute",
    bottom: "0",
    borderTop: "2px solid #EDEDED",
    paddingLeft: "15px",
    paddingRight: "15px"
}
const messageInputStyle = {
    border: "none",
    resize: "none",
    outline: "none",
    height: "100%",
    width: "90%",
    // border: "1px solid black",
    fontSize: "16px"

}
const sendButtonStyle = {
    float: "right",
    marginTop: "20px",
    position: "absolute"
}
const nameButtonStyle = {
    margin: "0 auto",
    display: "table",
    width: "18vw",
    marginTop: "10px",
    height: "60px"
}
const mainDiv = {
    paddingTop: "100px"
}

class MessageBase extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            //harcoding data for now
            currentUser: "Dahoon Bot",
            currentChatId: "",
            messages: [],
            currentUserGroupContacts: ["group 1", "group 2", "group 3"],
            currentUserDmContacts: ["person 1", "person 2", "person 3"],
            selectedIndex: 1,
            setSelectedIndex: 1,
          
            
            //harcoding for now 
            

        }
        this.writeData = this.writeData.bind(this)
        this.updateFromDB = this.updateFromDB.bind(this)
        this.switchChat = this.switchChat.bind(this)
        this.createChat = this.createChat.bind(this)
        this.getTimeStamp = this.getTimeStamp.bind(this)
        this.handleChatClick = this.handleChatClick.bind(this)
        this.populateGroupChatList = this.populateGroupChatList.bind(this)
        this.populateDirectChatList = this.populateDirectChatList.bind(this)
        this.clearChat = this.clearChat.bind(this)
        // this.createGroup = this.createGroup.bind(this)
        
        // var chatIndex = 0;
    }

    componentDidMount() {
        var currentChatId = localStorage.getItem('currentChatId')
        if (currentChatId !== "") {
            this.setState({currentChatId: currentChatId})
            console.log(this.state.currentChatId)
            this.updateFromDB(currentChatId)
        } 
        // else (
        //     currentChatId is empty means no chat was ever selected. Probably new user
        //     todo: start chat prompt/image
            
        // )
        
    }

    clearChat() {
        this.setState({messages: []})
    }

    populateGroupChatList(groupChats) {

        
        let groupChatList = [
            // <ListItem 
            //     button
            //     onClick={() => {
            //         // this.createChat(true)
            //         this.promptSearchUser()
            //     }}
            //     >
            //     <ListItemIcon>
            //         <img src={groupAddIcon} />
            //     </ListItemIcon>
            //     <ListItemText primary={"Add"} />
            // </ListItem>
            
        ] 
        
        groupChats.forEach((item) => {
            groupChatList.push(
                <ListItem
                    button
                    onClick={() => {
                        document.getElementById("nameOfChat").innerHTML = item
                        //need to clear old shit 
                    }   
                    }
                    > 
                    <ListItemIcon>
                        <img src={groupLogo} />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                </ListItem>
            )
        })
        
        return groupChatList

    }

    populateDirectChatList(directChats) {

        let dmChatList = [
            // <ListItem 
            //     button
            //     onClick={() => {
            //         this.createChat(false)
            //     }}
            //     >
            //     <ListItemIcon>
            //         <img src={personAddIcon} />
            //     </ListItemIcon>
            //     <ListItemText primary={"Add"} />
            // </ListItem>
        ]
        directChats.forEach((item) => {
            dmChatList.push(
                <ListItem 
                    button
                    onClick={() => {
                        document.getElementById("nameOfChat").innerHTML = item
                        }
                    }
                    >
                    <ListItemIcon>
                        <img src={dmLogo} />
                    </ListItemIcon>
                    <ListItemText primary = {item} />
                </ListItem>
            )
        })

        return dmChatList

    }

    handleChatClick(event, index) {
        this.setState({setSelectedChat: index})
        this.setState({selectedChat: index})

        // this.setState({chatIndex: this.state.chatIndex += 1})
    }

    getTimeStamp() {
        var today = new Date();
        var date = (today.getFullYear() < 10 ? "0" + today.getFullYear() : today.getFullYear()) + ":" +
                    (today.getMonth() < 10 ? "0" + today.getMonth() : today.getMonth()) + ":" +
                    (today.getDate() < 10 ? "0" + today.getDate() : today.getDate())
        var time = (today.getHours() < 10 ? "0" + today.getHours() : today.getHours())+ ":" + 
                    (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + ":" + 
                    (today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds())

        var dateTime = date+' '+time
        return dateTime
    }

    createChat(groupChatBool) {

        //ui update part first 

        

        //firebase realtime updates
        var dateTime = this.getTimeStamp()
        var chatData = {
            timeStamp: dateTime,
            userList: [this.state.currentUser, ]

        }

        var newChatKey = database.ref().child("allMessages").push().getKey();

        if (groupChatBool) {
            this.setState({currentUserGroupContacts: [...this.state.currentUserGroupContacts, newChatKey]})
        } else {
            this.setState({currentUserDmContacts: [...this.state.currentUserDmContacts, newChatKey]})
        }
        
        var chatUpdates = {}
        chatUpdates['/allChats/' + newChatKey] = chatData
        database.ref().update(chatUpdates)
        localStorage.setItem("currentChatId", newChatKey)
        this.setState({currentChatId: newChatKey})
        
    }

    switchChat(contactName) {
        // this.state.setState(currentChatId) = contactName
        this.setState({currentChatId: contactName})
    }

    updateFromDB(currentChatId) {
        
    
        console.log(currentChatId)
        var db = firebase.database().ref("/allMessages/").child(currentChatId)
        db.once("value", (snapshot) => {
            var chatDB = snapshot.val()
            var i = 0
            var messageDataHolder = []
            for (var element in chatDB) {
                var messageKey = Object.keys(chatDB)[i]
                var messageData = chatDB[messageKey]
                messageDataHolder.push(messageData)
                i+=1
            }
           
            this.setState({messages: messageDataHolder})
            console.log("Asads")
        })
    }

    writeData() {
        
        var dateTime = this.getTimeStamp()

        var message = document.getElementById("message").value;
        if (message !== "") {
            var messageData = {
                username: this.state.currentUser,
                message: message
                
            }
            // this key is the next unique id generated by firebase.
            // will use it as specific chat unique id
            // var chatKey = database.ref().child("allMessages").push().getKey(); 
            var chatKey = this.state.currentChatId
            console.log(chatKey)
            var chatUpdates = {};
            chatUpdates['/allMessages/' + chatKey + '/' + dateTime] = messageData; 
            database.ref().update(chatUpdates);

            // console.log(messageData)
            this.setState( state => ({
                messages: [...state.messages, messageData]
            }))

            document.getElementById("message").value = "";

        }
    }

    

    render() {

        return(

            
            <div style={mainDiv}>
                <AppNavBar></AppNavBar>
                
                <div style={containerStyle}>
                    <div style={wrapper}>
                        <div style={sidebarStyle}>
                            <searchBar style={{width: "100px"}}></searchBar>
                            {/* <Button onClick={() => this.switchChat("Nathan Horowitz")} style={nameButtonStyle} variant="outlined" color="primary">Nathan Horowitz</Button>
                            <Button onClick={() => this.switchChat("Yan Bai")} style={nameButtonStyle} variant="outlined" color="primary">Yan Bai</Button>
                            <Button onClick={this.createChat} style={nameButtonStyle} variant="outlined">+</Button> */}
                            {/* <h2 style={sidebarLabels}><u>Groups</u></h2> */}
                            <List component="nav" aria-label="group chats">

                                <ListItem button>
                                    <ListItemIcon>
                                        <img src={addIcon} />
                                    </ListItemIcon>
                                    <ListItemText primary={"New Chat"} />
                                </ListItem>

                                <Divider></Divider>
                                {
                                    this.populateGroupChatList(this.state.currentUserGroupContacts)
                                }
                                <Divider></Divider>
                                {
                                    this.populateDirectChatList(this.state.currentUserDmContacts)

                                }

                            </List>

                            {/* <h2 style={sidebarLabels}><u>Direct</u></h2> */}
                            {/* <List component="nav" aria-label="dm chats">

                                {
                                    this.populateDirectChatList(this.state.currentUserDmContacts)
                                }

                            </List> */}

                        </div>
                        <div style={chatBoxStyle}>
                            <div id="chatBoxHeader" style={chatBoxHeader}>
                        
                                <h2 style={nameOfChat} id="nameOfChat"></h2>
                                
                            </div>
                            <div id="chatDiv"style={chat}>
                              
                                    {
                                        this.state.messages.map(({username, message}) => (
                                    
                                        <ListItem>
                                            {username}: { }
                                            {message}
                                        </ListItem>
                                        ))
                                    }
                                    
                            </div>

                            <div style={chatBoxFooter}>
                                <input id="message" placeholder="New message..."style={messageInputStyle}></input>
                                
                                <Button style={sendButtonStyle} 
                                        variant="contained" 
                                        color="secondary" 
                                        // onClick={this.sendMessage}>
                                        onClick={this.writeData}>
                                    SEND
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MessageBase;
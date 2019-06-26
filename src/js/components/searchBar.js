import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const addIcon = require('../../img/addCircle.svg')

const root = {
  padding: "2px 4px",
  display: "flex", 
  alignItems: "center", 
  width: "400"
}
const input = {
  marginLeft: "8",
  flex: "1"
}
const iconButton = {
  padding: "10"
}
const divider = {
  width: "1",
  height: "28",
  margin: "4"
}

class searchBar extends Component {
  render() {
    return(
      <Paper style={root}>
        <InputBase 
          style={input}
          placeholder="Search in Contacts Lists..."
          inputProps={{'aria-label': 'Search in Contacts Lists'}}
        />
        <IconButton style={IconButton}>
          <SearchIcon></SearchIcon>
        </IconButton>
        <Divider style={divider}></Divider>
        <IconButton style={IconButton}>
          <img src={addIcon} />
        </IconButton>
      </Paper>
    )
  }
}

export default searchBar
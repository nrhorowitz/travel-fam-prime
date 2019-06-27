import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import uuid from 'uuid';
import { textAlign } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class CreateListingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            postingTitle: "",
            datesAvailable: "",
            channels: "",
            description: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

    }

    handleChange(e, name) {
        if (name === 'postingTitle') {
            this.setState({postingTitle: e.target.value});
        } else if (name === 'datesAvailable') {
            this.setState({datesAvailable: e.target.value});
            //TODO: drop down date range
        } else if (name === 'channels') {
            this.setState({channels: e.target.value});
        } else if (name === 'description') {
            this.setState({description: e.target.value});
        }
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography variant="h6">
                        Posting Title
                    </Typography>
                    <TextField
                        id="outlined-name"
                        label="Posting Title"
                        value={this.state.postingTitle}
                        onChange={(e)=>this.handleChange(e, 'postingTitle')}
                        margin="normal"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h6">
                        Dates Available
                    </Typography>
                    <TextField
                        id="outlined-name"
                        label="Dates Available"
                        value={this.state.datesAvailable}
                        onChange={(e)=>this.handleChange(e, 'datesAvailable')}
                        margin="normal"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h6">
                        Channels
                    </Typography>
                    <TextField
                        id="outlined-name"
                        label="Channels"
                        value={this.state.channels}
                        onChange={(e)=>this.handleChange(e, 'channels')}
                        margin="normal"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        Description
                    </Typography>
                    <TextField
                        id="outlined-name"
                        label="Description"
                        value={this.state.description}
                        onChange={(e)=>this.handleChange(e, 'description')}
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows="4"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    THERE
                </Grid>
                <Grid item xs={12} sm={6}>
                    DELILAH
                </Grid>
            </Grid>
        )
    }
}

export default CreateListingPage;
import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import AppNavBar from './components/AppNavBar.js';
import ContentContainer from './components/ContentContainer.js';
import '../css/App.css';

class DashBoardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //hardcoding posts for now
            category: 'music-festival',
            channel: 'edc-la-2019',
            channelMap: 'None',
        }
        this.changePage = this.changePage.bind(this);
        this.createNewButton = this.createNewButton.bind(this);
        this.pullFromDatabase = this.pullFromDatabase.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changeChannel = this.changeChannel.bind(this);
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
                    ></ContentContainer>
                </div>
            )
        }
    }
}

export default DashBoardView;
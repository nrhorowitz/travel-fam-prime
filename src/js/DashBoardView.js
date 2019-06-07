import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import AppNavBar from './components/AppNavBar.js';
import ContentContainer from './components/ContentContainer.js';
import '../css/App.css';

class DashBoardView extends React.Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.createNewButton = this.createNewButton.bind(this);
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

    render() {

        return(
            <div>
                {/* DashBoardView
                {this.createNewButton("EDIT PROFILE", "EditProfileView")} */}

                <AppNavBar></AppNavBar>

                <ContentContainer
                    db = {this.props.db}
                ></ContentContainer>

            </div>
        )
    }
}

export default DashBoardView;
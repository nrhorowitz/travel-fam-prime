import React from 'react';
import ReactDOM from 'react-dom';

//import styles from '../css/LandingPageView.css';
import DottedBox from '../components/DottedBox.js';

import CreateEmail from '../components/CreateEmail.js';
import Button from '@material-ui/core/Button';

class CreateEmailView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CreateEmail
                segueToView = {this.props.segueToView}
                addNewUserInfo = {this.props.addNewUserInfo}
            />
        );
    }
}

export default CreateEmailView;
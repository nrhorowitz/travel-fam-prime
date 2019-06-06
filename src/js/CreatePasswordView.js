import React from 'react';
import ReactDOM from 'react-dom';

//import styles from '../css/LandingPageView.css';
import DottedBox from '../components/DottedBox.js';

import CreatePassword from '../components/CreatePassword.js';
import Button from '@material-ui/core/Button';

class CreatePasswordView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CreatePassword
                segueToView = {this.props.segueToView}
                addNewUserInfo = {this.props.addNewUserInfo}
            />
        );
    }
}

export default CreatePasswordView;
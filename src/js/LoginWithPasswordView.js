import React from 'react';
import ReactDOM from 'react-dom';

//import styles from '../css/LandingPageView.css';
import DottedBox from '../components/DottedBox.js';
import LoginWithPassword from '../components/LoginWithPassword.js';

import Button from '@material-ui/core/Button';

class LoginWithPasswordView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LoginWithPassword
                id = {this.props.id}
                segueToView = {this.props.segueToView}
            />
        );
    }
}

export default LoginWithPasswordView;
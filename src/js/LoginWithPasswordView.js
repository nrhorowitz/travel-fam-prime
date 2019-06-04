import React from 'react';
import ReactDOM from 'react-dom';

import styles from '../css/LandingPageView.css';
import DottedBox from '../components/DottedBox.js';

import Button from '@material-ui/core/Button';

class LoginWithPasswordView extends React.Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
    }

    changePage(direction) {
        this.props.segueToView(direction)
    }

    render() {
        return (
            <div>
                LoginWithPasswordView
                {this.props.phoneEntry}
            </div>
        );
    }
}

export default LoginWithPasswordView;
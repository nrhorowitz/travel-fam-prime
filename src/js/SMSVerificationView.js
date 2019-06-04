import React from 'react';
import ReactDOM from 'react-dom';

import styles from '../css/LandingPageView.css';
import DottedBox from '../components/DottedBox.js';

import Button from '@material-ui/core/Button';

class SMSVerificationView extends React.Component {
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
                SMSVerificationView
                {this.props.phoneEntry}
            </div>
        );
    }
}

export default SMSVerificationView;
import React from 'react';
import ReactDOM from 'react-dom';

//import styles from '../css/LandingPageView.css';
import DottedBox from '../components/DottedBox.js';

import Invited from '../components/Invited.js';
import Button from '@material-ui/core/Button';

class InvitedByView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Invited
                segueToView = {this.props.segueToView}
            />
        );
    }
}

export default InvitedByView;
import React from 'react';
import ReactDOM from 'react-dom';

//import styles from '../css/LandingPageView.css';
import DottedBox from '../components/DottedBox.js';

import CreateName from '../components/CreateName.js';
import Button from '@material-ui/core/Button';

class CreateNameView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CreateName
                segueToView = {this.props.segueToView}
                addNewUserInfo = {this.props.addNewUserInfo}
            />
        );
    }
}

export default CreateNameView;
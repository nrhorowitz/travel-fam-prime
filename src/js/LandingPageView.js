import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase"

import SignUpView from './SignUpView';

class LandingPageView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SignUpView
                    handlePhoneEntry = {this.props.handlePhoneEntry}
                />
            </div>
        );
    }
}

export default LandingPageView;
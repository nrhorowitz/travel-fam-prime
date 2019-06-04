import React from 'react';
import ReactDOM from 'react-dom';

import SignIn from '../components/SignIn.js';

class LandingPageView extends React.Component {
    constructor(props) {
        super(props);
        this.getPhoneFromLandingPage = this.getPhoneFromLandingPage.bind(this);
    }

    getPhoneFromLandingPage(number) {
        this.props.authenticateNewUser(number);
        this.props.segueToView("SMSVerificationView");
    }

    render() {
        return (
            <div>
                <SignIn
                    sendPhone = {this.getPhoneFromLandingPage}
                />
            </div>
        );
    }
}

export default LandingPageView;
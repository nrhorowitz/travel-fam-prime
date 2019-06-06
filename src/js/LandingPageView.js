import React from 'react';
import ReactDOM from 'react-dom';

import SignIn from '../components/SignIn.js';

class LandingPageView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SignIn
                    handlePhoneEntry = {this.props.handlePhoneEntry}
                />
            </div>
        );
    }
}

export default LandingPageView;
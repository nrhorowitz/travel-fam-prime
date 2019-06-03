import React, { Component } from 'react';

import '../css/App.css';

import LandingPageView from './LandingPageView.js';
import EditProfileView from './EditProfileView.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentView: "LandingPageView",
            currentUser: null
        };

        this.segueToLandingPageView = this.segueToLandingPageView.bind(this);
        this.segueToEditProfileView = this.segueToEditProfileView.bind(this);
    }

    componentDidMount() {

    }

    segueToLandingPageView() {
        this.setState({currentView: "LandingPageView"});
    }

    segueToEditProfileView() {
        this.setState({currentView: "EditProfileView"});
    }

    currentPage() {
        if (this.state.currentView === "LandingPageView") {
            return (
                <LandingPageView
                    segueToLandingPageView = {this.segueToLandingPageView}
                    segueToEditProfileView = {this.segueToEditProfileView}
                />
            )
        } else if (this.state.currentView === "EditProfileView") {
            return (
                <EditProfileView
                    segueToLandingPageView = {this.segueToLandingPageView}
                    segueToEditProfileView = {this.segueToEditProfileView}
                />
            )
        }
    }

    render() {
        return (
            <div>
                {this.currentPage()}
            </div>
        );
    }
}

export default App;

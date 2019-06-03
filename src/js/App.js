import React, { Component } from 'react';

import '../css/App.css';

import LandingPageView from './LandingPageView.js';
import EditProfileView from './EditProfileView.js';
import DashBoardView from './DashBoardView.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentView: "LandingPageView",
            currentUser: null
        };

        this.segueToView = this.segueToView.bind(this);
    }

    componentDidMount() {

    }

    segueToView(direction) {
        this.setState({currentView: direction});
    }

    currentPage() {
        if (this.state.currentView === "LandingPageView") {
            return (
                <LandingPageView
                    segueToView = {this.segueToView}
                />
            )
        } else if (this.state.currentView === "EditProfileView") {
            return (
                <EditProfileView
                    segueToView = {this.segueToView}
                />
            )
        } else if (this.state.currentView === "DashBoardView") {
            return (
                <DashBoardView
                    segueToView = {this.segueToView}
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

import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
//import './styles.css';

class LandingPageView extends React.Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.createNewButton = this.createNewButton.bind(this);
    }

    changePage(direction) {
        this.props.segueToView(direction)
    }

    createNewButton(name, direction) {
        return (
            <Button
                name={name}
                direction={direction}
                color="primary"
                onClick={() => this.changePage(direction)}>
                {name}
            </Button>
        );
    }

    render() {
        return(
            <div>
                LANDING PAGE VIEW
                {this.createNewButton("DASHBOARD", "DashBoardView")}
            </div>
        )
    }
}

export default LandingPageView;
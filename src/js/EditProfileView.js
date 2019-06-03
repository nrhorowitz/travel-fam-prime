import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
//import './styles.css';

class EditProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.createNewButton = this.createNewButton.bind(this);
    }

    changePage(direction) {
        if (direction === "LandingPageView") {
            this.props.segueToLandingPageView()
        }
    }

    createNewButton(name, direction) {
        return (
            <Button
                name={name}
                direction={direction}
                onClick={() => this.changePage(direction)}>
                {name}
            </Button>
        );
    }

    render() {
        return(
            <div>
                EDIT PROFILE VIEW
                {this.createNewButton("LANDING PAGE", "LandingPageView")}
            </div>
        )
    }
}

export default EditProfileView;
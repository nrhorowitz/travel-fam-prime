import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
//import './styles.css';

class DashBoardView extends React.Component {
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
                DashBoardView
                {this.createNewButton("EDIT PROFILE", "EditProfileView")}
            </div>
        )
    }
}

export default DashBoardView;
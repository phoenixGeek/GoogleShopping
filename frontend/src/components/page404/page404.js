import React from 'react';
import { Button } from 'reactstrap';
import './page404.scss';

class Page404 extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="page404 d-flex align-items-center justify-content-center flex-column">
                <div className="text-muted display-1">404</div>
                <div className="h4">Oops! This Page Could Not Be Found</div>
                <Button onClick={this.handleClick} color="primary">
                    GO TO HOMEPAGE
        </Button>
            </div>
        );
    }
}

export default Page404;
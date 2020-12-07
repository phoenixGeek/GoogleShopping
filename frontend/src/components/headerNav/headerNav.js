import React from "react";
import { Link } from 'react-router-dom';
import './headerNav.scss';

class HeaderNav extends React.Component {

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to={'/'} className="letter">Home</Link>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );

    }
}

export default HeaderNav;
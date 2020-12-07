import React from "react";
import './searchBox.scss';
import HeaderNav from '../headerNav';
import { Button } from 'reactstrap';
import $ from 'jquery';
// import MapContainer from '../mapContainer';

class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.onHandleChange = this.onHandleChange.bind(this)
    }

    onHandleChange = (e) => {

        if (e.target.value != '' && e.key === 'Enter') {
            var param = e.target.value;
            this.props.history.push(`productlist/${param}`)
        }
    }

    onHandleButton() {
        var _val = $('.searchkey').val()
        if (_val != '') {
            this.props.history.push(`productlist/${_val}`)
        } else {
            alert("empty input data");
            $('.searchkey').focus()
        }
    }

    render() {

        return (
            <React.Fragment>
                <HeaderNav />
                <div className="dashboard-container">
                    <div className="logo-container">
                        <img src="assets/stocklogo.png" alt="stock logo" width="25%" />
                    </div>
                    <div className="container d-flex justify-content-center searchbox">
                        <div className="input-group col-sm-7 input-group-lg">
                            <div className="input-group-prepend">
                                <span className="input-group-text google">
                                    <img src="https://cdn.pixabay.com/photo/2017/01/13/01/22/magnifying-glass-1976105_960_720.png" alt="google glass" width="20" />
                                </span>
                            </div>
                            <input type="text" className="form-control searchkey" onKeyDown={this.onHandleChange} required />
                            <div className="input-group-append">
                                <span className="input-group-text microphone">
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="search-button">
                        <Button outline color="secondary" onClick={() => this.onHandleButton()} >Search</Button>{' '}
                    </div>
                </div>
            </React.Fragment >
        );

    }
}

export default SearchBox;
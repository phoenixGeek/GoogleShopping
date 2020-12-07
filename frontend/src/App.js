import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SearchBox from './components/searchBox'
import ProductList from './components/productList'
import Page404 from './components/page404'
import ProductDetail from './components/productDetail';

class App extends React.Component {

    render() {

        return (
            <div className='App'>
                <Router>
                    <Switch>
                        <Route path="/productlist/:param" render={props => <ProductList {...props} />} />
                        <Route path="/productdetail" render={props => <ProductDetail {...props} />} />
                        <Route path="/404" exact render={props => <Page404 {...props} />} />
                        <Route path="/" exact render={props => <SearchBox {...props} />} />
                        <Redirect to="/404" />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
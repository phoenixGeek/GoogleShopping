import React from "react";
import './productList.scss';
import HeaderNav from '../headerNav'
import axios from "axios";
import { Link } from 'react-router-dom';
import {
    Spinner,
    CardDeck,
    Card,
    CardImg,
    CardTitle,
    CardText,
    CardBody,
    CardFooter,
} from 'reactstrap';
import Pagination from "react-js-pagination";
import { Rating } from '@material-ui/lab';
import AdSense from 'react-adsense';
import Slider from "react-slick";
import $ from 'jquery';

class ProductList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            isSpellFix: false,
            spellingFix: '',
            products: [],
            googleProducts: [],
            saleProducts: [],
            activePage: 1,
            totalItemsCount: 25 * 10
        }
    }

    async handlePageChange(pageNumber) {

        this.setState({
            isLoading: false
        })
        const { param } = this.props.match.params;
        const { data } = await axios('http://localhost:8080/pagination', {
            method: 'POST',
            data: {
                pageNumber: pageNumber,
                searchkey: this.state.spellingFix
            }
        });

        // var maxKey = Object.keys(data.pagination.other_pages).reduce(function (a, b) { return parseInt(a) > parseInt(b) ? a : b });
        console.log("pagination data", data)

        this.setState({
            activePage: pageNumber,
            isLoading: true,
            products: data.products,
            googleProducts: data.googleProducts,
            saleProducts: data.saleProducts,
            spellingFix: data.spelling_fix.spelling_fix ? data.spelling_fix.spelling_fix.replace(' nearby', '') : data.spelling_fix.query_displayed,
            isSpellFix: data.spelling_fix.spelling_fix ? true : false,
            // totalItemsCount: 25 * (maxKey)
        });
        $('.slick-prev').trigger('click');
    }

    async componentDidMount() {

        const { param } = this.props.match.params;
        const { data } = await axios('http://localhost:8080/productlist', {
            method: 'POST',
            data: {
                searchkey: param
            }
        });
        console.log('data: ', data)

        this.setState({
            isLoading: true,
            products: data.products,
            googleProducts: data.googleProducts,
            saleProducts: data.saleProducts,
            spellingFix: data.spelling_fix.spelling_fix ? data.spelling_fix.spelling_fix.replace(' nearby', '') : data.spelling_fix.query_displayed,
            isSpellFix: data.spelling_fix.spelling_fix ? true : false
        })
        $('.slick-prev').trigger('click');

    }

    // componentDidMount() {

    //     const serp_api_key = process.env.REACT_APP_SERP_API_KEY
    //     const { param } = this.props.match.params;
    //     axios('http://localhost:8081/productlistlow', {
    //         method: 'POST',
    //         data: {
    //             searchkey: param
    //         }
    //     }).then((response) => {
    //         this.setState({
    //             products: response.data
    //         });
    //     }).catch((e) => {
    //         console.log(e);
    //     });
    // }

    render() {

        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 8.27,
            slidesToScroll: 7,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1680,
                    settings: {
                        slidesToShow: 7.1,
                        slidesToScroll: 6,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 1536,
                    settings: {
                        slidesToShow: 6.5,
                        slidesToScroll: 5.4,
                        initialSlide: 2,
                    }
                },
                {
                    breakpoint: 1440,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 5,
                    }
                },
                {
                    breakpoint: 1360,
                    settings: {
                        slidesToShow: 5.5,
                        slidesToScroll: 4.5,
                    }
                },
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 4,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5.5,
                        slidesToScroll: 4.5,
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 4.5,
                        slidesToScroll: 3.5,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 360,
                    settings: {
                        slidesToShow: 1.5,
                        slidesToScroll: 1,
                    }
                }
            ]
        };

        return (
            <React.Fragment>
                <div>
                    <HeaderNav />

                    {!this.state.isLoading ? <Spinner color="info" /> :

                        <div className="search-header">

                            {this.state.isSpellFix ? (<h5>Did you mean:</h5>) : ''}
                            <h4>{this.state.spellingFix}</h4>

                        </div>
                    }
                    <AdSense.Google
                        client='ca-pub-7292810486004926'
                        slot='7806394673'
                        style={{ width: 400, height: 100 }}
                        format=''
                    />
                    {this.state.isLoading ? (<h5 className="subheader">Products Near By</h5>) : (null)}
                    <Slider {...settings}>
                        {this.state.products && this.state.isLoading && this.state.products.map((product, index) => (
                            <div key={index} className="slick-item">
                                <Card>
                                    <a href={product.detail && product.detail.sellers_results ? product.detail.sellers_results.online_sellers[0].link : product.link} target="_blank"><CardImg variant="top" src={product.thumbnail} alt="product-item" /></a>
                                    <CardBody>
                                        <CardTitle>{product.title}</CardTitle>
                                        <CardText>

                                            <Rating
                                                name="simple-controlled"
                                                value={product.rating}
                                                precision={0.1}
                                                readOnly
                                                size='small'
                                            />
                                            <span>({product.reviews ? product.reviews : 0})</span>
                                        </CardText>
                                        <div>
                                            <strong>{product.price}</strong>
                                        </div>

                                    </CardBody>
                                    <CardFooter>
                                        <Link to={{
                                            pathname: '/productdetail',
                                            search: `id=${product.position}`,
                                            detailProps: product
                                        }}>
                                            <small className="text-muted"><strong>View More</strong></small>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </div>
                        ))}
                    </Slider>

                    {this.state.isLoading ? (<h5 className="subheader">Products on Google</h5>) : (null)}
                    <Slider {...settings}>
                        {this.state.googleProducts && this.state.isLoading && this.state.googleProducts.map((product, index) => (
                            <div key={index} className="slick-item">
                                <Card>
                                    <a href={product.detail && product.detail.sellers_results ? product.detail.sellers_results.online_sellers[0].link : product.link} target="_blank"><CardImg variant="top" src={product.thumbnail} alt="product-item" /></a>
                                    <CardBody>
                                        <CardTitle>{product.title}</CardTitle>
                                        <CardText>

                                            <Rating
                                                name="simple-controlled"
                                                value={product.rating}
                                                precision={0.1}
                                                readOnly
                                                size='small'
                                            />
                                            <span>({product.reviews ? product.reviews : 0})</span>
                                        </CardText>
                                        <div>
                                            <strong>{product.price}</strong>
                                        </div>

                                    </CardBody>
                                    <CardFooter>
                                        <Link to={{
                                            pathname: '/productdetail',
                                            search: `id=${product.position}`,
                                            detailProps: product
                                        }}>
                                            <small className="text-muted"><strong>View More</strong></small>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </div>
                        ))}
                    </Slider>

                    {this.state.isLoading ? (<h5 className="subheader">Products from Google Sale</h5>) : (null)}
                    <Slider {...settings}>
                        {this.state.saleProducts && this.state.isLoading && this.state.saleProducts.map((product, index) => (
                            <div key={index} className="slick-item">
                                <Card>
                                    <a href={product.detail && product.detail.sellers_results ? product.detail.sellers_results.online_sellers[0].link : product.link} target="_blank"><CardImg variant="top" src={product.thumbnail} alt="product-item" /></a>
                                    <CardBody>
                                        <CardTitle>{product.title}</CardTitle>
                                        <CardText>

                                            <Rating
                                                name="simple-controlled"
                                                value={product.rating}
                                                precision={0.1}
                                                readOnly
                                                size='small'
                                            />
                                            <span>({product.reviews ? product.reviews : 0})</span>
                                        </CardText>
                                        <div>
                                            <strong>{product.price}</strong>
                                        </div>

                                    </CardBody>
                                    <CardFooter>
                                        <Link to={{
                                            pathname: '/productdetail',
                                            search: `id=${product.position}`,
                                            detailProps: product
                                        }}>
                                            <small className="text-muted"><strong>View More</strong></small>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </div>
                        ))}
                    </Slider>

                    {this.state.isLoading ?

                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={25}
                            totalItemsCount={this.state.totalItemsCount}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
                        : ''}
                </div>

            </React.Fragment >
        );

    }
}

export default ProductList;
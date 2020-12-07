import React from 'react';
import HeaderNav from '../headerNav';
import { Rating } from '@material-ui/lab';
import './productDetail.scss';
import { ProgressBar } from 'react-bootstrap';
import Slider from "react-slick";
import $ from 'jquery';

class ProductDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numSlidesToShow: 2
        }
    }

    buyOption(seller) {
        return (
            <div>
                <strong>{seller.total_price}</strong>
                <br />
                +{seller.additional_price.tax}
                <br />
                { seller.name}
                <br />
                <a href={seller.link} target="_blank">Visit site</a>

            </div>
        )
    }

    render() {

        var detailedProduct = [];
        var numSlidesToShow = 1;

        if (this.props.location.detailProps) {
            localStorage.setItem('product', JSON.stringify(this.props.location.detailProps));
            detailedProduct = JSON.parse(localStorage.getItem('product'))
        } else {
            detailedProduct = JSON.parse(localStorage.getItem('product'))
        }

        if (detailedProduct.detail && detailedProduct.detail.product_results.media.length > 4) {
            numSlidesToShow = 4
        } else if (detailedProduct.detail && detailedProduct.detail.product_results.media.length <= 4) {
            numSlidesToShow = detailedProduct.detail.product_results.media.length - 1;
        }

        const settings = {
            infinite: true,
            slidesToShow: numSlidesToShow,
            slidesToScroll: 1,
            vertical: true,
            centerMode: true,
            verticalSwiping: true,
            swipeToSlide: true,
            responsive: [
                {
                    breakpoint: 360,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                }
            ],
            beforeChange: function (currentSlide, nextSlide) {

                $(`.detail-slider div[data-index="${nextSlide}"] .image-thumb`).addClass('thumbnail-active')
                $(`.detail-slider div[data-index="${currentSlide}"] .image-thumb`).removeClass('thumbnail-active')
                $('.main-thumbnail img').attr('src', detailedProduct.detail.product_results.media[nextSlide].link)
            },
            afterChange: function (currentSlide) {
                console.log("after change", currentSlide);
            }
        }

        return (

            <React.Fragment>

                <HeaderNav />
                {detailedProduct.detail ?
                    <div className="product-detail-container">
                        <div className="detail-header">
                            <h5>{detailedProduct.title}</h5><br />
                            <div className="detail-overall-review">
                                <Rating
                                    name="simple-controlled"
                                    value={detailedProduct.detail.product_results.rating ? detailedProduct.detail.product_results.rating : detailedProduct.rating}
                                    precision={0.1}
                                    readOnly
                                />
                                ({detailedProduct.detail.product_results.reviews ? detailedProduct.detail.product_results.reviews : detailedProduct.reviews})
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-7 col-md-7 col-lg-7 mt-1 product-overview">

                                    <div className="container product-image">
                                        <div className="row">
                                            <div className="col-sm-2 col-md-2 col-lg-2 mt-1 product-thumbnail">
                                                <Slider {...settings} className="detail-slider">
                                                    {detailedProduct.detail.product_results.media.map((media, index) => (

                                                        <div key={index} className="image-thumb">
                                                            <img src={media.link} width="50px" />
                                                        </div>
                                                    ))}

                                                </Slider>
                                            </div>
                                            <div className="col-sm-10 col-md-10 col-lg-10 mt-1 main-thumbnail">
                                                <img src={detailedProduct.thumbnail} alt="detail-product" /> <span>(<strong>{detailedProduct.price}</strong>)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-detail">
                                        <h6>Product Details</h6>
                                        <small>{detailedProduct.snippet}</small>
                                    </div>
                                    <div className="container detail-review">
                                        <div className="row">
                                            <div className="col-sm-3 col-md-3 col-lg-3 mt-1 detail-review-overview">
                                                <h4>Reviews</h4>
                                                <h1>{detailedProduct.rating}</h1>
                                                <Rating
                                                    name="simple-controlled"
                                                    value={detailedProduct.rating}
                                                    precision={0.1}
                                                    readOnly
                                                    size='small'
                                                /><br />
                                                <span role="count-review">{detailedProduct.detail.product_results.reviews ? detailedProduct.detail.product_results.reviews : 0} reviews</span>
                                            </div>
                                            <div className="col-sm-9 col-md-9 col-lg-9 mt-1">
                                                {detailedProduct.detail.reviews_results ? detailedProduct.detail.reviews_results.ratings.reverse().map((rating, index) => (
                                                    <div className="rating-item" key={index}>
                                                        {rating.stars}&nbsp;stars&nbsp;<ProgressBar variant="info" now={rating.amount / detailedProduct.detail.product_results.reviews * 100} />&nbsp;{rating.amount}
                                                    </div>
                                                )) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="detail-container">
                                        {detailedProduct.detail.reviews_results ? detailedProduct.detail.reviews_results.reviews.map((review, index) => (
                                            <div key={index}>
                                                <h6>{review.title}</h6>
                                                <div className="detail-feedback">
                                                    <Rating
                                                        name="simple-controlled"
                                                        value={review.rating}
                                                        precision={0.1}
                                                        readOnly
                                                        size='small'
                                                    />
                                                    <span role="date">{review.date}</span>

                                                </div>
                                                <br />
                                                {review.content}
                                                <br />
                                                {review.source}
                                            </div>
                                        )) : null}
                                    </div>
                                </div>
                                <div className="col-sm-5 col-md-5 col-lg-5 mt-1 buy-options">
                                    <h4>Buying Options</h4>
                                    {detailedProduct.detail.sellers_results ? detailedProduct.detail.sellers_results.online_sellers.map((seller, index) => (
                                        <div key={index} className="seller-detail">
                                            {seller.total_price && seller.additional_price ? this.buyOption(seller)
                                                //     (
                                                //         <strong>{seller.total_price}</strong>
                                                // <br />
                                                // +{seller.additional_price.tax}
                                                // <br />
                                                // { seller.name}
                                                // <br />
                                                // <a href={seller.link} target="_blank">Visit site</a>
                                                //     )
                                                : (null)
                                            }

                                        </div>
                                    )) : (<div>No Available Products</div>)}
                                </div>
                                <div className="footer-container">
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="product-detail-container">
                        <div className="detail-header">
                            <h5>{detailedProduct.title}</h5><br />
                            <div className="detail-overall-review">
                                <Rating
                                    name="simple-controlled"
                                    value={detailedProduct.rating}
                                    precision={0.1}
                                    readOnly
                                />
                                        ({detailedProduct.reviews ? detailedProduct.reviews : 0})
                                </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col-sm-7 col-md-7 col-lg-7 mt-1">
                                    <img src={detailedProduct.thumbnail} alt="detail-product" /> <span>(<strong>{detailedProduct.price}</strong>)</span>
                                </div>
                                <div className="col-sm-5 col-md-5 col-lg-5 mt-1 buy-options">
                                    <h4>Buying Product</h4>
                                    <div className="seller-detail">
                                        <strong>{detailedProduct.price}</strong>
                                        <h6>Product Details</h6>
                                        <small>{detailedProduct.snippet}</small>
                                        <br />
                                        {detailedProduct.source}
                                        <br />
                                        <a href={detailedProduct.link} target="_blank">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </React.Fragment>
        );
    }
}

export default ProductDetail;
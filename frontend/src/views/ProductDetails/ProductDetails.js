import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProductAction } from '../../actions/productActions';
import ErrorMessageBox from '../../components/ErrorMessageBox/ErrorMessageBox';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import './ProductDetails.scss';

export default function ProductDetails(props) {

    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const { isLoading, error, product } = productDetails;

    var quantity = 1;

    useEffect(() => {
        dispatch(detailsProductAction(productId));
    }, [dispatch, productId]);
    
    const subtractQuantity = () => {
        
    }

    const addQuantity = () => {
       
    }

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${quantity}`);
    }

    return (
        <div>
        {
            isLoading ? (<LoadingBox></LoadingBox>) 
            : error ? (<ErrorMessageBox err={error}/>)
            : <div className="main-wrapper">
            <div className='product-wrapper'>
                <div className='details'>
                    <h1 className='details__category'>
                        <span>{product.category}</span>
                        <span className='details__rating'>
                            <div className="card__stars">
                                <i className={product.rating >= 1 ? "fa fa-star" : product.rating >= 0.5 ? "fa fa-star-half-o" : "fa fa-star-o"} aria-hidden="true"></i>
                                <i className={product.rating >= 2 ? "fa fa-star" : product.rating >= 1.5 ? "fa fa-star-half-o" : "fa fa-star-o"} aria-hidden="true"></i>
                                <i className={product.rating >= 3 ? "fa fa-star" : product.rating >= 2.5 ? "fa fa-star-half-o" : "fa fa-star-o"} aria-hidden="true"></i>
                                <i className={product.rating >= 4 ? "fa fa-star" : product.rating >= 3.5 ? "fa fa-star-half-o" : "fa fa-star-o"} aria-hidden="true"></i>
                                <i className={product.rating >= 5 ? "fa fa-star" : product.rating >= 4.5 ? "fa fa-star-half-o" : "fa fa-star-o"} aria-hidden="true"></i>
                                ({product.numReviews})
                            </div>
                        </span>
                    </h1>
                    <h1 className='details__name'>{product.name}</h1>
                    <h2 className='details__price'>{product.price}</h2>
                    <p>{product.inStock > 0 ? (<span className="details__in-stock">In stock</span>) : (<span className="details__not-in-stock">Not available</span>)}</p>
                    {
                        product.inStock > 0 ?
                        ( <div className="details__btn-wrapper">
                            <div className="counter">
                                <i onClick={subtractQuantity()} className="fa fa-angle-left"></i>
                                <span className="content__wrapper"><p className="content">{quantity}</p></span>
                                <i onClick={addQuantity()} className="fa fa-angle-right"></i>
                            </div>
                            <button onClick={() => addToCartHandler()} className="details__add-to-cart-btn"><span>Add to cart</span></button>
                        </div>)
                        : (<span></span>)
                    }
                </div>
                <img src={product.image} alt="Product"></img>
                <a className="more-details" href="#prod-description"><i className="fa fa-angle-down" /></a>
            </div>
            {/* TODO: apply more dteailed description as object and style correspondingly (description: {someInfo: 'info1', someOther: 'info2'})*/}
            <div className="description-wrapper">
                <div className="reviews">
                {/* TODO: implement user reviews (UserName: 'text of review', rating)*/}
                {/* TODO: use BEM convention here*/}
                    <ul>
                        <li>Review</li>
                        <li>Review</li>
                        <li>Review</li>
                        <li>Review</li>
                        <li>Review</li>
                        <li>Review</li>
                        <li>Review</li>
                        <li>Review</li>
                    </ul>
                </div>
                <div id="prod-description">
                    <h2>Description</h2>
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
        }
        </div>
    )
}

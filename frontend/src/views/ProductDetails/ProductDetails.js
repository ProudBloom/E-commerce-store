import React from 'react'
import { useParams } from 'react-router-dom';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import data from '../../data'
import './ProductDetails.scss'

export default function ProductDetails() {
    let { id } = useParams();
    const product = data.products.find(item => item._id == id);
    
    if(!product)
    {
        return(<ErrorComponent />);
    }

    return (
        <div className='wrapper'>
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
                <h2 className='details__price'>${product.price}</h2>
                <button>Add to cart</button>
            </div>
            <img src={product.image}></img>
            <a className="more-details">
                <span>See more details</span>
                <i className="fa fa-angle-down" />
            </a>
        </div>
    )
}

import React from 'react'
import { useParams } from 'react-router-dom';
import ErrorComponent from '../components/ErrorComponent/ErrorComponent';
import data from '../data'

export default function ProductDetails() {
    let { id } = useParams();
    const product = data.products.find(item => item._id == id);
    
    if(!product)
    {
        return(<ErrorComponent />);
    }

    return (
        <div>
            <h1>{product.brand}</h1>
            <h1>ID: {product._id}</h1>
            <h1>{product.category}</h1>
            <h2>{product.description}</h2>
            <div className="card__stars">
                <i className={product.rating >= 1 ? "fa fa-star" : product.rating >= 0.5 ? "fa fa-star-half-o" : "fa fa-star-o"} aria-hidden="true"></i>
                <i className={product.rating >= 2 ? "fa fa-star" : product.rating >= 1.5 ? "fa fa-star-half-o" : "fa fa-star-o"} aria-hidden="true"></i>
                <i className={product.rating >= 3 ? "fa fa-star" : product.rating >= 2.5 ? "fa fa-star-half-o" : "fa fa-star-o"} aria-hidden="true"></i>
                <i className={product.rating >= 4 ? "fa fa-star" : product.rating >= 3.5 ? "fa fa-star-half-o" : "fa fa-star-o"} aria-hidden="true"></i>
                <i className={product.rating >= 5 ? "fa fa-star" : product.rating >= 4.5 ? "fa fa-star-half-o" : "fa fa-star-o"} aria-hidden="true"></i>
            </div>
            <h3>Number of reviews : {product.numReviews}</h3>
            <img src={product.image}></img>
        </div>
    )
}

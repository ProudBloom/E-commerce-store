import React from 'react'
import Rating from '../Rating/Rating';
import './ProductCard'

export default function ProductCard(props) 
{
    const {item} = props;
    return(
        <div key={item._id} className="card">
            <h4>{item.category}</h4>
            <h1>{item.name}</h1>
            <h1 className="card__price">{item.price}</h1>
            <a href={`/item/${item._id}`}>
                <img className="card__image" src={item.image} alt="nike predator shoe" />
            </a>
            <div className="card__buttons">
                <button className="card__add-to-cart">
                    <img src="../assets/icons/shopping_cart-small.svg" alt="shopping cart" />
                    <p>Add to cart</p>
                </button>
                <button className="card__details">
                    <img src="../assets/icons/details-small.svg" alt="magnifier" />
                    <a href={`/item/${item._id}`}><p>Details</p></a>
                </button>
                <Rating rating={item.rating}></Rating>
            </div>
        </div>
    );
}
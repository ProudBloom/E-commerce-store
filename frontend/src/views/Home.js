import React from 'react'
import data from '../data'
import ProductCard from '../components/ProductCard/ProductCard'

export default function Home() {
    return (
        <main>
            <div className="card__wrapper">
            {
                data.products.map(product => 
                {
                    return(<ProductCard key={product._id} item={product}></ProductCard>);
                })
            }
            </div>
        </main>
    )
}

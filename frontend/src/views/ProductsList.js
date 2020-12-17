import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard/ProductCard'
import LoadingBox from '../components/LoadingBox/LoadingBox';
import ErrorMessageBox from '../components/ErrorMessageBox/ErrorMessageBox';

export default function ProudctsList() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get('/api/products');
                setProducts(data);
                setIsLoading(false);
            }
            catch(err) {
                setError(err.message);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <main>
        {
            isLoading ? (<LoadingBox></LoadingBox>) 
            : error ? (<ErrorMessageBox err={error}/>)
            : <div className="card__wrapper">
                {
                    products.map(product => 
                    {
                        return(<ProductCard key={product._id} item={product}></ProductCard>);
                    })
                }
            </div>
        }
        </main>
    )
}

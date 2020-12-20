import React, { useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard'
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import ErrorMessageBox from '../../components/ErrorMessageBox/ErrorMessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsAction } from '../../actions/productActions';

export default function ProudctsList() {

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { isLoading, error, products } = productList;

    useEffect(() => {
        dispatch(listProductsAction());
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

import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import ProudctsList from '../../views/ProductstList/ProductsList'
import ProductDetails from '../../views/ProductDetails/ProductDetails'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import HomePage from '../../views/HomePage/HomePage'
import Cart from '../../views/Cart/Cart'

function App() {
  return (
      <div>
        <Header />
        
        <BrowserRouter>
            <Route exact path="/" component={HomePage}></Route>
            {/* TODO: implement different JSON objects for men, wemen, kids etc. */}
            <Route path="/products-list" component={ProudctsList}></Route>
            <Route path="/item/:id" component={ProductDetails}></Route>
            <Route path="/cart/:id?" component={Cart}></Route>
        </BrowserRouter>

        <Footer />
      </div>
  );
}

export default App;

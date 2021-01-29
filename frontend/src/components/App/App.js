import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import ProudctsList from '../../views/ProductstList/ProductsList'
import ProductDetails from '../../views/ProductDetails/ProductDetails'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import HomePage from '../../views/HomePage/HomePage'
import Cart from '../../views/Cart/Cart'
import SingIn from '../../views/SignIn/SignIn'
import Register from '../../views/Register/Register'
import Shipping from '../../views/Shipping/Shipping'
import Payment from '../../views/Payment/Payment'
import Summary from '../../views/Summary/Summary'

function App() {
  return (
      <div>
        <BrowserRouter>
          <Header />
        
            <Route exact path="/" component={HomePage}></Route>
            {/* TODO: implement different JSON objects for men, wemen, kids etc. */}
            <Route path="/products-list" component={ProudctsList}></Route>
            <Route path="/item/:id" component={ProductDetails}></Route>
            <Route path="/cart/:id?" component={Cart}></Route>
            <Route path="/signin" component={SingIn}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/shipping" component={Shipping}></Route>
            <Route path="/payment" component={Payment}></Route>
            <Route path="/summary" component={Summary}></Route>
          <Footer />
        </BrowserRouter>

      </div>
  );
}

export default App;

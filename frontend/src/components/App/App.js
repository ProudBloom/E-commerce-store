import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ProudctsList from '../../views/ProductstList/ProductsList'
import ProductDetails from '../../views/ProductDetails/ProductDetails'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import HomePage from '../../views/HomePage/HomePage'

function App() {
  return (
      <div>
        <Header />
        
        <BrowserRouter>
          <Switch>
            <Route exact path="/"><HomePage /></Route>
            {/* TODO: implement different JSON objects for men, wemen, kids etc. */}
            <Route path="/products-list"><ProudctsList /></Route>
            <Route path="/item/:id"><ProductDetails /></Route>
          </Switch>
        </BrowserRouter>

        <Footer />
      </div>
  );
}

export default App;

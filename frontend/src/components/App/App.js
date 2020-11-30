import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Home from '../../views/Home'
import ProductDetails from '../../views/ProductDetails'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function App() {
  return (
      <div>
        <Header />
        
        <BrowserRouter>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/item/:id"><ProductDetails /></Route>
          </Switch>
        </BrowserRouter>

        <Footer />
      </div>
  );
}

export default App;

import React from 'react';
import Home from './components/Home';
import Details from './components/Books/Detail';
import Checkout from './components/Checkout';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Cover from './components/Cover';
import Cart from './components/Carts/Cart';

const App = () => {
  return (
    
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Cover />} />
          <Route path='home' element={<Home />} />
          <Route path='book/:id' element={<Details />} /> 
          <Route path='cart' element={<Cart/>} />
          <Route path='checkout' element={<Checkout />} />
        </Routes>
      </Provider>
    
  );
};
export default App;
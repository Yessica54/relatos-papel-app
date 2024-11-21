import React, { useState }  from 'react';
import { connect } from 'react-redux';
import { removeFromCart, addToCart } from '../../redux/actions/cartActions';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Badge from 'react-bootstrap/Badge';
import { BsCart4 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import CartItems from './CartItems';

const Cart = ({ cartItems, total, removeFromCart, addToCart }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  
  return (
    <>
      <div className='d-flex'>
      <Button variant={'outline-light'} onClick={toggleShow} className="">
        <BsCart4 className='mx-1'/>
        Cart
        <Badge pill bg="light" text="dark" className='mx-1'>{cartItems.length}</Badge>
      </Button>
      </div>
      <Offcanvas show={show} onHide={handleClose} placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Tu carrito
            <Badge pill bg="dark" className='mx-2'>{cartItems.length }</Badge>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length === 0 ? (
            <div className='text-center'>
            <h5>¡Tu Carrito esta Vació!</h5>
            <p>Agrega una nuevo libro y comienza una nueva aventura</p>
            </div>
          ): 
          <>
            < CartItems 
            cartItems={cartItems} 
            total={total} 
            removeFromCart={(item) => removeFromCart(item)} 
            addToCart={(item) => addToCart(item)} />
            <Button className="w-100" as={Link}  to="/checkout" variant="dark">Checkout</Button>
          </>
          }
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

const mapStateToProps = state => {
  return {
    cartItems: state.cart.items,
    total: state.cart.total 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: item => dispatch(removeFromCart(item)),
    addToCart: item => dispatch(addToCart(item)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Cart);

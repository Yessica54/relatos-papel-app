import React, {useState} from 'react';
import { connect } from 'react-redux';
import Layout from './Layout';
import Form from 'react-bootstrap/Form';
import CartItems from './Cart/CartItems';
import Badge from 'react-bootstrap/Badge';
import { removeFromCart, clearCart, addToCart } from '../redux/actions/cartActions';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';


const Checkout = ({cartItems, total, removeFromCart, addToCart, clearCart}) => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    return navigate("/home");
  }
  const handleCheckout = () =>{
    setShow(true)
    clearCart()
  }

    return (
      <>
      <Layout>
        <Container className='container'>
        {cartItems.length === 0 ? (
          <div className='vh-100 d-flex justify-content-center align-items-center'>
            <div className='text-center '>
              <h1>¡Tu Carrito esta Vació!</h1>
              <p>Agrega una nuevo libro y comienza una nueva aventura</p>
              <Button  variant="dark"  as={Link} to="/home">Buscar Libro</Button>
            </div>
          </div>
          ):
          <>
            <div className='row px-4 py-5 my-5'>
              <div className='col-md-8'>
                <h4 class="mb-3">Dirección de Entrega</h4>
                <hr class="mb-4"></hr>
                <Form className='row'>
                  <div className='col-md-6'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </div>
                  <div className='col-md-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" />
                    </Form.Group>
                  </div>
                  <div className='col-md-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Dirección</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </div>
                  <div className='col-md-4'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Pais</Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option>Seleccione</option>
                        <option value="1">Colombia</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className='col-md-4'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Estado</Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option>Seleccione</option>
                        <option value="1">Cundinamarca</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className='col-md-4'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>
                  </div>
                  <hr class="mb-4"></hr>
                  <h4 class="mb-3">Datos de Pago</h4>
                  <div key={`default-radio`} className="mb-3">
                    <Form.Check
                      label="Tarjeta Credito"
                      name="credit-card"
                      type="radio"
                      id={`credit-card`}
                    />
                    <Form.Check
                      label="Tarjeta Debito"
                      name="debit-card"
                      type="radio"
                      id={`debit-card`}
                    />
                  </div>
                  <div className='col-md-6'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Nombre en la Tarjeta</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Número en la Tarjeta</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Fecha de expiración</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </div>
                  <hr class="mb-4"></hr>
                  <Button className='w-100'  variant="dark" onClick={() => handleCheckout()} > Pagar</Button>
                </Form>
              </div>
              <div className='col-md-4'>
                <h5>
                Tu carrito <Badge pill bg="dark">{cartItems.length }</Badge>
                </h5>
                < CartItems 
                  cartItems={cartItems} 
                  total={total} 
                  removeFromCart={(item) => removeFromCart(item)} 
                  addToCart={(item) => addToCart(item)} />
              </div>
            </div>
          </>
        }
        </Container>
      </Layout>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Compra exitosa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tu compra ha sido exitosa</Modal.Body>
        <Modal.Footer>
          <Button  variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  const mapStateToProps = state => {
    return {
      cartItems: state.cart.items,
      total: state.cart.total 
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      removeFromCart: item => dispatch(removeFromCart(item)),
      clearCart: () => dispatch(clearCart()),
      addToCart: item => dispatch(addToCart(item)),
    };
  };
  
export default connect(mapStateToProps,mapDispatchToProps)(Checkout);
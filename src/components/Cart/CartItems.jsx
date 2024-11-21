import React from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const CartItems = ({ cartItems, total, addToCart, removeFromCart}) => {
    return (
        <Table responsive>
              <tbody>
                {cartItems.map(item => (
                  <tr key={`book-${item.id}`} className="align-middle">
                    <td> 
                      <Image src={item.cover} width={50} height={80}/>
                    </td>
                    <td >
                      <div className='fw-semibold'>{item.title}</div>
                      <div className='fw-lighter'>{item.authors[0].name}</div>
                      <div>{item.price}$</div>
                    </td>
                    <td className="align-top">
                      <div className='d-flex justify-content-between'>
                        <Button variant="dark" onClick={() => addToCart(item)} >+</Button>
                        <span className='p-2 align-middle'> {item.quantity} </span>
                        <Button  variant="dark" onClick={() => removeFromCart(item)} >-</Button>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr className="align-middle">
                  <td colSpan={2}>Total</td>
                  <td className='text-right'>{total} $</td>
                </tr>
              </tbody>
            </Table>
    )
}

export default CartItems;
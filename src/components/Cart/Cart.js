import { faArrowRight, faDeleteLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { deleteShoppingCart } from '../../utilities/fakedb';
import './Cart.css'

const Cart = (props) => {
    const {cart, handleClearCart, children} = props;
    let total = 0;
    let shippingPrice = 0;
    let quantity = 0;
    for(const product of cart){
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity;
        shippingPrice = shippingPrice + product.shipping;
    }
    const tax = total *0.1;
    const grandTotal = total + shippingPrice + tax;

    return (
        <div className='cart'>
            <h3 className='cart-title'>Order Summary</h3>
            <div className='cart-info'>
                <p>Selected Items: {quantity}</p>
                <p>Total Price: ${total}</p>
                <p>Total Shipping Charge: ${shippingPrice}</p>
                <p>Tax: ${tax.toFixed(2)}</p>
                <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
            </div>
            <button className='cart-info-btn clear-btn' onClick={() => handleClearCart(cart._id)}><p>Clear Cart</p><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button><br />
            {children}
        </div>
    );
};

export default Cart;
import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css';
import { faArrowRight, faDeleteLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Orders = () => {
    const {products, initialCart} = useLoaderData();
    const [cart, setCart] = useState(initialCart);

    const handleRemoveItem = (id) =>{
        const remainingProduct = cart.filter(product => product._id !== id)
        setCart(remainingProduct);
        removeFromDb(id);
    }

    const handleClearCart = (id) =>{
        const cart = []
        setCart(cart)
        deleteShoppingCart(id);
    }
    return (
        <div className='shop-container'>
            <div className='order-container'>
                {
                    cart.map(product => 
                    <ReviewItem 
                        key={product._id}
                        product = {product}
                        handleRemoveItem = {handleRemoveItem}
                    ></ReviewItem>
                    )
                }
                {
                    cart.length === 0 && <h2 className='text-center'>No Items for Review. Please <Link to='/shop'>Show now</Link> </h2>
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart} handleClearCart={handleClearCart}>
                    <Link className='review-btn' to='/shipping'>
                        <button className='review-order-btn'>Proceed Shipping <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;